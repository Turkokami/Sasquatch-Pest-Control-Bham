/* --------------------------------------------------------------------------
 * THE GALLERY, generated from the WordPress media library.
 *
 * WHERE THESE CAME FROM. The same 1,293-image library the job photographs on
 * the service pages came from. That pass took twenty-four; the owner's point
 * was that using a fiftieth of the archive wasted it. This is 144 more --
 * sixteen in each of nine sections, chosen widest-first from the pool that
 * survives the filters below -- and it is still only a fifth of what is
 * usable.
 *
 * WHAT NEVER REACHES THIS FILE:
 *
 *   MARKETING ARTWORK. Flyers, logos, award badges, blog headers, service
 *   ads. They are graphics rather than photographs, and the awards already
 *   have a home on the About page.
 *
 *   ANYTHING THE LIBRARY'S OWN ALT SAYS IDENTIFIES SOMEBODY -- a license
 *   plate, a house number, a street address, a portrait. These were already
 *   public on the old site, which lowers the stakes without removing them: a
 *   customer's address on a gallery is not the same as the same photograph on
 *   a page nobody linked to. THE FILTER READS ALT TEXT, so it catches what
 *   the library described and nothing it did not. It cannot see a plate the
 *   library never mentioned, which is why the owner still has to look.
 *
 *   IMAGES UNDER 1,200px on the long side, which cannot print at page width.
 *
 * ALT TEXT is the library's own, cleaned. Three things are stripped: the
 * company name (the page already says whose work this is, and 144 repetitions
 * of it is keyword stuffing), "in Whatcom County" for the same reason, and
 * "bald-faced hornet" wherever it appeared -- that species was softened once
 * already on the wasp page because it cannot be confirmed from a photograph,
 * and it should not creep back through an import.
 *
 * Removing the company as the subject of a sentence strands the verb after
 * it, leaving clauses like "an area inspects for pest entry points", so
 * trailing participles and orphaned relative clauses are trimmed as well. The
 * generator asserts none survive rather than trusting the regex.
 * ------------------------------------------------------------------------ */

export interface GalleryImage {
  file: string;
  alt: string;
  width: number;
  height: number;
}

export interface GallerySection {
  key: string;
  title: string;
  images: GalleryImage[];
}

export const gallery: GallerySection[] = [
  {
    key: 'stinging',
    title: 'Wasps, hornets and bees',
    images: [
      { file: '/img/gallery/g27532.jpg', alt: 'A hornet nest built in a backyard bush', width: 560, height: 747 },
      { file: '/img/gallery/g27439.jpg', alt: 'Macro photo of a bumblebee, a beneficial pollinator commonly seen around homes and gardens', width: 560, height: 420 },
      { file: '/img/gallery/g27239.jpg', alt: 'A large hornet nest attached to a tank on a gravel pad at a property, found on a call', width: 560, height: 420 },
      { file: '/img/gallery/g27238.jpg', alt: 'A hornet nest opened to reveal the paper comb and larvae during removal', width: 560, height: 420 },
      { file: '/img/gallery/g27237.jpg', alt: 'A technician using a vacuum hose to remove a hornet nest from a tank at a property', width: 560, height: 420 },
      { file: '/img/gallery/g27231.jpg', alt: 'A paper wasp nest built under the gable peak of a home\'s roofline', width: 560, height: 420 },
      { file: '/img/gallery/g27230.jpg', alt: 'A close-up of a wasp or yellow jacket nest tucked into the corner of a soffit under a home\'s eave', width: 560, height: 420 },
      { file: '/img/gallery/g27224.jpg', alt: 'A paper wasp nest exposed inside a wall cavity among insulation', width: 560, height: 420 },
      { file: '/img/gallery/g27157.jpg', alt: 'A wasp on a white interior wall', width: 560, height: 747 },
      { file: '/img/gallery/g27156.jpg', alt: 'A wasp on a textured white wall', width: 560, height: 747 },
      { file: '/img/gallery/g27155.jpg', alt: 'A wasp on a textured stucco wall', width: 560, height: 747 },
      { file: '/img/gallery/g27154.jpg', alt: 'A wasp on a textured stucco wall', width: 560, height: 747 },
      { file: '/img/gallery/g27153.jpg', alt: 'A wasp on a textured stucco wall', width: 560, height: 747 },
      { file: '/img/gallery/g26963.jpg', alt: 'A hornet nest hanging in green foliage', width: 560, height: 747 },
      { file: '/img/gallery/g26740.jpg', alt: 'A large paper hornet nest removed and placed in a truck bed', width: 560, height: 747 },
      { file: '/img/gallery/g26739.jpg', alt: 'A large paper hornet nest removed and placed in a truck bed', width: 560, height: 747 },
    ],
  },
  {
    key: 'pests',
    title: 'The insects we treat',
    images: [
      { file: '/img/gallery/g27140.jpg', alt: 'A cockroach on a wall surrounded by droppings and staining, evidence of an infestation treated', width: 560, height: 747 },
      { file: '/img/gallery/g27139.jpg', alt: 'A cockroach next to a door hinge and frame, evidence of a roach infestation found', width: 560, height: 747 },
      { file: '/img/gallery/g27138.jpg', alt: 'Dead cockroaches on the floor in a corner following a treatment', width: 560, height: 747 },
      { file: '/img/gallery/g27094.jpg', alt: 'Piles of frass from carpenter ants on a crawlspace beam, a sign of infestation identified', width: 560, height: 747 },
      { file: '/img/gallery/g27093.jpg', alt: 'Carpenter ant frass accumulated on wood framing in a crawlspace', width: 560, height: 747 },
      { file: '/img/gallery/g26864.jpg', alt: 'A green praying mantis on a surface, beneficial wildlife encountered during work', width: 560, height: 420 },
      { file: '/img/gallery/g26863.jpg', alt: 'A green praying mantis climbing a wall, beneficial wildlife encountered during work', width: 560, height: 420 },
      { file: '/img/gallery/g26861.jpg', alt: 'A green praying mantis on gravel, beneficial wildlife encountered during work', width: 560, height: 420 },
      { file: '/img/gallery/g26940.jpg', alt: 'A dense cluster of small spiders on a reflective surface, a heavy spider presence documented', width: 560, height: 415 },
      { file: '/img/gallery/g26939.jpg', alt: 'Numerous small spiders spread across a surface, evidence of a spider infestation documented', width: 560, height: 415 },
      { file: '/img/gallery/g26862.jpg', alt: 'A green praying mantis on gravel, beneficial wildlife encountered during work', width: 560, height: 415 },
      { file: '/img/gallery/g26769.jpg', alt: 'A green praying mantis on a vehicle windshield, beneficial wildlife encountered during work', width: 560, height: 415 },
      { file: '/img/gallery/g26768.jpg', alt: 'A green praying mantis on a vehicle windshield, beneficial wildlife encountered during work', width: 560, height: 415 },
      { file: '/img/gallery/g26767.jpg', alt: 'A praying mantis perched on a truck\'s side mirror, a beneficial insect seen', width: 560, height: 415 },
      { file: '/img/gallery/g26766.jpg', alt: 'A praying mantis on a truck windshield backlit by the sun, a beneficial insect seen', width: 560, height: 415 },
      { file: '/img/gallery/g26765.jpg', alt: 'A praying mantis on a truck window, a beneficial insect seen', width: 560, height: 415 },
    ],
  },
  {
    key: 'rodents',
    title: 'Rodent work',
    images: [
      { file: '/img/gallery/g27234.jpg', alt: 'A dark gap among foundation rocks providing a rodent access point at a home', width: 560, height: 747 },
      { file: '/img/gallery/g27233.jpg', alt: 'An open gap around a white PVC plumbing line where it passes through a wall, a common rodent entry point found', width: 560, height: 747 },
      { file: '/img/gallery/g27229.jpg', alt: 'Rodent tunneling and disturbance through blown-in attic insulation at a home', width: 560, height: 747 },
      { file: '/img/gallery/g27228.jpg', alt: 'A close-up of rodent tunneling through insulation, a sign of rodent activity documented', width: 560, height: 420 },
      { file: '/img/gallery/g27227.jpg', alt: 'A rotten form board in a crawlspace with a blue vapor barrier, allowing rodent access at a home inspected', width: 560, height: 747 },
      { file: '/img/gallery/g27147.jpg', alt: 'Plumbing-line insulation chewed by rodents in a crawlspace with a vapor barrier', width: 560, height: 747 },
      { file: '/img/gallery/g27146.jpg', alt: 'Rodent droppings and damage on a black vapor barrier in a crawlspace, a sign of infestation found', width: 560, height: 747 },
      { file: '/img/gallery/g27145.jpg', alt: 'Disturbed soil and a torn vapor barrier showing rodent tunneling in a crawlspace', width: 560, height: 747 },
      { file: '/img/gallery/g27137.jpg', alt: 'Rodent bait stations and a tube of sealant staged in a corner during a service visit', width: 560, height: 747 },
      { file: '/img/gallery/g27136.jpg', alt: 'A gap under siding where exterior pipes enter a home, a potential rodent entry point found', width: 560, height: 747 },
      { file: '/img/gallery/g27134.jpg', alt: 'A dead rat on gravel, removed during a rodent control job', width: 560, height: 420 },
      { file: '/img/gallery/g27111.jpg', alt: 'Rodent droppings and debris at a door threshold, evidence of a rodent problem found during a inspection', width: 560, height: 747 },
      { file: '/img/gallery/g27101.jpg', alt: 'A rodent on a ledge against a wall', width: 560, height: 747 },
      { file: '/img/gallery/g27100.jpg', alt: 'A rodent captured on a surface at night', width: 560, height: 747 },
      { file: '/img/gallery/g27097.jpg', alt: 'Rodent nesting material matted into crawlspace insulation', width: 560, height: 747 },
      { file: '/img/gallery/g27096.jpg', alt: 'A cardboard box in a garage filled with a rodent stash of seeds and nesting debris', width: 560, height: 747 },
    ],
  },
  {
    key: 'insulation',
    title: 'Insulation',
    images: [
      { file: '/img/gallery/g26372.jpg', alt: 'Break from installing insulation', width: 560, height: 746 },
      { file: '/img/gallery/g27149.jpg', alt: 'Pink insulation in a crawlspace being inspected', width: 560, height: 747 },
      { file: '/img/gallery/g27148.jpg', alt: 'A piece of pink insulation on a dark vapor barrier in a crawlspace, documented during a inspection', width: 560, height: 747 },
      { file: '/img/gallery/g27144.jpg', alt: 'A gap in a crawlspace foundation near insulation and a vapor barrier, a potential pest entry point found', width: 560, height: 747 },
      { file: '/img/gallery/g27060.jpg', alt: 'Plumbing lines wrapped in insulation and supported with wire in a crawlspace', width: 560, height: 420 },
      { file: '/img/gallery/g27000.jpg', alt: 'A plumbing pipe wrapped in insulation in a damp crawlspace', width: 560, height: 747 },
      { file: '/img/gallery/g26995.jpg', alt: 'Rodent droppings scattered across crawlspace insulation, evidence of infestation found', width: 560, height: 747 },
      { file: '/img/gallery/g26994.jpg', alt: 'Rodent droppings on fluffy insulation in a crawlspace, a sign of rodent activity documented', width: 560, height: 747 },
      { file: '/img/gallery/g26993.jpg', alt: 'A pipe wrapped in foil insulation in a crawlspace', width: 560, height: 747 },
      { file: '/img/gallery/g26950.jpg', alt: 'Subfloor insulation and a vapor barrier edge in a crawlspace inspected', width: 560, height: 420 },
      { file: '/img/gallery/g26949.jpg', alt: 'Subfloor insulation and a blue vapor barrier edge in a crawlspace inspected', width: 560, height: 420 },
      { file: '/img/gallery/g26947.jpg', alt: 'Old debris and rodent droppings along a crawlspace edge before insulation work', width: 560, height: 420 },
      { file: '/img/gallery/g26944.jpg', alt: 'Torn insulation hanging beside wiring in a crawlspace', width: 560, height: 747 },
      { file: '/img/gallery/g26927.jpg', alt: 'A crawlspace with subfloor insulation and ductwork above a vapor barrier', width: 560, height: 420 },
      { file: '/img/gallery/g26926.jpg', alt: 'Subfloor insulation installed in a crawlspace', width: 560, height: 420 },
      { file: '/img/gallery/g26925.jpg', alt: 'Subfloor insulation in a crawlspace inspected', width: 560, height: 420 },
    ],
  },
  {
    key: 'crawlspaces',
    title: 'Crawlspaces',
    images: [
      { file: '/img/gallery/g27170.jpg', alt: 'A wooden crawlspace access door on a home\'s foundation inspected', width: 560, height: 560 },
      { file: '/img/gallery/g27090.jpg', alt: 'A damaged crawlspace door and dark access opening at a home', width: 560, height: 560 },
      { file: '/img/gallery/g27099.jpg', alt: 'A technician wearing a respirator and headlamp for crawlspace work', width: 560, height: 746 },
      { file: '/img/gallery/g26923.jpg', alt: 'Technicians in protective suits at a crawlspace job site', width: 560, height: 746 },
      { file: '/img/gallery/g26811.jpg', alt: 'A technician working by headlamp in a dark crawlspace', width: 560, height: 746 },
      { file: '/img/gallery/g26708.jpg', alt: 'A technician wearing a respirator and headlamp for crawlspace work', width: 560, height: 746 },
      { file: '/img/gallery/g27160.jpg', alt: 'White fungal growth on wood in a crawlspace, a sign of moisture found during a inspection', width: 560, height: 747 },
      { file: '/img/gallery/g27159.jpg', alt: 'A pipe and concrete rubble in a crawlspace inspected', width: 560, height: 747 },
      { file: '/img/gallery/g27152.jpg', alt: 'Concrete rubble and framing in a crawlspace corner, documented during a inspection', width: 560, height: 747 },
      { file: '/img/gallery/g27151.jpg', alt: 'A crawlspace vent opening with gravel and debris in the wood framing', width: 560, height: 747 },
      { file: '/img/gallery/g27110.jpg', alt: 'A shop vacuum and tools staged for crawlspace work', width: 560, height: 747 },
      { file: '/img/gallery/g27109.jpg', alt: 'A black insulated crawlspace access cover on a metal-lined access well, part of exclusion work', width: 560, height: 420 },
      { file: '/img/gallery/g27088.jpg', alt: 'Vent openings and a gap in a crawlspace foundation providing rodent access', width: 560, height: 420 },
      { file: '/img/gallery/g27078.jpg', alt: 'A metal-lined crawlspace access well with a lid at a home\'s foundation', width: 560, height: 747 },
      { file: '/img/gallery/g27075.jpg', alt: 'A dark vapor barrier laid in a crawlspace, part of \'s crawlspace work', width: 560, height: 747 },
      { file: '/img/gallery/g27062.jpg', alt: 'Standing water pooled on a crawlspace vapor barrier, a moisture issue documented', width: 560, height: 420 },
    ],
  },
  {
    key: 'exclusion',
    title: 'Exclusion and metalwork',
    images: [
      { file: '/img/gallery/g27172.jpg', alt: 'The roofline and gutter of a home', width: 560, height: 560 },
      { file: '/img/gallery/g27171.jpg', alt: 'A dark gap between boards of a home\'s lap siding, a potential pest entry point identified during a inspection', width: 560, height: 560 },
      { file: '/img/gallery/g27712.jpg', alt: 'Exclusion mesh installed over a gap in a stucco wall to block pest entry', width: 560, height: 747 },
      { file: '/img/gallery/g27717.jpg', alt: 'Concrete ledge on a commercial building targeted for bird exclusion', width: 560, height: 747 },
      { file: '/img/gallery/g27715.jpg', alt: 'JCB scissor lift positioned for bird exclusion work at a commercial building', width: 560, height: 747 },
      { file: '/img/gallery/g27714.jpg', alt: 'JCB scissor lift set up for pest exclusion at a commercial building entrance', width: 560, height: 747 },
      { file: '/img/gallery/g27713.jpg', alt: 'Bird exclusion netting installed over an opening in a commercial concrete wall', width: 560, height: 747 },
      { file: '/img/gallery/g27108.jpg', alt: 'A gap where a deck board meets a home\'s siding, a potential pest entry point identified during a inspection', width: 560, height: 747 },
      { file: '/img/gallery/g27087.jpg', alt: 'A plastic louvered dryer vent on a home\'s siding, a spot inspected for pest entry', width: 560, height: 420 },
      { file: '/img/gallery/g27086.jpg', alt: 'An angled view of a plastic dryer vent on a home\'s siding, checked as a possible pest entry point', width: 560, height: 420 },
      { file: '/img/gallery/g27085.jpg', alt: 'A cracked parged foundation wall with wire mesh, documented during a inspection', width: 560, height: 420 },
      { file: '/img/gallery/g27083.jpg', alt: 'Loose rubble and a gap at a home\'s foundation, a potential rodent entry point found', width: 560, height: 747 },
      { file: '/img/gallery/g27080.jpg', alt: 'A gap where a home\'s siding meets the foundation slab, a potential pest entry point identified during a inspection', width: 560, height: 420 },
      { file: '/img/gallery/g27077.jpg', alt: 'A downspout draining beside a home\'s foundation and siding', width: 560, height: 420 },
      { file: '/img/gallery/g27073.jpg', alt: 'A gap where a door threshold meets a concrete slab, a potential pest entry point identified during a inspection', width: 560, height: 420 },
      { file: '/img/gallery/g27061.jpg', alt: 'A gap in a cinder-block foundation sealed with spray foam, addressed', width: 560, height: 420 },
    ],
  },
  {
    key: 'commercial',
    title: 'Commercial work',
    images: [
      { file: '/img/gallery/g27716.jpg', alt: 'Technician on a JCB scissor lift performing commercial pest control work', width: 560, height: 747 },
      { file: '/img/gallery/g27203.jpg', alt: 'The interior of a steel-frame commercial warehouse', width: 560, height: 995 },
      { file: '/img/gallery/g25779.jpg', alt: 'Technician Kris Elling pre-treating a commercial construction site WA', width: 560, height: 315 },
      { file: '/img/gallery/g27731.jpg', alt: 'Technician on a scissor lift performing commercial exclusion work', width: 560, height: 420 },
      { file: '/img/gallery/g27730.jpg', alt: 'Installing bird exclusion netting with tension cables at a commercial building', width: 560, height: 420 },
      { file: '/img/gallery/g27729.jpg', alt: 'Crew performing bird exclusion from a scissor lift inside a retail store', width: 560, height: 420 },
      { file: '/img/gallery/g27728.jpg', alt: 'Bird exclusion netting installed along a commercial building\'s arched ceiling', width: 560, height: 420 },
      { file: '/img/gallery/g27727.jpg', alt: 'Technicians with a scissor lift installing bird exclusion at a retail store entrance', width: 560, height: 747 },
      { file: '/img/gallery/g27726.jpg', alt: 'Bird exclusion netting installed across the arched ceiling of a commercial building', width: 560, height: 747 },
      { file: '/img/gallery/g27724.jpg', alt: 'Technician on a scissor lift installing bird exclusion on a high wall', width: 560, height: 420 },
      { file: '/img/gallery/g27723.jpg', alt: 'Technician on a lift installing bird netting along a windowed commercial wall', width: 560, height: 747 },
      { file: '/img/gallery/g27722.jpg', alt: 'Bird exclusion netting installed on a commercial building\'s ceiling beams', width: 560, height: 747 },
      { file: '/img/gallery/g27721.jpg', alt: 'Bird exclusion netting being installed along a commercial corridor', width: 560, height: 420 },
      { file: '/img/gallery/g27719.jpg', alt: 'Technicians on a lift performing commercial bird exclusion work', width: 560, height: 420 },
      { file: '/img/gallery/g27464.jpg', alt: 'Shrink-wrapped pallet of pest control bait and supplies in a warehouse', width: 560, height: 1212 },
      { file: '/img/gallery/g26726.jpg', alt: 'A wrapped truck parked at a storefront with a statue nearby', width: 560, height: 193 },
    ],
  },
  {
    key: 'crew',
    title: 'The crew and the trucks',
    images: [
      { file: '/img/gallery/g27169.jpg', alt: 'A wrapped SUV parked in a driveway lined with trees', width: 560, height: 560 },
      { file: '/img/gallery/g27540.jpg', alt: 'Technician wearing a respirator while treating a home exterior', width: 560, height: 746 },
      { file: '/img/gallery/g27539.jpg', alt: 'Technician in a respirator holding treatment spray at a home exterior', width: 560, height: 746 },
      { file: '/img/gallery/g27538.jpg', alt: 'Technician in a respirator preparing a treatment at a home', width: 560, height: 746 },
      { file: '/img/gallery/g26871.jpg', alt: 'A technician standing with treatment equipment at a home', width: 560, height: 746 },
      { file: '/img/gallery/g27236.jpg', alt: 'A wrapped SUV parked beside an outbuilding at a wooded Whatcom County property', width: 560, height: 420 },
      { file: '/img/gallery/g27143.jpg', alt: 'A rainbow arching over an autumn forest, photographed by a technician in the field', width: 560, height: 747 },
      { file: '/img/gallery/g27142.jpg', alt: 'A rainbow over evergreen trees, photographed by a technician while on the job', width: 560, height: 747 },
      { file: '/img/gallery/g27141.jpg', alt: 'Wrapped trucks parked along a residential street during service calls', width: 560, height: 420 },
      { file: '/img/gallery/g27112.jpg', alt: 'A green wrapped service van serving Bellingham and Whatcom County', width: 560, height: 420 },
      { file: '/img/gallery/g27091.jpg', alt: 'A vivid red-and-orange sunrise over silhouetted trees, photographed by a technician in the field', width: 560, height: 420 },
      { file: '/img/gallery/g27089.jpg', alt: 'A wrapped truck parked in a driveway beside garages during a service visit', width: 560, height: 420 },
      { file: '/img/gallery/g27064.jpg', alt: 'A technician wearing orange sunglasses, seated in a service vehicle', width: 560, height: 747 },
      { file: '/img/gallery/g27044.jpg', alt: 'A wrapped van parked at a home', width: 560, height: 420 },
      { file: '/img/gallery/g27043.jpg', alt: 'A green wrapped van serving Bellingham and Whatcom County', width: 560, height: 420 },
      { file: '/img/gallery/g27042.jpg', alt: 'A wrapped van parked in a driveway', width: 560, height: 420 },
    ],
  },
  {
    key: 'country',
    title: 'The country we work in',
    images: [
      { file: '/img/gallery/g26617.jpg', alt: 'A home beneath power lines at sunset', width: 560, height: 420 },
      { file: '/img/gallery/g27166.jpg', alt: 'A waterfront view of a bay framed by trees under a cloudy sky in the Pacific Northwest', width: 560, height: 560 },
      { file: '/img/gallery/g27165.jpg', alt: 'A cloudy view over a calm bay from a shoreline in the Pacific Northwest', width: 560, height: 560 },
      { file: '/img/gallery/g27107.jpg', alt: 'A deer standing in tall grass at a rural property', width: 560, height: 747 },
      { file: '/img/gallery/g27106.jpg', alt: 'A deer browsing on bushes at a residential property', width: 560, height: 747 },
      { file: '/img/gallery/g27105.jpg', alt: 'A deer standing near a driveway at a residential property', width: 560, height: 747 },
      { file: '/img/gallery/g27104.jpg', alt: 'A deer browsing on bushes at a residential property', width: 560, height: 747 },
      { file: '/img/gallery/g27103.jpg', alt: 'A deer browsing on bushes at a residential property', width: 560, height: 747 },
      { file: '/img/gallery/g27102.jpg', alt: 'A deer standing among landscaping near a home', width: 560, height: 747 },
      { file: '/img/gallery/g27081.jpg', alt: 'A deer standing in a residential yard', width: 560, height: 747 },
      { file: '/img/gallery/g27079.jpg', alt: 'Two deer resting in a residential yard', width: 560, height: 420 },
      { file: '/img/gallery/g26996.jpg', alt: 'A deer standing among trees and yard features on a property, captured', width: 560, height: 747 },
      { file: '/img/gallery/g26991.jpg', alt: 'A deer standing beside a structure at a rural property', width: 560, height: 420 },
      { file: '/img/gallery/g26989.jpg', alt: 'A colorful sunset sky over a home and power lines', width: 560, height: 420 },
      { file: '/img/gallery/g26983.jpg', alt: 'A landscaped driveway viewed from a vehicle', width: 560, height: 747 },
      { file: '/img/gallery/g26981.jpg', alt: 'A frog on gravel beside a bait station, wildlife encountered during work', width: 560, height: 420 },
    ],
  },
];

export const galleryCount = gallery.reduce((n, s) => n + s.images.length, 0);

/**
 * SECTIONS ATTACHED TO THE SERVICE PAGES THEY BELONG TO.
 *
 * The owner asked for the gallery broken into smaller galleries, categorized
 * by service, each carrying enough writing to clear a word floor. The obvious
 * reading is nine new pages at /gallery/<section>/, and it is the wrong one:
 * each would need 1,200 words written to justify existing, and the page that
 * already owns that subject — with three thousand words on it — would still
 * have no photographs.
 *
 * So the sections attach to the service spokes instead. A reader on the
 * crawlspace page sees sixteen crawlspaces without leaving it, the words are
 * already there and already earned, and no thin page is created to hold an
 * image grid. /gallery/ stays as the one place to see all of it at once.
 *
 * FOUR OF THE NINE HAVE NO SERVICE PAGE TO ATTACH TO. The insect section
 * spreads across a dozen spokes rather than belonging to one; the crew and
 * the county belong to the company rather than to a service. Those stay on
 * the gallery alone rather than being forced onto a page they do not fit.
 */
export const SERVICE_GALLERY: Record<string, string> = {
  'crawlspace-restoration': 'crawlspaces',
  'exclusion-and-repairs': 'exclusion',
  'attic-insulation': 'insulation',
  'rodent-control': 'rodents',
  'wasp-control': 'stinging',
  'commercial-pest-control': 'commercial',
};

export const galleryFor = (serviceSlug: string) => {
  const key = SERVICE_GALLERY[serviceSlug];
  return key ? gallery.find((s) => s.key === key) : undefined;
};
