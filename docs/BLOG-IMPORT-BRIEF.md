# Blog import brief — read this before writing a single file

You are importing posts from the legacy WordPress site at
`https://sasquatchpestcontrol.com/<slug>/` into the Astro content collection
at `/root/sasquatch-wa/src/content/blog/<slug>.md`.

Work in `/root/sasquatch-wa`. Do not run `npm run build` or `npm run gate` —
the orchestrator runs those once at the end. Do not edit any file outside
`src/content/blog/`.

---

## 1. Fetch

For each slug, `WebFetch` `https://sasquatchpestcontrol.com/<slug>/` with this
prompt, verbatim:

> Return the complete article body text verbatim, from the first heading to the
> end, preserving all headings and paragraphs exactly as written. Do not
> summarize. Also list any FAQ questions and answers at the end of the article.

If a fetch fails or returns navigation chrome instead of an article, retry once.
If it fails twice, **do not invent the post** — skip it and report the slug as
failed in your final message. A fabricated post is far worse than a missing one.

## 2. Convert the body

Keep the author's words. This is an import, not a rewrite. Convert HTML
structure to Markdown: `##` for the article's own section headings (never `#` —
the H1 comes from frontmatter), `-` for bullets, `**bold**` where the original
emphasised.

Drop everything that is not the article: navigation, sidebars, "Get a free
quote" boxes, repeated phone numbers, author bios, social sharing, related-post
lists, and any trailing block of unrelated links.

## 3. The edits you MUST make

These override "verbatim". Every one of them is a thing the build will reject or
a thing that is no longer true, and leaving it in means the whole batch fails.

**a. No dollar figures.** Harness check 2b fails on any price in built HTML that
does not come from `business.pricing`. Delete the sentence containing a price,
or rewrite it to say pricing depends on the property and is quoted after a
visit. Never invent a replacement number.

**b. No inspection-authority language.** The company holds treatment licenses,
not a structural pest inspector credential. Remove or reword anything that
offers, promises or implies:
- a WDO / wood destroying organism inspection
- a structural pest inspection
- a written report of *findings* — what we found, what we observed, what the
  damage is. A record of the **treatment performed** is fine and is the correct
  substitute.
- an inspection required for a real estate sale, escrow, refinance or loan

"We will come out and take a look" is fine. "We will inspect your home and give
you a report on what we find" is not.

**c. No warranty or guarantee language** beyond what the site already says.
Delete "guaranteed", "100% guaranteed", "we guarantee results", "permanent
solution", "eliminate forever". Reword to what is actually true: the treatment
plan, the follow-up, the retreat policy.

**d. No review counts, star ratings, or "voted best" claims.** No "over 300
five-star reviews", no awards, no "#1 in Whatcom County". The site publishes no
aggregate rating until a verified pull supplies one.

**e. No bird or wildlife services.** Bird exclusion, seagulls, swallows,
raccoons, squirrels-as-wildlife-removal, moles, bats. Removed from scope 30 Aug
2026. Delete those passages. If a whole post is about them, stop and report it.

**f. No mosquito, cricket, springtail or tick *service* offers.** Those are
retired. Mentioning the insect as a fact of local life is fine; offering to
treat for it is not.

**g. US spelling throughout.** This has been the single most repeated defect in
this build. `neighborhood` not `neighbourhood`, `recognize` not `recognise`,
`gray` not `grey`, `defense`, `program`, `judgment`, `organized`, `center`,
`traveling`, `favor`, `behavior`, `color`, `meter`, `fiber`, `story` (of a
building), `curb`, `baseboard`. Check your own prose too, not just the source.

**h. No staff names, license numbers or credentials.** Those are published from
`src/data/business.ts` only.

**i. Fix anything factually wrong.** If the post states something you know to be
untrue — a wrong species range, a wrong temperature threshold, a wrong legal
duty — correct it or cut the sentence. Do not leave a known error in place
because it was in the original.

## 4. Frontmatter

Exactly this shape. The collection schema in `src/content/config.ts` enforces
it and will fail the build if you get it wrong.

```yaml
---
title: 'Under 60 characters, no brand suffix'
description: 'Between 110 and 165 characters. Must end on . ! or ?'
h1: 'The article headline, roughly as the original had it'
legacyUrl: '/<slug>/'
imported: 2026-08-31
supersededBy: '/services/whatever/'   # only if the manifest gives one; omit if null
---
```

Field notes:

- `title` — **≤ 60 characters, hard limit.** Count them. The brand is appended
  automatically, so do not write "| Sasquatch Pest Control".
- `description` — **≥ 110 and ≤ 165 characters, hard limits**, and must end on
  punctuation. Count them. This is the most common cause of a failed build.
- `h1` — the article's own headline. May differ from `title`.
- `legacyUrl` — root-level, leading and trailing slash, lowercase and hyphens.
- `supersededBy` — copy it **exactly** from the manifest entry you were given.
  If the manifest says `null`, omit the key entirely. Do not invent one and do
  not guess a path — a path that does not exist fails the build.

**Do not add** `answer`, `faqs`, `ready`, `hero`, `sources` or any other key.

`answer` and `faqs` are available in the schema but are strictly optional, and
you should leave both out. `answer` has to be 40–60 words and actually answer
the page's question; `faqs` needs 3–8 items, each ending in a question mark,
each answer 40+ characters, no duplicates. Getting either slightly wrong fails
the whole build for everyone. If the original post had an FAQ section, keep it
in the **body** as `## Common questions` with `### question` subheadings — that
preserves the content without touching the schema.

## 5. Length

Do not pad. The imported posts run 1,400–2,400 words and the blog tier's floor
is 900, which they clear comfortably. If a post comes back under 900 words,
say so in your report rather than inventing filler — a genuinely short post is
better handled by marking it superseded than by stuffing it.

## 6. Report back

One line per slug: `slug — N words — ok` / `— superseded` / `— FAILED: reason`.
Then a short list of anything you had to remove under section 3, because that
list is going to the owner. Nothing else. Do not paste article text back.
