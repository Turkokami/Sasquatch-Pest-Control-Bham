# Source library

Owner-supplied reference documents, catalogued 2 September 2026. The PDFs live
outside this repository at `C:\Users\turko\Desktop\Studies\` (and subfolders);
this file is the index and, more importantly, the ruling on what each one may
be used for.

Re-run the catalogue after any new batch arrives:

```
python sasquatch-wa/.image-work/sources/catalogue.py
```

It walks the tree, de-duplicates by MD5, and grades each document by issuer.

**34 files, 33 unique, 983 pages** at the time of writing.

---

## Why documents are graded rather than just listed

This site cites its claims, names the issuer, and records the date each source
was read — see `src/content/pests/*.md` frontmatter and
`docs/COMPLIANCE-SOURCES.md`. So the question for each document is not "is this
interesting" but "may this appear in a citation list". Three things decide it:

1. **Who published it.** A state agency or a land-grant extension service can be
   cited. A chemical manufacturer or a competing pest control company cannot,
   however good the information is.
2. **Where it applies.** A document about Malaysian or Caribbean pests is not
   evidence about Whatcom County, and quietly importing its claims is how a site
   ends up describing pests that do not live here.
3. **How old it is.** Fine for geography and biology; not for pesticide
   products, label rates or regulations.

---

## Tier A — Washington state agencies and WSU Extension

The strongest sources this site can carry: locally authoritative, and a reader
in Bellingham can check them.

| Document | Issuer | Use it for |
|---|---|---|
| `Guidelines.pdf` (131pp) | WSU Cooperative Extension, **Whatcom & Skagit County**, 1993 | Local geography, hydrology, agricultural context. **Not** pesticide or regulatory specifics — it is 33 years old. |
| `fp_pestic_laws_booklet.pdf` (24pp) | **WSDA** Pesticide Management Division | Washington pesticide law, licensing and recertification. Backs the credential content directly. |
| `420-218-Guideline-Tickborne_0.pdf` (18pp) | **WA Dept of Health**, revised Dec 2024 | Tick-borne disease other than Lyme. Current, and the tick page leans on state figures. |
| `EB1814-WDO-Identification.pdf` (8pp) | WSU Extension | Wood-destroying organism identification. Handle with the WDO rules in mind. |
| `EB1396` (`meal moths.pdf`, 7pp) | WSU Extension | Meal moths. Goes straight onto the thin moth-control page. |
| `PLS-10-Cupboard-Beetles.pdf` (5pp) | WSU Puyallup, Art Antonelli | Stored-product beetles. Goes onto beetle-control. |
| `EM067E` Beneficial Insects (21pp) | WSU Extension | Backs the "we do not treat bumblebees" position. |
| `C195-IPM.pdf` (3pp) | WSU Extension, Spokane Master Gardener | General IPM framing. |
| `90CraneFlies.pdf` (2pp) | WSU Extension, Snohomish County | Crane flies — a local nuisance the site does not cover. |
| `BedBugsPestPress.pdf` (2pp) | PNW Pest Press, IPM in Schools | Bed bugs, regional. |
| `AGR2-2601-042` (2pp) | **WSDA** | Pesticide licensing for professional mosquito control. |
| `wdfw00605` Bats (11pp) | **WDFW** | No bat page exists yet. |
| `wdfw00625` Opossums (8pp) | **WDFW** | Wildlife. |
| `wdfw00626` River Otters (6pp) | **WDFW** | Wildlife. |
| `wdfw00630` Raccoons (10pp) | **WDFW** | Wildlife. |
| `wdfw02348` (9pp) | J. Wildlife Management 2019, via WDFW | Diets of native and introduced tree squirrels **in Washington**. |
| `wdfw02410` (39pp) | **WDFW**, Aug 2023 | Western gray squirrel status review. |
| `7-20221209-bluesheet-beaver-mgmt.pdf` (27pp) | **WDFW** | Beavers and beaver management in Washington. |
| `WA 2022 Wildlife Management Report` (103pp) | **WDFW** | Statewide wildlife management. |

## Tier B — Other extension services and federal agencies

Citable, but not local. Prefer a Tier A equivalent where one exists.

| Document | Issuer | Note |
|---|---|---|
| `7-...bluesheet-beaver-mgmt.pdf` **in `2/3/`** (17pp) | **USDA-APHIS Wildlife Services**, Aug 2022 | **Filename is misleading.** This is not the beaver document — it is *Use of Exclusion in Wildlife Damage Management*, Chapter XXII. Directly relevant to the core exclusion service. |
| `NPS-Rodent-Exclusion-Manual` (104pp) | **National Park Service**, 2019 | Mechanical rodent-proofing techniques. The single most on-topic document in the library for exclusion work. |
| `reducing-bird-collisions-with-buildings.pdf` (19pp) | **US Fish & Wildlife Service**, 2016 | Bird collisions and building glass. |
| `462 Grain Aeration — Chap 11` (21pp) | Kansas State University Extension | Stored product protection. Sumas freight, Burlington distribution. |
| `misc_hg064.pdf` (38pp) | **USDA Forest Service**, HG-64, rev. 2006 | Subterranean termites. Read the caution below. |
| `cmcgillicuddy, IG098` (6pp) | Extension insect guide | Needs a closer look. |
| `Pesticide-Study-Guide-2.pdf` (95pp) | NW Line JATC, 2019 | Utility vegetation management, not structural pest control. Marginal. |

## Tier C — Peer-reviewed

| Document | Note |
|---|---|
| `JApplEnto129_110-117.pdf` (8pp) | Journal of Applied Entomology. Citable if the subject is on-topic. |
| `icup048.pdf` (9pp) | House fly control with imidacloprid in **German pig farms**, authored by **Bayer CropScience**. Peer-reviewed venue, manufacturer-funded, agricultural, foreign. Read it; do not cite it. |

## Tier D — Read, do not cite

| Document | Why |
|---|---|
| `pest_birds_identification_...pdf` (62pp) | A training deck by **Sprague Pest Solutions**, a Copesan partner — a competitor. Useful to read, and citing a competitor's marketing material on your own site is not something to do. |

## Not useful here

Not because they are bad documents, but because they are about somewhere else.

- `biology_and_management_of_termites_-_ntu_2015` — Universiti Sains Malaysia.
  Global and tropical termite biology. Whatcom County has Pacific dampwood
  termites and **not** the aggressive subterranean species this describes;
  importing its claims would put pests on the site that do not live here.
- `misc_hg064` (USDA FS subterranean termites) — same caution. The site
  currently states outright that aggressive subterranean termites "simply are
  not part of the picture" here. Useful only for contrast, never as a local
  threat.
- `Pest-Management-Operators-Training-Manual-April-2016` — prepared for the
  **Caribbean** Forum of ACP States.
- `fruit-fly-detection-guidelines` — USDA agricultural quarantine trapping, not
  structural or residential work.

## Duplicates

- `Studies\Guidelines.pdf` and `Studies\2\Guidelines.pdf` are byte-identical.
- The two `7-20221209-bluesheet-beaver-mgmt.pdf` files are **different
  documents** despite the shared name — 27pp WDFW beaver management, and 17pp
  USDA-APHIS exclusion. Do not treat them as copies.

## Where these change the site

The pest library currently leans hardest on **UC IPM (240 citations)** and
**Penn State (116)** — California and Pennsylvania. WSU, WDFW and WA DOH are
the Washington equivalents and are strictly better for a Whatcom County reader.
Swapping citations where a Tier A equivalent exists is the highest-value use of
this library, followed by the pages that have almost nothing: moth control,
beetle control, and wildlife, where there is no bat page at all.
