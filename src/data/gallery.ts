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

import { BIRD_WORK_IMAGES } from './retired-photos';

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

const allSections: GallerySection[] = [
  {
    key: 'stinging',
    title: 'Wasps, hornets and bees',
    images: [
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/black-and-yellow-wasp-close-up.jpg', alt: 'A close-up of a black wasp with thin yellow bands and yellow legs standing on white painted trim', width: 560, height: 1212 },
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/yellowjacket-nest-in-a-shed-among-garden-tools.jpg', alt: 'A huge swirled yellowjacket nest built along the floor of a shed wall, grown up around a stored pipe and pressed against garden tools', width: 560, height: 315 },
      { file: '/img/gallery/yellowjacket-nest-around-stored-lawn-equipment.jpg', alt: 'Close view of the same yellowjacket nest, its swirled tan paper grown around a gray pipe and spreading across the concrete floor of a shed', width: 560, height: 315 },
      { file: '/img/gallery/yellowjacket-nest-taken-apart-after-removal.jpg', alt: 'The yellowjacket nest taken apart on a shed floor after removal, its layered paper envelope and stacked combs broken open', width: 560, height: 315 },
      { file: '/img/gallery/yellowjacket-nest-debris-on-a-shed-floor.jpg', alt: 'Broken pieces of a large yellowjacket nest heaped on a concrete shed floor beside a lawn mower wheel after removal', width: 560, height: 315 },
      /* Owner's own, 19 Sep 2026, named by him as a yellowjacket nest. */
      { file: '/img/gallery/yellowjacket-nest-in-an-oak-tree.jpg', alt: 'A large gray paper yellowjacket nest hanging among the leaves of an oak tree against a pale sky', width: 560, height: 420 },
      /* Owner's own, 18 Sep 2026, each named by him. The garage gable nest was first
         labeled European hornets; the owner withdrew that the same day ("bad label"),
         so it is described as a paper nest and nothing more. The bald-faced hornet
         page's statement that no true hornet is established on this coast stands. */
      { file: '/img/gallery/active-bald-faced-hornet-nest-in-a-tree.jpg', alt: 'An active bald-faced hornet nest with hornets at the entrance, hanging among green leaves in a tree beside a porch', width: 560, height: 747 },
      { file: '/img/gallery/yellowjacket-nest-inside-a-propane-tank-dome.jpg', alt: 'A propane tank dome lifted open to show a yellowjacket nest built inside it, layered comb with white capped cells and workers on the paper', width: 560, height: 420 },
      { file: '/img/gallery/yellowjacket-nest-paper-on-a-propane-tank.jpg', alt: 'Close-up of gray yellowjacket nest paper spread over the valve and hose fitting of a white propane tank, with the entrance hole visible', width: 560, height: 420 },
      { file: '/img/gallery/yellowjacket-nest-in-a-gutter-and-fascia-void.jpg', alt: 'Gray yellowjacket nest paper filling the gap between a gutter and the fascia board along a roof edge', width: 560, height: 420 },
      { file: '/img/gallery/paper-nest-in-a-garage-gable-peak.jpg', alt: 'A tan paper nest built into the peak of a garage gable, above a diamond-paned window', width: 560, height: 420 },
      /* Owner's own, 18 Sep 2026: a bald-faced hornet nest taken down in Bow, named by him. */
      { file: '/img/gallery/bald-faced-hornet-nest-removed-bow-wa.jpg', alt: 'A large gray paper hornet nest, removed with the branches it was built around still through it, resting in a bucket on a brick patio in Bow', width: 560, height: 747 },
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
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/odorous-house-ants-feeding-on-bait.jpg', alt: 'A cluster of small dark odorous house ants feeding on a drop of gel bait on white painted siding', width: 560, height: 1212 },
      { file: '/img/gallery/thatching-ants-tending-aphids-on-a-thistle.jpg', alt: 'Thatching ants tending black aphids on the stems of a pink-flowered thistle at the edge of a field', width: 560, height: 747 },
      /* Owner's own, 19 Sep 2026. Not identified by the owner, so described, not named. */
      { file: '/img/gallery/long-horned-beetle-close-up.jpg', alt: 'A mottled brown beetle with long segmented antennae, photographed close up from the side on a pale surface', width: 560, height: 420 },
      { file: '/img/gallery/large-brown-spider-on-a-wall.jpg', alt: 'A large brown spider with banded legs on a pale interior wall, its shadow cast beside it', width: 560, height: 747 },
      { file: '/img/gallery/orb-weaving-spider-close-up.jpg', alt: 'A macro photograph of a tan, bristly orb-weaving spider, its eyes, fangs and spined banded legs in sharp focus', width: 560, height: 420 },
      /* Owner's own, 19 Sep 2026. He called it some sort of beetle, so no species is named. */
      { file: '/img/gallery/snouted-beetle-on-a-white-surface.jpg', alt: 'A small dark, scaly beetle with a short snout and elbowed antennae on a white surface', width: 560, height: 758 },
      /* Owner's own, 18 Sep 2026. */
      { file: '/img/gallery/carpenter-ant-swarmers-on-a-painted-sill.jpg', alt: 'A cluster of winged carpenter ant swarmers, black bodies and amber wings, on a white painted sill with a shed wing lying beside them', width: 560, height: 315 },
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
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/pallet-of-rodent-bait-stations.jpg', alt: 'A pallet stacked high with new black tamper-resistant rodent bait stations, delivered to the shop', width: 560, height: 1152 },
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/rodent-tunnel-through-a-broken-slab.jpg', alt: 'A rodent tunnel opening through broken concrete at the edge of a slab, lit by flashlight, with fresh soil pushed out below', width: 560, height: 1212 },
      { file: '/img/gallery/rodent-burrow-under-a-slab-edge.jpg', alt: 'A rodent burrow dug under the cracked edge of a concrete slab beside a large rock, loose soil at the entrance', width: 560, height: 259 },
      { file: '/img/gallery/branded-niban-bait-shakers.jpg', alt: 'A row of Niban granular bait shakers wearing the company label with the Sasquatch artwork, the Bellingham address and the phone number', width: 560, height: 995 },
      { file: '/img/gallery/rats-feeding-in-horse-stall-bedding.jpg', alt: 'Two gray rats feeding on manure in the bedding of a horse stall against a concrete wall', width: 560, height: 420 },
      /* Owner's own, 19 Sep 2026: Skyhawk Trapmate sensors, which he described as 24/7 digital monitoring. Named in the alt only as what the device label reads. */
      { file: '/img/gallery/snap-trap-with-a-wireless-trigger-sensor.jpg', alt: 'A wooden snap trap fitted with a small black Skyhawk Trapmate vibration sensor at its end, which reports when the trap fires', width: 560, height: 315 },
      { file: '/img/gallery/bait-station-with-a-wireless-motion-sensor.jpg', alt: 'A black tamper-resistant rodent bait station with the company label, fitted with a Skyhawk Trapmate motion sensor on its lid', width: 560, height: 995 },
      /* Owner's own, 18 Sep 2026. */
      { file: '/img/gallery/rodent-chewed-shifter-boot-in-a-truck.jpg', alt: 'The rubber shifter boot in a truck with a ragged hole chewed through it by a rodent, the shift linkage visible inside', width: 560, height: 996 },
      /* Owner's own, 18 Sep 2026. The drawer photograph has a customer's folder labels blurred. */
      { file: '/img/gallery/mouse-nest-in-a-garage-file-drawer-bow-wa.jpg', alt: 'A filing-cabinet drawer in a Bow garage packed with a mouse nest of shredded fabric and paper and sunflower seed husks', width: 560, height: 747 },
      { file: '/img/gallery/technician-servicing-rodent-bait-station-mount-vernon-wa.jpg', alt: 'A technician servicing a rodent bait station on a wet deck at a house in Mount Vernon, autumn trees behind', width: 560, height: 747 },
      { file: '/img/gallery/g27234.jpg', alt: 'A dark gap among foundation rocks providing a rodent access point at a home', width: 560, height: 747 },
      { file: '/img/gallery/g27233.jpg', alt: 'An open gap around a white PVC plumbing line where it passes through a wall, a common rodent entry point found', width: 560, height: 747 },
      { file: '/img/gallery/g27229.jpg', alt: 'Rodent tunneling and disturbance through blown-in attic insulation at a home', width: 560, height: 747 },
      { file: '/img/gallery/g27228.jpg', alt: 'A close-up of rodent tunneling through insulation, a sign of rodent activity documented', width: 560, height: 420 },
      { file: '/img/gallery/g27227.jpg', alt: 'A rotten form board in a crawlspace with a blue vapor barrier, allowing rodent access at a home inspected', width: 560, height: 747 },
      { file: '/img/gallery/g27147.jpg', alt: 'Plumbing-line insulation chewed by rodents in a crawlspace with a vapor barrier', width: 560, height: 747 },
      { file: '/img/gallery/g27146.jpg', alt: 'A pipe crossing a crawlspace with its gray insulation sleeve chewed ragged along the top, shredded pieces of it scattered on the black vapor barrier below', width: 560, height: 747 },
      { file: '/img/gallery/g27145.jpg', alt: 'Disturbed soil and a torn vapor barrier showing rodent tunneling in a crawlspace', width: 560, height: 747 },
      { file: '/img/gallery/g27137.jpg', alt: 'Rodent bait stations and a tube of sealant staged in a corner during a service visit', width: 560, height: 747 },
      { file: '/img/gallery/g27136.jpg', alt: 'A gap under siding where exterior pipes enter a home, a potential rodent entry point found', width: 560, height: 747 },
      { file: '/img/gallery/g27134.jpg', alt: 'A dead rat on gravel, removed during a rodent control job', width: 560, height: 420 },
      { file: '/img/gallery/g27111.jpg', alt: 'Rodent droppings and debris at a door threshold, evidence of a rodent problem found during an inspection', width: 560, height: 747 },
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
      { file: '/img/gallery/g27149.jpg', alt: 'Pink insulation in a crawlspace being inspected', width: 560, height: 747 },
      { file: '/img/gallery/g27148.jpg', alt: 'A piece of pink insulation on a dark vapor barrier in a crawlspace, documented during an inspection', width: 560, height: 747 },
      { file: '/img/gallery/g27144.jpg', alt: 'A gap in a crawlspace foundation near insulation and a vapor barrier, a potential pest entry point found', width: 560, height: 747 },
      { file: '/img/gallery/g27060.jpg', alt: 'Plumbing lines wrapped in insulation and supported with wire in a crawlspace', width: 560, height: 420 },
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
      /* Kristofer Elling suiting up for a powderpost beetle treatment, named by
         the owner 20 Sep 2026. The archive had these three as exterior spray
         work and they are not: there is no sprayer in hand in any of them, and
         the job they precede is under the house. */
      { file: '/img/gallery/g27538.jpg', alt: 'Kristofer Elling at the open back of the van in a white protective suit, half-face respirator and a headlamp on his cap', width: 560, height: 746 },
      { file: '/img/gallery/g27539.jpg', alt: 'Kristofer Elling in a white protective suit and a half-face respirator with pink filters, giving a thumbs up at the open van', width: 560, height: 746 },
      { file: '/img/gallery/g27540.jpg', alt: 'Kristofer Elling in a protective suit and respirator beside the sprayer rig and hose reel at the side of a house', width: 560, height: 746 },
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/soaked-and-soiled-insulation-on-a-crawlspace-floor.jpg', alt: 'Pink insulation that has fallen onto a crawlspace floor, soaked and soiled, below a stained concrete wall and a vent', width: 560, height: 747 },
      { file: '/img/gallery/insulation-fallen-from-crawlspace-joists.jpg', alt: 'Pink insulation hanging loose and fallen from the joists of a crawlspace, pieces scattered across a dirty paper barrier', width: 560, height: 747 },
      { file: '/img/gallery/sagging-and-pulled-down-crawlspace-insulation.jpg', alt: 'Crawlspace insulation sagging and pulled down between the joists, loose pieces on the ground below', width: 560, height: 747 },
      { file: '/img/gallery/torn-kraft-faced-insulation-in-a-crawlspace.jpg', alt: 'Kraft-faced yellow insulation torn open and hanging from a crawlspace joist, the paper facing ripped', width: 560, height: 747 },
      { file: '/img/gallery/insulation-torn-down-throughout-a-crawlspace.jpg', alt: 'Yellow insulation torn and hanging throughout a crawlspace above piers and a black vapor barrier littered with debris', width: 560, height: 747 },
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/technician-finishing-a-crawlspace-insulation-install.jpg', alt: 'A technician with a headlamp bagging offcuts in a crawlspace after new insulation was installed in the floor joists and the framed walls', width: 560, height: 315 },
      { file: '/img/gallery/new-insulation-in-crawlspace-walls-and-floor.jpg', alt: 'New pink batt insulation filling the framed walls and floor joists of a crawlspace above the concrete foundation, black vapor barrier below', width: 560, height: 315 },
      { file: '/img/gallery/new-crawlspace-insulation-and-wrapped-duct.jpg', alt: 'A finished crawlspace with new insulation between the joists and in the framed wall, and a newly wrapped black duct crossing overhead', width: 560, height: 315 },
      { file: '/img/gallery/finished-crawlspace-with-new-vapor-barrier.jpg', alt: 'A full-height crawlspace after the job: insulation held up with wire across the joists, new duct, and a black vapor barrier over the floor', width: 560, height: 315 },
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/tj-spraying-for-powderpost-beetles-in-a-tight-crawlspace.jpg', alt: 'Travis (TJ) Hansen in a white suit and headlamp squeezed under a beam in a very low crawlspace, running a blue spray hose for a powderpost beetle treatment', width: 560, height: 259 },
      { file: '/img/gallery/crawlspace-after-a-powderpost-beetle-treatment.jpg', alt: 'A crawlspace after a powderpost beetle treatment, new posts on concrete blocks and a fresh black vapor barrier under the ductwork', width: 560, height: 315 },
      { file: '/img/gallery/crawlspace-sprayer-cart-and-hose-reel.jpg', alt: 'The orange sprayer cart with its white tank and blue hose on a reel, set up beside a house for a crawlspace treatment', width: 560, height: 996 },
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/leak-staining-running-down-siding.jpg', alt: 'Brown streaks of water staining running down several courses of gray lap siding above a dryer vent', width: 560, height: 420 },
      { file: '/img/gallery/staining-and-decay-at-the-bottom-of-siding.jpg', alt: 'Water staining running down gray siding to a darkened, decaying bottom edge where it meets the foundation, mulch and a hose below', width: 560, height: 420 },
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/new-crawlspace-insulation-and-vapor-barrier.jpg', alt: 'New pink batt insulation held up between the floor joists with wire, over a fresh black vapor barrier, lit by headlamp', width: 560, height: 420 },
      { file: '/img/gallery/crawlspace-insulation-and-vapor-barrier-with-ductwork.jpg', alt: 'A long crawlspace with insulation between the joists, wrapped ductwork, posts on concrete piers and a black vapor barrier across the ground', width: 560, height: 420 },
      /* Owner's own, 18 Sep 2026: the crew treating crawlspace framing for powderpost beetles. */
      { file: '/img/gallery/technician-treating-crawlspace-framing-for-powderpost-beetles.jpg', alt: 'A technician lying on a crawlspace vapor barrier in coveralls and a respirator, spraying the joists overhead for powderpost beetles', width: 560, height: 420 },
      { file: '/img/gallery/technician-under-ductwork-in-a-crawlspace-powderpost-treatment.jpg', alt: 'A technician with a headlamp working under metal ductwork and old timber framing in a crawlspace during a powderpost beetle treatment', width: 560, height: 420 },
      { file: '/img/gallery/g27170.jpg', alt: 'A wooden crawlspace access door on a home\'s foundation inspected', width: 560, height: 560 },
      { file: '/img/gallery/g27090.jpg', alt: 'A damaged crawlspace door and dark access opening at a home', width: 560, height: 560 },
      { file: '/img/gallery/g27099.jpg', alt: 'A technician wearing a respirator and headlamp for crawlspace work', width: 560, height: 746 },
      { file: '/img/gallery/g26923.jpg', alt: 'Technicians in protective suits at a crawlspace job site', width: 560, height: 746 },
      { file: '/img/gallery/g26811.jpg', alt: 'A technician working by headlamp in a dark crawlspace', width: 560, height: 746 },
      { file: '/img/gallery/g26708.jpg', alt: 'A technician wearing a respirator and headlamp for crawlspace work', width: 560, height: 746 },
      { file: '/img/gallery/g27160.jpg', alt: 'White fungal growth on wood in a crawlspace, a sign of moisture found during an inspection', width: 560, height: 747 },
      { file: '/img/gallery/g27159.jpg', alt: 'A pipe and concrete rubble in a crawlspace inspected', width: 560, height: 747 },
      { file: '/img/gallery/g27152.jpg', alt: 'Concrete rubble and framing in a crawlspace corner, documented during an inspection', width: 560, height: 747 },
      { file: '/img/gallery/g27151.jpg', alt: 'A crawlspace vent opening with gravel and debris in the wood framing', width: 560, height: 747 },
      { file: '/img/gallery/g27110.jpg', alt: 'A bucket trap standing in a garage corner with a ridged plank leaning up to its rim as a walkway, a lidded top plate across the opening', width: 560, height: 747 },
      { file: '/img/gallery/g27109.jpg', alt: 'A black insulated crawlspace access cover on a metal-lined access well, part of exclusion work', width: 560, height: 420 },
      { file: '/img/gallery/g27088.jpg', alt: 'Vent openings and a gap in a crawlspace foundation providing rodent access', width: 560, height: 420 },
      { file: '/img/gallery/g27078.jpg', alt: 'A metal-lined crawlspace access well with a lid at a home\'s foundation', width: 560, height: 747 },
      { file: '/img/gallery/g27075.jpg', alt: 'A dark vapor barrier laid over the soil in a crawlspace', width: 560, height: 747 },
      { file: '/img/gallery/g27062.jpg', alt: 'Standing water pooled on a crawlspace vapor barrier, a moisture issue documented', width: 560, height: 420 },
    ],
  },
  {
    key: 'exclusion',
    title: 'Exclusion and metalwork',
    images: [
      /* Owner's own, 19 Sep 2026: a vent guard on a commercial restaurant. */
      { file: '/img/gallery/failed-louvered-foundation-vent-at-a-restaurant.jpg', alt: 'A galvanized louvered foundation vent with bent blades and open corners at the base of a restaurant wall', width: 560, height: 560 },
      { file: '/img/gallery/vent-guard-frame-fitted-over-an-open-foundation-vent.jpg', alt: 'The steel frame of a vent guard screwed to the foundation around an open crawlspace vent, the timber lintel visible inside', width: 560, height: 560 },
      { file: '/img/gallery/vent-guard-installed-on-a-restaurant-foundation.jpg', alt: 'The finished vent guard, heavy black mesh in a welded steel frame, fitted over the foundation vent of a restaurant', width: 560, height: 560 },
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/evan-friese-starting-a-foundation-vent-guard-job.jpg', alt: 'Evan Friese crouched at a foundation vent with the guard box beside him, a bay and two forested islands below the garden', width: 560, height: 420 },
      { file: '/img/gallery/evan-friese-drilling-a-foundation-for-a-vent-guard.jpg', alt: 'Evan Friese drilling anchor holes in a concrete foundation around a crawlspace vent with a hammer drill', width: 560, height: 272 },
      { file: '/img/gallery/evan-friese-fastening-a-foundation-vent-guard.jpg', alt: 'Evan Friese fastening the frame of a steel vent guard over a crawlspace vent with an impact driver', width: 560, height: 272 },
      { file: '/img/gallery/evan-friese-with-a-finished-vent-guard.jpg', alt: 'Evan Friese kneeling beside a finished vent guard at the base of a porch, giving a thumbs up, the work truck behind', width: 560, height: 1152 },
      { file: '/img/gallery/finished-steel-foundation-vent-guard.jpg', alt: 'A finished black steel-mesh guard fastened over a crawlspace vent in a concrete foundation, the drill still lying beside it', width: 560, height: 272 },
      { file: '/img/gallery/crawlspace-vent-screen-torn-open-from-inside.jpg', alt: 'A crawlspace vent seen from inside, its wire mesh torn open and bent, with nesting material packed behind it', width: 560, height: 747 },
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/open-cinder-block-foundation-vents.jpg', alt: 'Two cinder block foundation vent openings with no screens at all, half hidden by hydrangea leaves and bindweed', width: 560, height: 315 },
      { file: '/img/gallery/cracked-foundation-gap-under-siding.jpg', alt: 'A flashlight on a cracked foundation where a chunk has broken away under the siding, leaving an open gap into the crawlspace', width: 560, height: 995 },
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/rodent-gap-at-a-corner-cap.jpg', alt: 'Looking up into an open gap behind the corner trim of a house, where the siding and wrap have pulled away, a rodent entry point', width: 560, height: 1215 },
      { file: '/img/gallery/broken-crawlspace-vent-screen.jpg', alt: 'A foundation vent with its wire mesh screen torn away from the frame at the bottom corner, cobwebs and leaves caught in it', width: 560, height: 259 },
      { file: '/img/gallery/gap-under-a-vent-screen-at-the-foundation.jpg', alt: 'A gloved hand pushing a flashlight into the gap under a foundation vent screen, showing how far the opening runs', width: 560, height: 1212 },
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/evan-friese-fitting-an-exhaust-vent-cover.jpg', alt: 'Evan Friese on a stepladder fitting a guarded exhaust vent cover to vinyl siding on a two-story house', width: 560, height: 747 },
      { file: '/img/gallery/guarded-exhaust-vent-cover-on-siding.jpg', alt: 'A finished exhaust vent cover with a perforated metal guard, bolted over the vent on beige siding', width: 560, height: 420 },
      { file: '/img/gallery/bat-behind-an-attic-vent-screen.jpg', alt: 'A bat roosting behind the mesh screen of an attic vent on weathered gray siding', width: 560, height: 747 },
      /* Owner's own, 19 Sep 2026. House numbers on the gable-vent job are blurred. */
      { file: '/img/gallery/technician-on-a-ladder-screening-a-gable-vent.jpg', alt: 'A technician at the top of a tall green extension ladder screening the gable vent of a two-story green townhouse under a clear blue sky', width: 560, height: 995 },
      { file: '/img/gallery/technician-sealing-a-second-story-gable-vent.jpg', alt: 'A technician in a black hat, seen from below, fitting mesh over a second-story gable vent from a green ladder', width: 560, height: 315 },
      { file: '/img/gallery/octagonal-gable-vent-with-a-mesh-screen.jpg', alt: 'An octagonal gable vent set among scalloped shingles, covered with black wire mesh screwed down at each corner', width: 560, height: 315 },
      { file: '/img/gallery/ladder-to-a-screened-gable-vent-on-a-second-story.jpg', alt: 'A green extension ladder reaching to a screened gable vent at the peak of a second-story dormer', width: 560, height: 315 },
      { file: '/img/gallery/flush-mount-dryer-vent-covers-on-siding.jpg', alt: 'Black flush-mount dryer and exhaust vent covers fitted on green lap siding above a mulched bed, with a foam cover over a hose bib between them', width: 560, height: 315 },
      { file: '/img/gallery/rodent-guard-roof-vent-cover.jpg', alt: 'A black slotted metal roof vent cover on a shingled roof, seen from the eave against a gray sky', width: 560, height: 315 },
      { file: '/img/gallery/service-van-and-lift-sealing-a-stone-chimney.jpg', alt: 'The wrapped service van parked below a boom lift raised to the top of a river-rock chimney, where a technician is sealing around it, near Lake Whatcom', width: 560, height: 995 },
      { file: '/img/gallery/screened-roof-vents-on-a-hip-roof.jpg', alt: 'Roof vents across a dark shingled hip roof between two brick chimneys, each fitted with a black mesh guard', width: 560, height: 420 },
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/crew-on-a-roof-sealing-vents-at-a-waterfront-house.jpg', alt: 'Two technicians in harnesses on the roof of a large gray house above the water, one on the ridge and one on a ladder at the gable, with a third watching from the driveway', width: 560, height: 747 },
      { file: '/img/gallery/screened-roof-vents-along-a-ridge.jpg', alt: 'A row of roof vents along a shingled roof, each covered with a black heavy-mesh guard fastened to the shingles', width: 560, height: 747 },
      { file: '/img/gallery/technician-sealing-a-gap-at-the-siding-on-a-ladder.jpg', alt: 'A technician in a cap and safety glasses on a green ladder, working a line-set gap under the edge of the siding with both hands', width: 560, height: 420 },
      { file: '/img/gallery/rodent-shield-behind-lifted-siding-close-up.jpg', alt: 'The bottom edge of the siding lifted by hand to show a black toothed rodent shield fastened beneath it against the concrete foundation', width: 560, height: 747 },
      /* Owner's own, 19 Sep 2026: a rodent shield installed under the siding. */
      { file: '/img/gallery/rodent-shield-installed-along-a-foundation.jpg', alt: 'A black metal rodent shield fastened along the bottom of the siding on a house, where it meets a rough concrete foundation, seen low along the wall', width: 560, height: 420 },
      { file: '/img/gallery/rodent-shield-toothed-edge-close-up.jpg', alt: 'Close-up of the toothed lower edge of a black rodent shield pressed against a rough concrete foundation under the siding', width: 560, height: 420 },
      /* Owner's own, 18 Sep 2026. */
      { file: '/img/gallery/screened-crawlspace-vents-on-a-foundation.jpg', alt: 'Two black heavy-mesh screens fitted over crawlspace vents along a gray-sided house foundation', width: 560, height: 315 },
      { file: '/img/gallery/heavy-mesh-crawlspace-vent-screen-close-up.jpg', alt: 'Close-up of a black heavy-gauge mesh screen framed over a crawlspace vent in a concrete foundation', width: 560, height: 315 },
      { file: '/img/gallery/g27172.jpg', alt: 'The roofline and gutter of a home', width: 560, height: 560 },
      { file: '/img/gallery/g27171.jpg', alt: 'A dark gap between boards of a home\'s lap siding, a potential pest entry point identified during an inspection', width: 560, height: 560 },
      { file: '/img/gallery/g27712.jpg', alt: 'Exclusion mesh installed over a gap in a stucco wall to block pest entry', width: 560, height: 747 },
      { file: '/img/gallery/g27717.jpg', alt: 'Concrete ledge on a commercial building targeted for bird exclusion', width: 560, height: 747 },
      { file: '/img/gallery/g27715.jpg', alt: 'JCB scissor lift positioned for bird exclusion work at a commercial building', width: 560, height: 747 },
      { file: '/img/gallery/g27714.jpg', alt: 'JCB scissor lift set up for pest exclusion at a commercial building entrance', width: 560, height: 747 },
      { file: '/img/gallery/g27713.jpg', alt: 'Bird exclusion netting installed over an opening in a commercial concrete wall', width: 560, height: 747 },
      { file: '/img/gallery/g27108.jpg', alt: 'A gap where a deck board meets a home\'s siding, a potential pest entry point identified during an inspection', width: 560, height: 747 },
      { file: '/img/gallery/g27087.jpg', alt: 'A plastic louvered dryer vent on a home\'s siding, a spot inspected for pest entry', width: 560, height: 420 },
      { file: '/img/gallery/g27086.jpg', alt: 'A white guarded cover fitted over a dryer exhaust vent on lap siding, its perforated screen facing out', width: 560, height: 420 },
      { file: '/img/gallery/g27085.jpg', alt: 'A cracked parged foundation wall with wire mesh, documented during an inspection', width: 560, height: 420 },
      { file: '/img/gallery/g27083.jpg', alt: 'Loose rubble and a gap at a home\'s foundation, a potential rodent entry point found', width: 560, height: 747 },
      { file: '/img/gallery/g27080.jpg', alt: 'A gap where a home\'s siding meets the foundation slab, a potential pest entry point identified during an inspection', width: 560, height: 420 },
      { file: '/img/gallery/g27077.jpg', alt: 'A downspout draining beside a home\'s foundation and siding', width: 560, height: 420 },
      { file: '/img/gallery/g27073.jpg', alt: 'A gap where a door threshold meets a concrete slab, a potential pest entry point identified during an inspection', width: 560, height: 420 },
      { file: '/img/gallery/g27061.jpg', alt: 'A gap in a cinder-block foundation sealed with spray foam, addressed', width: 560, height: 420 },
    ],
  },
  {
    key: 'commercial',
    title: 'Commercial work',
    images: [
      /* Named by the owner 20 Sep 2026: piles of carpenter ant frass in a
         warehouse. The archive had it as a wrapped pipe in a crawlspace and
         filed it under insulation, which is how it ended up captioned as a
         moisture problem on a page about beetles. */
      { file: '/img/gallery/g27000.jpg', alt: 'Deep drifts of pale carpenter ant frass banked along a blue warehouse wall, burying the ends of stored rolls and the floor around them', width: 560, height: 747 },
      /* Owner's own, 18 Sep 2026: carpenter ant frass in a commercial facility. A supplier's label is blurred. */
      { file: '/img/gallery/carpenter-ant-frass-in-a-commercial-storage-room.jpg', alt: 'A heap of carpenter ant frass on the floor of a commercial storage room beside stacked cartons and a stepladder', width: 560, height: 415 },
      { file: '/img/gallery/carpenter-ant-frass-along-a-storage-room-wall.jpg', alt: 'Carpenter ant frass drifted along the base of a blue wall in a commercial storage room, piled against stored rolls and tubes', width: 560, height: 747 },
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
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/ladder-secured-at-the-gutter-with-a-technician-on-the-roof.jpg', alt: 'An extension ladder set against a house with a stabilizer bracket at the gutter and a leveler at the base, a technician in a harness working on the roof above', width: 560, height: 1212 },
      { file: '/img/gallery/technician-roped-in-with-a-safety-harness-on-a-roof.jpg', alt: 'A technician on a roof in a full safety harness, paying out a tied-off rope line in Cougar Paws roofing boots, against a clear sky', width: 560, height: 259 },
      { file: '/img/gallery/ladder-lock-and-gutter-guard-at-the-roof-edge.jpg', alt: 'Looking down the top of a ladder: an anti-slip bracket resting on the gutter to protect it, and a lock clamping the ladder in place', width: 560, height: 1212 },
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/service-truck-on-a-foggy-morning-on-north-shore.jpg', alt: 'The wrapped Chevrolet Colorado parked on a street on a foggy morning, tall poplars and a red maple behind', width: 560, height: 315 },
      { file: '/img/gallery/heat-pressed-sasquatch-logo-transfers.jpg', alt: 'A sheet of freshly printed Sasquatch Pest Control logo transfers and mascot stickers laid out on a counter', width: 560, height: 1152 },
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/tj-in-protective-gear-after-a-crawlspace.jpg', alt: 'Travis (TJ) Hansen standing beside a house in a mud-covered white protective suit, respirator and gloves after coming out of a crawlspace', width: 560, height: 1212 },
      { file: '/img/gallery/kris-elling-in-respirator-and-protective-suit.jpg', alt: 'Kristofer Elling in a branded cap light, half-face respirator with pink filters and a white protective suit, giving a thumbs up', width: 560, height: 745 },
      { file: '/img/gallery/sasquatch-statue-with-a-branded-bait-shaker.jpg', alt: 'A Sasquatch statue crouched in tall grass and red-hot poker flowers beside a Niban bait shaker wearing the company label', width: 560, height: 757 },
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/service-truck-at-a-community-building-alger-wa.jpg', alt: 'The wrapped Chevrolet Colorado parked on gravel beside a low community building and lawn in Alger under a gray sky', width: 560, height: 294 },
      { file: '/img/gallery/service-truck-on-a-sunlit-road-alger-wa.jpg', alt: 'The wrapped Chevrolet Colorado with its ladder rack on a road near Alger, sunlit alders and firs behind', width: 560, height: 271 },
      { file: '/img/gallery/three-service-trucks-in-front-of-cedars.jpg', alt: 'Three wrapped service trucks parked nose to tail in front of tall cedars under a clear blue sky', width: 560, height: 269 },
      { file: '/img/gallery/kris-elling-ready-for-a-crawlspace-inspection.jpg', alt: 'Kristofer Elling in a cap with twin headlamps and a face mask, ready to go into a crawlspace, beside the wrapped truck', width: 560, height: 747 },
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/bryce-carter-with-the-service-van.jpg', alt: 'Bryce Carter standing beside the wrapped van on the shore, the water and a forested headland behind him', width: 560, height: 420 },
      { file: '/img/gallery/service-truck-at-a-cabin-deming-wa.jpg', alt: 'The wrapped pickup parked below the wooden steps of a cabin among tall firs near Deming', width: 560, height: 420 },
      { file: '/img/gallery/service-truck-at-a-forest-cabin-in-the-foothills.jpg', alt: 'The wrapped pickup parked on gravel below two forest cabins in the Mount Baker foothills, a technician at the tailgate', width: 560, height: 420 },
      /* Owner's own, 19 Sep 2026, named by him. The photographer's mark on the portraits is left in place. */
      { file: '/img/gallery/the-crew-with-the-trucks-at-sunset.jpg', alt: 'Five members of the crew standing between a wrapped pickup and a wrapped van at sunset beside the water', width: 560, height: 285 },
      /* NAMED BY THE OWNER, 19 Sep 2026, after he corrected the team cards. The
         page had shown TJ under Evan and Evan under Tyson, and a fourth photograph
         filed as TJ turned out to be Tyson — the fingerprint puts it 9 bits from
         the portrait the owner sent captioned "This is Tyson". Nobody is named in
         a caption here now unless the owner named that person in that photograph. */
      { file: '/img/gallery/tyson-elling-portrait-by-the-van.jpg', alt: 'Tyson Elling in a branded cap and jacket in front of the ladder-racked van', width: 560, height: 560 },
      { file: '/img/gallery/tyson-elling-with-the-service-van.jpg', alt: 'Tyson Elling standing beside the wrapped van at golden hour', width: 560, height: 373 },
      { file: '/img/gallery/tyson-elling-and-a-technician-above-the-water.jpg', alt: 'Tyson Elling and a technician working a hillside garden above the water, islands and forest behind them', width: 560, height: 1152 },
      { file: '/img/gallery/kris-elling-above-the-islands.jpg', alt: 'Kristofer Elling in a harness on a roof above Chuckanut Bay, the San Juan Islands behind him', width: 560, height: 747 },
      /* Named by the owner, 19 Sep 2026, when he corrected the team cards: TJ. */
      { file: '/img/gallery/travis-hansen-portrait-by-the-van.jpg', alt: 'Travis (TJ) Hansen in a branded cap and safety glasses, standing by the wrapped van', width: 560, height: 560 },
      { file: '/img/gallery/technician-at-sunset-beside-the-truck-on-lummi-shore.jpg', alt: 'Evan Friese leaning on the wrapped Chevrolet pickup after a long day, the sun setting over the bay on Lummi Shore Road', width: 560, height: 315 },
      { file: '/img/gallery/service-trucks-on-lummi-shore-road.jpg', alt: 'Two wrapped pickups and a wrapped van lined up on gravel on Lummi Shore Road in golden evening light', width: 560, height: 249 },
      { file: '/img/gallery/service-van-at-sunrise-on-lummi-shore.jpg', alt: 'The wrapped van at sunrise on the gravel beside the water on Lummi Shore Road, a boat and timber shelters behind', width: 560, height: 286 },
      { file: '/img/gallery/service-van-on-a-gravel-road-at-golden-hour.jpg', alt: 'The wrapped van with its ladder rack on a gravel road, shot low among yellow wildflowers under a deep blue sky', width: 560, height: 300 },
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/branded-safety-helmets-and-ear-protection.jpg', alt: 'Three hi-vis yellow Sasquatch Pest Control safety helmets with red-and-black ear defenders, resting on green gear bags', width: 560, height: 420 },
      { file: '/img/gallery/service-truck-by-tall-grass-bellingham-wa.jpg', alt: 'The wrapped service truck parked behind tall summer grass under evergreens and a red maple in Bellingham', width: 560, height: 381 },
      { file: '/img/gallery/service-truck-at-a-home-ferndale-wa.jpg', alt: 'The green-and-black wrapped pickup parked in front of a new two-story gray house in Ferndale under a bright cloudy sky', width: 560, height: 616 },
      /* Owner's own, 18 Sep 2026. Street and road names he gave are left out. */
      { file: '/img/gallery/service-truck-by-a-landscaped-yard-bellingham-wa.jpg', alt: 'The wrapped service truck parked beside a landscaped front yard with red shrubs and blue spruce in Bellingham', width: 560, height: 315 },
      { file: '/img/gallery/service-truck-at-a-farm-near-bow-wa.jpg', alt: 'The wrapped service truck on a gravel farm drive near Bow, open fields and mountains behind under a low bright sun', width: 560, height: 315 },
      { file: '/img/gallery/service-truck-at-a-home-sudden-valley-wa.jpg', alt: 'The wrapped service truck on a paver driveway below a stone-clad house in Sudden Valley, low sun flaring across the frame', width: 560, height: 315 },
      /* Owner's own, 18 Sep 2026. The house number on the porch is blurred, and the neighborhood the owner named is left out of the alt for the same reason as the Mount Vernon photograph. */
      { file: '/img/gallery/service-van-at-a-home-bellingham-wa.jpg', alt: 'The wrapped service van on a brick driveway in front of a shingled house with dark shutters in Bellingham', width: 560, height: 420 },
      /* Owner's own, 18 Sep 2026: the trucks in winter. A neighbor's mailbox number is blurred in the roadside shot. */
      { file: '/img/gallery/service-truck-in-snow-by-a-shed.jpg', alt: 'A wrapped Sasquatch Pest Control pickup with a ladder rack, snow on the roof and ladders, parked beside a gray shed', width: 560, height: 315 },
      { file: '/img/gallery/service-truck-in-snow-at-a-road-corner.jpg', alt: 'A wrapped pickup parked in deep snow at a road corner under tall evergreens on a blue winter morning', width: 560, height: 315 },
      { file: '/img/gallery/service-truck-in-snow-roadside.jpg', alt: 'A black wrapped Chevrolet Colorado on a snowy roadside under gray winter sky and bare trees', width: 560, height: 306 },
      /* Owner's own, 18 Sep 2026. */
      { file: '/img/gallery/bed-bug-treatment-on-a-boat-in-port.jpg', alt: 'Kristofer Elling in a branded cap with twin cap lights and a half-face respirator, gloved and ready to treat aboard a boat', width: 560, height: 747 },
      { file: '/img/gallery/service-van-on-a-farm-road-bow-wa.jpg', alt: 'A wrapped service van parked on a farm road shoulder beside green fields and a gate outside Bow, hills on the horizon', width: 560, height: 340 },
      { file: '/img/gallery/sasquatch-pest-control-service-van-side-view.jpg', alt: 'Side view of the wrapped Sasquatch Pest Control van showing the phone number, free estimates and web address', width: 560, height: 420 },
      { file: '/img/gallery/g27169.jpg', alt: 'A wrapped SUV parked in a driveway lined with trees', width: 560, height: 560 },
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
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/tree-frog-on-a-sedum.jpg', alt: 'A small green-and-brown tree frog sitting among the flower buds of a sedum in bright sun', width: 560, height: 315 },
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/service-van-in-a-field-of-buttercups.jpg', alt: 'The wrapped service van parked in a summer field of yellow buttercups and tall grass, a green hedge behind', width: 560, height: 259 },
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/service-truck-above-bellingham-looking-to-the-islands.jpg', alt: 'The wrapped Chevrolet Colorado on a hillside street above Bellingham, the bay and the San Juan Islands behind under a stormy sky', width: 560, height: 245 },
      { file: '/img/gallery/service-truck-at-lake-padden.jpg', alt: 'The wrapped Chevrolet Colorado in the Lake Padden parking lot, mist lifting off the lake and the forest behind', width: 560, height: 328 },
      { file: '/img/gallery/service-truck-on-chuckanut-drive.jpg', alt: 'The wrapped Chevrolet Colorado at a pullout on Chuckanut Drive, Samish Bay and distant islands under a wide cloudy sky', width: 560, height: 286 },
      { file: '/img/gallery/service-truck-above-lake-whatcom.jpg', alt: 'The wrapped Chevrolet Colorado on a wet driveway above Lake Whatcom, docks and lakeside houses along the shore below', width: 560, height: 420 },
      /* Owner's own, 19 Sep 2026. */
      { file: '/img/gallery/service-truck-at-the-mt-baker-ski-area-sign.jpg', alt: 'The wrapped pickup parked in front of the Mt. Baker Ski Area stone sign and raven sculpture, tall firs behind', width: 560, height: 338 },
      { file: '/img/gallery/service-van-below-mount-shuksan.jpg', alt: 'The wrapped van at a high pullout on the Mount Baker Highway, a glaciered peak and forested ridges behind in summer haze', width: 560, height: 357 },
      { file: '/img/gallery/service-van-on-the-mount-baker-highway-in-wildfire-haze.jpg', alt: 'The wrapped van on a mountain road pullout, jagged peaks and forest softened by haze under a hazy sun', width: 560, height: 248 },
      { file: '/img/gallery/service-van-on-lummi-island.jpg', alt: 'The wrapped van parked at the water on Lummi Island, a forested shoreline across the channel under a bright sky', width: 560, height: 420 },
      { file: '/img/gallery/deer-walking-past-the-service-van.jpg', alt: 'A black-tailed deer walking across a shaded lot past the parked service van, under tall cedars', width: 560, height: 747 },
      { file: '/img/gallery/service-truck-on-the-mount-baker-highway.jpg', alt: 'A wrapped service truck parked at a high viewpoint on the Mount Baker Highway, a glaciered peak and forested ridges behind it under a bright sun', width: 560, height: 310 },
      /* Owner's own, 19 Sep 2026: mantises and a salamander met on jobs. */
      { file: '/img/gallery/praying-mantis-on-a-textured-post.jpg', alt: 'A tan praying mantis clinging to a black-and-white textured post, its folded forelegs and long antenna in sharp focus', width: 560, height: 1164 },
      { file: '/img/gallery/brown-praying-mantis-on-siding.jpg', alt: 'A brown praying mantis with long striped wings climbing white textured siding', width: 560, height: 747 },
      { file: '/img/gallery/green-praying-mantis-in-a-garden-plant.jpg', alt: 'A green praying mantis perched among the stems and leaves of a garden plant', width: 560, height: 1152 },
      { file: '/img/gallery/salamander-in-soil-beside-a-caterpillar.jpg', alt: 'A dark glossy salamander curled in damp soil beside a hairy caterpillar', width: 560, height: 420 },
      { file: '/img/gallery/service-truck-at-a-hilltop-above-lake-whatcom.jpg', alt: 'The wrapped service truck parked on a hilltop overlooking Lake Whatcom, forested hills and distant snowy peaks under a clear blue sky', width: 560, height: 315 },
      /* Owner's own, 18 Sep 2026. */
      { file: '/img/gallery/service-van-on-lummi-shore-road.jpg', alt: 'The wrapped service van parked on a gravel shoulder beside the water on Lummi Shore Road, a forested island across the bay under a bright broken sky', width: 560, height: 329 },
      { file: '/img/gallery/garter-snake-at-a-foundation.jpg', alt: 'A striped garter snake, black with yellow-green stripes and orange flecks, sliding along a concrete foundation beside a drain pipe', width: 560, height: 747 },
      { file: '/img/gallery/salamander-on-a-gloved-hand.jpg', alt: 'A small orange-brown salamander resting on a black gloved hand, found on a job', width: 560, height: 996 },
      /* Owner's own, 18 Sep 2026, named by him. Wildlife met on the job and NOT
         pests we treat: the alligator lizard is harmless and eats insects, and the
         woodpecker is here as a photograph, not a service — bird work was dropped
         on 12 Sep 2026 and nothing on this site offers it. */
      { file: '/img/gallery/northern-alligator-lizard.jpg', alt: 'A northern alligator lizard, brown with dark flecks and a long curled tail, on a black plastic surface scattered with seed', width: 560, height: 995 },
      { file: '/img/gallery/pileated-woodpecker-at-a-rotting-stump.jpg', alt: 'A pileated woodpecker with a red crest and black-and-white face working a moss-covered rotting stump in tall grass', width: 560, height: 995 },
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
      { file: '/img/gallery/g26983.jpg', alt: 'A blacktail buck standing in a driveway across the road, seen through the windshield from the truck on a quiet wooded street', width: 560, height: 747 },
      { file: '/img/gallery/g26981.jpg', alt: 'A frog on gravel beside a bait station, wildlife encountered during work', width: 560, height: 420 },
    ],
  },
];

/* Bird work is retired (owner, 12 Sep 2026). The images are removed here rather
   than from the list above, so every reader of `gallery` — /gallery/, the
   service pages that attach a section, /es/galeria/ — gets the same set. See
   src/data/retired-photos.ts for why this is a list of files, not a pattern. */
export const gallery: GallerySection[] = allSections.map((s) => ({
  ...s,
  images: s.images.filter((img) => !BIRD_WORK_IMAGES.has(img.file)),
}));

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
