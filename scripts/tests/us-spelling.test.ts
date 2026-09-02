/**
 * US spelling check — runs over BUILT OUTPUT and over source content.
 *
 * WHY THIS IS A TEST AND NOT A SWEEP. British spellings have been the single
 * most repeated defect on this project. They have been fixed by hand at least
 * six times — neighbourhood, recognise, grey, defence, programme, judgement,
 * organised, centre, travelling, colonise, moult, per cent, licence, tyre —
 * and every time they came back, because the fix was a search-and-replace and
 * the next writer had no way to know. A one-off sweep cleans today. A check
 * in the gate cleans forever.
 *
 * The list below is deliberately long and deliberately conservative:
 *
 *   - Every entry must be a word that is WRONG in US English, not merely
 *     less common. "Towards" and "amongst" are informal but not misspellings,
 *     so they are not here.
 *   - Entries that are legitimate words in another sense are handled with
 *     context, not banned outright. "Practise" is always wrong in US English;
 *     "practice" is always right for both noun and verb. But "moult" is never
 *     right, while "mould" needs care — see the note on it.
 *   - Proper nouns and quoted source titles are exempt via ALLOW below,
 *     because a citation must be reproduced as published.
 */
import fs from 'node:fs';
import path from 'node:path';

/** pattern → the US form, shown in the failure so the fix is obvious. */
/* A NOTE ON WHAT IS DELIBERATELY ABSENT, because the first run of this file
   produced twenty false positives and that is the failure mode to avoid.
   "Specialist", "analysis", "burnt", "leapt", "dreamt", "spoilt" and
   "dialogue" are all acceptable US English. Matching them made the report
   noisy enough to ignore, which is worse than not checking at all. Every
   pattern below must flag a word that is WRONG, not one that is merely
   more common elsewhere. When in doubt, leave it out. */
const BRITISH: [RegExp, string][] = [
  /* The ones that have actually appeared on this site. */
  [/\bneighbour(s|hood|hoods|ing|ly)?\b/gi, 'neighbor…'],
  [/\brecognis(e|ed|es|ing|able)\b/gi, 'recogniz…'],
  [/\bgrey(ish|er|est)?\b/gi, 'gray…'],
  [/\bdefence\b/gi, 'defense'],
  [/\bprogramme(s|d)?\b/gi, 'program…'],
  [/\bjudgement(s)?\b/gi, 'judgment'],
  [/\borganis(e|ed|es|ing|ation|ations|ational)\b/gi, 'organiz…'],
  [/\bcentre(s|d)?\b/gi, 'center…'],
  [/\btravell(ed|ing|er|ers)\b/gi, 'travel…'],
  [/\bcolonis(e|ed|es|ing|ation)\b/gi, 'coloniz…'],
  [/\bmoult(s|ed|ing)?\b/gi, 'molt…'],
  [/\bper cent\b/gi, 'percent'],
  [/\blicence(s|d)?\b/gi, 'license…'],
  [/\btyre(s)?\b/gi, 'tire…'],

  /* Materials and measures — the group most likely to appear in building and
     pest copy, which is most of this site. */
  [/\baluminium\b/gi, 'aluminum'],
  [/\bsulphur(ic|ous)?\b/gi, 'sulfur…'],
  [/\bfibre(s|glass|board)?\b/gi, 'fiber…'],
  [/\bmetre(s)?\b/gi, 'meter…'],
  [/\blitre(s)?\b/gi, 'liter…'],
  [/\bmillimetre(s)?\b/gi, 'millimeter…'],
  [/\bcentimetre(s)?\b/gi, 'centimeter…'],
  [/\bkilometre(s)?\b/gi, 'kilometer…'],
  [/\btonne(s)?\b/gi, 'ton…'],
  [/\bstorey(s)?\b/gi, 'story / stories (of a building)'],
  [/\bkerb(s|side)?\b/gi, 'curb…'],
  [/\bdraught(s|y|proofing)?\b/gi, 'draft…'],
  [/\bplough(s|ed|ing)?\b/gi, 'plow…'],
  [/\bskirting board(s)?\b/gi, 'baseboard…'],
  [/\bplasterboard\b/gi, 'drywall'],
  [/\bgarden tap(s)?\b/gi, 'outdoor faucet…'],
  [/\bpetrol\b/gi, 'gasoline'],
  [/\bparaffin\b/gi, 'kerosene (US sense)'],
  [/\btarpaulin(s)?\b/gi, 'tarp…'],
  [/\bspanner(s)?\b/gi, 'wrench…'],
  [/\bstorage heater(s)?\b/gi, 'space heater…'],

  /* -ise / -isation verbs beyond the ones already seen. */
  /* NOT 'analysis', which is the correct US noun. Same trap as specialist. */
  [/\banalys(e|ed|ing)\b/gi, 'analyz…'],
  [/\bparalys(e|ed|es|ing)\b/gi, 'paralyz…'],
  [/\bcatalys(e|ed|es|ing)\b/gi, 'catalyz…'],
  [/\bminimis(e|ed|es|ing)\b/gi, 'minimiz…'],
  [/\bmaximis(e|ed|es|ing)\b/gi, 'maximiz…'],
  [/\bprioritis(e|ed|es|ing)\b/gi, 'prioritiz…'],
  /* NOT 'specialist' or 'specialists' — those are correct US English. Only
     the -ise verb forms are British. The first version of this line matched
     the noun and produced 20 false positives on the first run, which is
     exactly how a check teaches people to ignore it. */
  [/\bspecialis(e|ed|es|ing)\b/gi, 'specializ…'],
  [/\bstabilis(e|ed|es|ing)\b/gi, 'stabiliz…'],
  [/\bsterilis(e|ed|es|ing|ation)\b/gi, 'steriliz…'],
  [/\bneutralis(e|ed|es|ing)\b/gi, 'neutraliz…'],
  [/\butilis(e|ed|es|ing|ation)\b/gi, 'utiliz…'],
  [/\bemphasis(e|ed|es|ing)\b/gi, 'emphasiz…'],
  [/\bapologis(e|ed|es|ing)\b/gi, 'apologiz…'],
  [/\bcharacteris(e|ed|es|ing)\b/gi, 'characteriz…'],
  [/\bsummaris(e|ed|es|ing)\b/gi, 'summariz…'],
  [/\bmodernis(e|ed|es|ing)\b/gi, 'moderniz…'],
  [/\bacclimatis(e|ed|es|ing)\b/gi, 'acclimat…'],

  /* Doubled consonants where US English uses one. */
  [/\bcancell(ed|ing)\b/gi, 'cancel…'],
  [/\blabell(ed|ing)\b/gi, 'label…'],
  [/\bmodell(ed|ing)\b/gi, 'model…'],
  [/\bsignall(ed|ing)\b/gi, 'signal…'],
  [/\bfuell(ed|ing)\b/gi, 'fuel…'],
  [/\bcounsell(or|ors|ed|ing)\b/gi, 'counsel…'],
  [/\bmarvellous\b/gi, 'marvelous'],
  [/\bjewellery\b/gi, 'jewelry'],
  [/\bwoollen\b/gi, 'woolen'],

  /* Single consonants where US English doubles, and -l endings. */
  [/\bfulfil(s|ment|ments)?\b/gi, 'fulfill…'],
  [/\benrol(ment|ments)\b/gi, 'enroll…'],
  [/\binstalment(s)?\b/gi, 'installment…'],
  [/\bskilful(ly)?\b/gi, 'skillful…'],
  [/\bdistil(s|ed|ing)?\b/gi, 'distill…'],
  [/\bappal(s|led|ling)?\b/gi, 'appall…'],

  /* -re, -ce, -ogue, and assorted. */
  [/\bfibre?board\b/gi, 'fiberboard'],
  [/\bmanoeuvre(s|d)?\b/gi, 'maneuver…'],
  [/\boffence(s)?\b/gi, 'offense…'],
  [/\bpretence(s)?\b/gi, 'pretense…'],
  [/\bpractis(e|ed|es|ing)\b/gi, 'practice…'],
  [/\bcatalogue(s|d)?\b/gi, 'catalog…'],
  [/\bartefact(s)?\b/gi, 'artifact…'],
  [/\bspeciality(s|ies)?\b/gi, 'specialty…'],
  [/\borientated\b/gi, 'oriented'],
  [/\bwhilst\b/gi, 'while'],
  [/\bcheque(s)?\b/gi, 'check…'],
  [/\bsceptic(al|ism)?\b/gi, 'skeptic…'],
  [/\bencyclopaedia\b/gi, 'encyclopedia'],
  [/\bfoetal|foetus\b/gi, 'fetal / fetus'],
  [/\boedema\b/gi, 'edema'],
  [/\bdiarrhoea\b/gi, 'diarrhea'],
  [/\bhaemorrhag(e|ic)\b/gi, 'hemorrhag…'],
  [/\banaesthe(tic|sia)\b/gi, 'anesthe…'],
  [/\bpyjamas\b/gi, 'pajamas'],
  [/\bmoustache(s)?\b/gi, 'mustache…'],
  [/\bploughed\b/gi, 'plowed'],
  [/\blearnt\b/gi, 'learned'],
  [/\bspelt\b/gi, 'spelled'],
  [/\baeroplane(s)?\b/gi, 'airplane…'],
  [/\bgaol(s)?\b/gi, 'jail…'],
  [/\bcosy\b/gi, 'cozy'],
  [/\bstoreys\b/gi, 'stories'],
  [/\bhoneycombe\b/gi, 'honeycomb'],
];

/**
 * "MOULD" GETS ITS OWN TREATMENT, and it is the reason this file is a script
 * rather than a regex one-liner.
 *
 * On a pest control site in a wet county, mold is a subject that comes up
 * constantly, so the British spelling is both likely and expensive — it is
 * the word a Whatcom County reader is most apt to notice as foreign. But
 * "mould" is also a real US word in the casting sense (a mould for concrete),
 * and "moulding" is standard US English for trim. So:
 *
 *   mould / moulds / mouldy   → always wrong here, always flagged
 *   moulding / mouldings      → allowed, it is US usage for trim
 *
 * Getting this wrong in either direction is worse than not checking: a false
 * positive on "moulding" trains people to ignore the check.
 */
const MOULD = /\bmould(s|y|ed|ing)?\b/gi;
const isMoulding = (m: string) => /^moulding/i.test(m);

/**
 * Exemptions. A quoted source title must be reproduced exactly as published,
 * and a proper noun is a name rather than a spelling choice.
 */
const ALLOW = [
  /Centre for Disease/i,            // if ever cited under a British title
  /World Health Organisation/i,     // the WHO's own historical styling
  /Theatre/i,                       // proper nouns: Mount Baker Theatre
  /Harbour Centre/i,
  /Defence Force/i,
];

const walk = (dir: string, exts: string[], out: string[] = []): string[] => {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, exts, out);
    else if (exts.some((x) => e.name.endsWith(x))) out.push(p);
  }
  return out;
};

/* Source content AND built output. Source catches it at author time; built
   output catches anything a component or a data file injects, which is where
   "licence" hid in the footer for one commit. */
const targets = [
  ...walk('src/content', ['.md']),
  ...walk('src/pages', ['.astro']),
  ...walk('src/components', ['.astro']),
  ...walk('src/data', ['.ts']),
  ...walk('src/lib', ['.ts']),
  ...walk('dist', ['.html']),
];

let hits = 0;
const seen = new Set<string>();

for (const file of targets) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split('\n');

  for (const [re, fix] of BRITISH) {
    lines.forEach((line, i) => {
      if (ALLOW.some((a) => a.test(line))) return;
      const m = line.match(re);
      if (!m) return;
      const key = `${file}:${i}:${m[0].toLowerCase()}`;
      if (seen.has(key)) return;
      seen.add(key);
      console.log(`\x1b[31m${file}:${i + 1}\x1b[0m  "${m[0]}" → ${fix}`);
      hits++;
    });
  }

  lines.forEach((line, i) => {
    if (ALLOW.some((a) => a.test(line))) return;
    for (const m of line.match(MOULD) ?? []) {
      if (isMoulding(m)) continue;
      const key = `${file}:${i}:${m.toLowerCase()}`;
      if (seen.has(key)) continue;
      seen.add(key);
      console.log(`\x1b[31m${file}:${i + 1}\x1b[0m  "${m}" → mold… (note: "moulding" for trim is fine)`);
      hits++;
    }
  });
}

console.log(
  hits === 0
    ? `\x1b[32mUS spelling: clean across ${targets.length} files, ${BRITISH.length + 1} patterns\x1b[0m`
    : `\x1b[31m${hits} British spelling${hits === 1 ? '' : 's'} found\x1b[0m`,
);
process.exit(hits ? 1 : 0);
