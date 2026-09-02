/**
 * The relatedTo matcher decides which guides appear on which pages. It has
 * been wrong twice — first matching whole subtrees, then matching one level
 * down from any path — and both times the symptom was a guide quietly showing
 * up somewhere irrelevant rather than an error. So it gets a test.
 *
 * The matcher is small enough to restate here rather than exporting it; the
 * point of the test is that the SEMANTICS are pinned, and a change to the real
 * one that breaks these cases is a change that needs arguing for.
 */
function matches(pattern: string, path: string): boolean {
  if (pattern.endsWith('/*')) {
    const base = pattern.slice(0, -1);
    if (!path.startsWith(base)) return false;
    const rest = path.slice(base.length).replace(/\/$/, '');
    return rest.length > 0 && !rest.includes('/');
  }
  return pattern === path;
}

const CASES: [string, string, boolean][] = [
  /* Exact form matches that page and nothing else. */
  ['/services/wdo-treatment/', '/services/wdo-treatment/', true],
  ['/services/rodent-control/', '/services/rodent-control/', true],
  /* …and specifically NOT its children. This is the case that put a guide
     about school pesticide notification onto a page about rats. */
  ['/services/rodent-control/', '/services/rodent-control/rats-in-the-crawlspace/', false],
  ['/locations/bellingham/', '/locations/bellingham/edgemoor/', false],

  /* Star form matches one level down. */
  ['/services/*', '/services/wdo-treatment/', true],
  ['/services/*', '/services/rodent-control/', true],
  ['/locations/*', '/locations/bellingham/', true],
  /* …and NOT two levels down. This is the subtree bug. */
  ['/services/*', '/services/rodent-control/rats-in-the-crawlspace/', false],
  ['/locations/*', '/locations/bellingham/edgemoor/', false],
  /* …and not the section root itself. */
  ['/services/*', '/services/', false],
  /* …and not a different section. */
  ['/services/*', '/locations/bellingham/', false],
  ['/services/*', '/commercial/', false],

  /* A page path outside the pattern's section never matches. */
  ['/commercial/', '/commercial/', true],
  ['/commercial/', '/services/commercial-pest-control/', false],
];

let fails = 0;
for (const [pattern, path, want] of CASES) {
  const got = matches(pattern, path);
  if (got !== want) {
    console.log(`WRONG: matches("${pattern}", "${path}") = ${got}, expected ${want}`);
    fails++;
  }
}
console.log(fails === 0
  ? `\x1b[32mguide relatedTo matcher: ${CASES.length}/${CASES.length} cases correct\x1b[0m`
  : `\x1b[31m${fails} of ${CASES.length} cases wrong\x1b[0m`);
process.exit(fails ? 1 : 0);
