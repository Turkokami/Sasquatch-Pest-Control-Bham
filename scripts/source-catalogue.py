# -*- coding: utf-8 -*-
"""Walk the Studies tree, identify every PDF, dedupe, and grade it as a source.

The grading is the point. This site cites its claims and records the date each
source was read, so a document's ORIGIN decides whether it may be cited at all,
not whether it is interesting. A Bayer-funded trial and a competitor's training
deck are both worth reading and neither belongs in a citation list.
"""
import os, re, glob, hashlib, json, io, sys

try:
    from pypdf import PdfReader
except ImportError:
    sys.exit('pypdf missing')

ROOT = r'C:\Users\turko\Desktop\Studies'

# Ordered: first pattern that matches wins.
TIERS = [
    ('A  WA state / WSU', [
        r'washington state university', r'\bWSU\b', r'wsu extension', r'puyallup',
        r'department of fish and wildlife', r'\bWDFW\b',
        r'washington state department of health', r'\bDOH\b',
        r'department of agriculture.{0,30}washington', r'\bWSDA\b',
        r'washington state department of ecology',
        r'cooperative extension.{0,40}(whatcom|skagit|snohomish|spokane)',
        r'state of washington',
    ]),
    ('B  Other extension / federal', [
        r'kansas state university', r'penn state', r'oregon state', r'ohio state',
        r'cornell', r'university of california', r'\bUC IPM\b', r'agrilife',
        r'cooperative extension', r'extension service',
        r'u\.?s\.? fish and wildlife', r'national park service', r'\bNPS\b',
        r'\bUSDA\b', r'environmental protection agency', r'\bEPA\b',
        r'centers for disease control', r'\bCDC\b',
    ]),
    ('C  Peer-reviewed journal', [
        r'journal of', r'\bdoi\b', r'10\.\d{4}/', r'proceedings of',
        r'entomolog\w+ (society|research)',
    ]),
    ('D  Industry / vendor — READ, DO NOT CITE', [
        r'bayer', r'syngenta', r'basf', r'corteva', r'fmc corporation',
        r'copesan', r'sprague pest', r'orkin', r'terminix', r'rentokil',
        r'presented by', r'special services manager', r'pest solutions',
    ]),
]


# Filenames carry issuer information the first pages often do not: WDFW numbers
# its Living with Wildlife series wdfwNNNNN, and WSU Extension bulletins carry a
# series code (EB####, EM###E, PLS-##, FS###E, C###).
FILE_A = [r'^wdfw\d+', r'EB\d{3,4}', r'EM\d{3}E', r'PLS-\d+',
          r'FS\d{3}E', r'C\d{3}', r'^AGR\d', r'^\d{3}-\d{3}-Guideline']


def grade(text, fname=''):
    for p in FILE_A:
        if re.search(p, fname, re.I):
            return TIERS[0][0], 'filename:' + p
    low = text.lower()
    for name, pats in TIERS:
        for p in pats:
            if re.search(p, low):
                return name, p
    return 'U  Unclassified — needs a look', ''


rows, seen = [], {}
for path in glob.glob(os.path.join(ROOT, '**', '*.pdf'), recursive=True):
    try:
        raw = open(path, 'rb').read()
        h = hashlib.md5(raw).hexdigest()
        rel = os.path.relpath(path, ROOT)
        if h in seen:
            rows.append(dict(file=rel, dup_of=seen[h], pages=0, tier='—  duplicate',
                             title='', why='', md5=h))
            continue
        seen[h] = rel
        r = PdfReader(io.BytesIO(raw))
        if r.is_encrypted:
            try:
                r.decrypt('')
            except Exception:
                pass
        n = len(r.pages)
        txt = ''
        for i in range(min(3, n)):
            try:
                txt += ' ' + (r.pages[i].extract_text() or '')
            except Exception:
                pass
        txt = ' '.join(txt.split())
        meta = r.metadata or {}
        title = (meta.get('/Title') or '').strip()
        tier, why = grade(txt + ' ' + title, os.path.basename(path))
        rows.append(dict(file=rel, dup_of=None, pages=n, tier=tier, title=title,
                         why=why, md5=h, head=txt[:260]))
    except Exception as e:
        rows.append(dict(file=os.path.relpath(path, ROOT), dup_of=None, pages=0,
                         tier='!  unreadable', title='', why=str(e)[:70], md5='', head=''))

rows.sort(key=lambda r: (r['tier'], r['file']))
json.dump(rows, io.open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'catalogue.json'),
                        'w', encoding='utf-8'), indent=1)

uniq = [r for r in rows if r['dup_of'] is None]
print('PDFs found: %d   unique: %d   duplicates: %d'
      % (len(rows), len(uniq), len(rows) - len(uniq)))
print('pages of source material: %d\n' % sum(r['pages'] for r in uniq))
cur = None
for r in rows:
    if r['tier'] != cur:
        cur = r['tier']
        print('\n== %s ==' % cur)
    name = os.path.basename(r['file'])[:62]
    if r['dup_of']:
        print('   %-64s dup of %s' % (name, os.path.basename(r['dup_of'])))
    else:
        print('   %-64s %3dpp' % (name, r['pages']))
