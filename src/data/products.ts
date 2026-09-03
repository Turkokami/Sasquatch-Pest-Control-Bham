/* --------------------------------------------------------------------------
 * THE PRODUCT REGISTER — every pesticide product this company applies, with
 * its EPA registration number, its active ingredients, and its label and
 * safety data sheet hosted here as PDFs.
 *
 * WHY THIS EXISTS. Almost nobody in this trade publishes it. Washington
 * requires a licensed applicator to supply this information on request; it
 * does not require anyone to put it on a website in advance, which is exactly
 * why doing so is worth something. Somebody who wants to know what was
 * applied in their kitchen should not have to ask permission to find out.
 *
 * HOW THIS DATA WAS BUILT, AND WHY THAT MATTERS. Every EPA registration
 * number and every active ingredient below was extracted from the product's
 * own label PDF and then independently corroborated against its safety data
 * sheet. Two documents had to agree before anything was written down. Nothing
 * here was typed from memory or from a supplier's catalog description —
 * which was a live risk, because a first parsing pass produced actives like
 * "(6-propylpiperonyl) ether and" by reading a wrapped chemical name as a
 * whole ingredient.
 *
 * WHAT IS DELIBERATELY ABSENT: percentages. Every label states the
 * concentration of each active, but they lay it out in columns that do not
 * survive text extraction — several came out truncated, and several attached
 * a number to the wrong chemical. A wrong percentage beside a correct
 * chemical name is worse than no percentage, and the label is one click away
 * and is the authority. Names yes, numbers no.
 *
 * WHAT MUST NEVER BE ADDED HERE. No efficacy claims and no safety claims of
 * any kind. Under FIFRA it is unlawful to describe a pesticide in terms that
 * differ from its accepted labeling, and "safe", "harmless", "non-toxic" and
 * "EPA approved" are the specific words that draw enforcement. This file
 * carries identifiers and links. It does not carry adjectives.
 *
 * LABELS CHANGE, and a stale label is the real hazard in publishing one. The
 * page states the date this set was received rather than implying the
 * documents are current forever. When a product is reformulated or its label
 * revised, the file here has to be replaced.
 * ------------------------------------------------------------------------ */

export interface PesticideProduct {
  slug: string;
  name: string;
  /**
   * EPA registration number, read off the label. Null where the label PDF did
   * not yield one cleanly — those documents are still linked, and the number
   * is on the document itself.
   */
  epaReg: string | null;
  actives: string[];
  kind: string;
  target: string;
  label: string | null;
  sds: string | null;
  /** No longer applied. Kept listed so the register reads as maintained. */
  retired: boolean;
}

/** The day the owner supplied this document set. Shown on the page. */
export const productsReceived = '3 September 2026';

export const products: PesticideProduct[] = [
  { slug: 'advion-ant-gel', name: 'Advion Ant Gel', epaReg: '100-1498', actives: ['Indoxacarb'], kind: 'Bait', target: 'Ants', label: '/docs/products/advion-ant-gel-label.pdf', sds: '/docs/products/advion-ant-gel-sds.pdf', retired: false },
  { slug: 'maxforce-quantum-ant-bait', name: 'Maxforce Quantum Ant Bait', epaReg: '101563-140', actives: ['Imidacloprid'], kind: 'Bait', target: 'Ants', label: '/docs/products/maxforce-quantum-ant-bait-label.pdf', sds: '/docs/products/maxforce-quantum-ant-bait-sds.pdf', retired: false },
  { slug: 'vendetta-roach-gel', name: 'Vendetta Cockroach Gel Bait', epaReg: '1021-1828', actives: ['Abamectin B1'], kind: 'Bait', target: 'Cockroaches', label: '/docs/products/vendetta-roach-gel-label.pdf', sds: '/docs/products/vendetta-roach-gel-sds.pdf', retired: false },
  { slug: 'vendetta-nitro-roach-gel', name: 'Vendetta Nitro Cockroach Gel Bait', epaReg: '1021-2796', actives: ['Clothianidin', 'Pyriproxyfen'], kind: 'Bait', target: 'Cockroaches', label: '/docs/products/vendetta-nitro-roach-gel-label.pdf', sds: '/docs/products/vendetta-nitro-roach-gel-sds.pdf', retired: false },
  { slug: 'niban-granular-bait', name: 'Niban Granular Bait', epaReg: '64405-2', actives: ['Orthoboric acid'], kind: 'Bait', target: 'Ants, roaches, crickets, silverfish', label: '/docs/products/niban-granular-bait-label.pdf', sds: '/docs/products/niban-granular-bait-sds.pdf', retired: false },
  { slug: 'pt-alpine-fly-bait', name: 'PT Alpine Pressurized Fly Bait', epaReg: '499-568', actives: ['Dinotefuran'], kind: 'Bait', target: 'Flies', label: '/docs/products/pt-alpine-fly-bait-label.pdf', sds: '/docs/products/pt-alpine-fly-bait-sds.pdf', retired: false },
  { slug: 'gentrol-point-source', name: 'Gentrol Point Source', epaReg: '2724-469', actives: ['Hydroprene'], kind: 'Insect growth regulator', target: 'Cockroaches, stored-product pests', label: '/docs/products/gentrol-point-source-label.pdf', sds: '/docs/products/gentrol-point-source-sds.pdf', retired: false },
  { slug: 'tim-bor-professional', name: 'Tim-bor Professional', epaReg: '64405-8', actives: ['Disodium octaborate tetrahydrate'], kind: 'Borate', target: 'Wood-destroying insects, decay fungi', label: '/docs/products/tim-bor-professional-label.pdf', sds: '/docs/products/tim-bor-professional-sds.pdf', retired: false },
  { slug: 'bifen-it', name: 'Bifen I/T', epaReg: '53883-118', actives: ['Bifenthrin'], kind: 'Residual', target: 'General perimeter and structural', label: '/docs/products/bifen-it-label.pdf', sds: '/docs/products/bifen-it-sds.pdf', retired: false },
  { slug: 'masterline-bifenthrin', name: 'MasterLine Bifenthrin 7.9', epaReg: '73748-7', actives: ['Bifenthrin'], kind: 'Residual', target: 'General perimeter and structural', label: '/docs/products/masterline-bifenthrin-label.pdf', sds: '/docs/products/masterline-bifenthrin-sds.pdf', retired: false },
  { slug: 'cyzmic-cs', name: 'Cyzmic CS', epaReg: '53883-389', actives: ['Lambda-cyhalothrin'], kind: 'Residual', target: 'General perimeter and structural', label: '/docs/products/cyzmic-cs-label.pdf', sds: '/docs/products/cyzmic-cs-sds.pdf', retired: false },
  { slug: 'transport-mikron', name: 'Transport Mikron', epaReg: '8033-109-279', actives: ['Acetamiprid', 'Bifenthrin'], kind: 'Residual', target: 'General, including ants and spiders', label: '/docs/products/transport-mikron-label.pdf', sds: '/docs/products/transport-mikron-sds.pdf', retired: false },
  { slug: 'temprid-ready-spray', name: 'Temprid Ready-to-Spray', epaReg: '432-1527', actives: ['Imidacloprid', 'Beta-cyfluthrin'], kind: 'Residual', target: 'General, including bed bugs', label: '/docs/products/temprid-ready-spray-label.pdf', sds: '/docs/products/temprid-ready-spray-sds.pdf', retired: false },
  { slug: 'onslaught-fastcap', name: 'Onslaught FastCap', epaReg: '1021-2574', actives: ['Esfenvalerate', 'Prallethrin', 'Piperonyl butoxide'], kind: 'Residual', target: 'Spiders and general', label: '/docs/products/onslaught-fastcap-label.pdf', sds: '/docs/products/onslaught-fastcap-sds.pdf', retired: false },
  { slug: 'alpine-wsg', name: 'Alpine WSG', epaReg: '499-561', actives: ['Dinotefuran'], kind: 'Residual', target: 'Ants, bed bugs, stored-product pests', label: '/docs/products/alpine-wsg-label.pdf', sds: '/docs/products/alpine-wsg-sds.pdf', retired: false },
  { slug: 'd-foam', name: 'D-Foam', epaReg: '279-3443', actives: ['Deltamethrin'], kind: 'Foam', target: 'Voids and inaccessible harborage', label: '/docs/products/d-foam-label.pdf', sds: '/docs/products/d-foam-sds.pdf', retired: false },
  { slug: 'pt-phantom-ii', name: 'PT Phantom II', epaReg: '499-548', actives: ['Chlorfenapyr'], kind: 'Aerosol', target: 'Cockroaches, ants, bed bugs', label: '/docs/products/pt-phantom-ii-label.pdf', sds: '/docs/products/pt-phantom-ii-sds.pdf', retired: false },
  { slug: 'pt-565-plus-xlo', name: 'PT 565 Plus XLO', epaReg: '499-290', actives: ['Pyrethrins', 'Piperonyl butoxide', 'N-octyl bicycloheptene dicarboximide'], kind: 'Aerosol', target: 'Flushing and contact', label: '/docs/products/pt-565-plus-xlo-label.pdf', sds: '/docs/products/pt-565-plus-xlo-sds.pdf', retired: false },
  { slug: 'pt-ultracide', name: 'PT Ultracide', epaReg: '499-404', actives: ['Pyrethrins', 'Permethrin', 'Pyriproxyfen', 'N-octyl bicycloheptene dicarboximide'], kind: 'Aerosol', target: 'Fleas', label: '/docs/products/pt-ultracide-label.pdf', sds: '/docs/products/pt-ultracide-sds.pdf', retired: false },
  { slug: 'pt-alpine-flea-bed-bug', name: 'PT Alpine Flea & Bed Bug', epaReg: '499-540', actives: ['Dinotefuran', 'Prallethrin', 'Pyriproxyfen'], kind: 'Aerosol', target: 'Fleas and bed bugs', label: '/docs/products/pt-alpine-flea-bed-bug-label.pdf', sds: '/docs/products/pt-alpine-flea-bed-bug-sds.pdf', retired: false },
  { slug: 'nuvan-prostrips', name: 'Nuvan ProStrips', epaReg: '5481-553', actives: ['Dichlorvos'], kind: 'Vapor strip', target: 'Enclosed spaces', label: '/docs/products/nuvan-prostrips-label.pdf', sds: '/docs/products/nuvan-prostrips-sds.pdf', retired: false },
  { slug: 'termidor-sc', name: 'Termidor SC', epaReg: '7969-210', actives: ['Fipronil'], kind: 'Termiticide', target: 'Termites and wood-destroying insects', label: '/docs/products/termidor-sc-label.pdf', sds: '/docs/products/termidor-sc-sds.pdf', retired: false },
  { slug: 'taurus-sc', name: 'Taurus SC', epaReg: '53883-279', actives: ['Fipronil'], kind: 'Termiticide', target: 'Termites and wood-destroying insects', label: '/docs/products/taurus-sc-label.pdf', sds: '/docs/products/taurus-sc-sds.pdf', retired: false },
  { slug: 'fipronil-plus-c', name: 'Fipronil Plus C', epaReg: null, actives: ['Fipronil'], kind: 'Termiticide', target: 'Termites and wood-destroying insects', label: '/docs/products/fipronil-plus-c-label.pdf', sds: '/docs/products/fipronil-plus-c-sds.pdf', retired: false },
  { slug: 'resolv-soft-bait', name: 'Resolv Soft Bait', epaReg: '7173-297', actives: ['Bromadiolone'], kind: 'Rodenticide', target: 'Rats and mice', label: '/docs/products/resolv-soft-bait-label.pdf', sds: '/docs/products/resolv-soft-bait-sds.pdf', retired: false },
  { slug: 'contrac-all-weather-blox', name: 'Contrac All-Weather Blox', epaReg: null, actives: ['Bromadiolone'], kind: 'Rodenticide', target: 'Rats and mice', label: '/docs/products/contrac-all-weather-blox-label.pdf', sds: '/docs/products/contrac-all-weather-blox-sds.pdf', retired: false },
  { slug: 'maki-mini-bait-blocks', name: 'Maki Mini Bait Blocks', epaReg: null, actives: ['Bromadiolone'], kind: 'Rodenticide', target: 'Rats and mice', label: '/docs/products/maki-mini-bait-blocks-label.pdf', sds: '/docs/products/maki-mini-bait-blocks-sds.pdf', retired: false },
  { slug: 'victor-mole-gopher-repellent', name: 'Victor Mole & Gopher Repellent', epaReg: null, actives: ['Castor oil'], kind: 'Repellent', target: 'Moles and gophers', label: null, sds: '/docs/products/victor-mole-gopher-repellent-sds.pdf', retired: false },
  { slug: 'cb-80-extra', name: 'CB-80 Extra', epaReg: '9444-175', actives: ['Pyrethrins', 'Piperonyl butoxide'], kind: 'Aerosol', target: 'Flushing and contact', label: '/docs/products/cb-80-extra-label.pdf', sds: '/docs/products/cb-80-extra-sds.pdf', retired: true },
  { slug: 'cb-40', name: 'CB-40', epaReg: '279-3397', actives: ['Pyrethrins', 'Piperonyl butoxide', 'N-octyl bicycloheptene dicarboximide'], kind: 'Aerosol', target: 'Flushing and contact', label: '/docs/products/cb-40-label.pdf', sds: '/docs/products/cb-40-sds.pdf', retired: true },
  { slug: 'pt-wasp-freeze', name: 'PT Wasp Freeze', epaReg: '499-362', actives: ['d-trans Allethrin', 'Phenothrin'], kind: 'Aerosol', target: 'Wasps and hornets', label: '/docs/products/pt-wasp-freeze-label.pdf', sds: '/docs/products/pt-wasp-freeze-sds.pdf', retired: true },
];

export const activeProducts = () => products.filter((p) => !p.retired);
export const retiredProducts = () => products.filter((p) => p.retired);

/** Distinct actives across everything currently in use, for the page's summary. */
export const activeIngredientList = () =>
  [...new Set(activeProducts().flatMap((p) => p.actives))].sort((a, b) => a.localeCompare(b));
