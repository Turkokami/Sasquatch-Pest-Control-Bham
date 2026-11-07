/**
 * reviews.ts — customer reviews, transcribed from the company's own Google
 * Business Profile.
 *
 * PROVENANCE. Every entry below was read off screenshots of the owner's own
 * Business Profile management screen on 7 Nov 2026 — the screen that carries
 * "Reply to reviews" and per-review Edit/Delete, which is the same verified
 * surface `business.rating` requires. They are not retyped from memory, not
 * collected by a widget, and not bought.
 *
 * THE TEXT IS VERBATIM. Nothing has been tightened, re-punctuated, spell-
 * checked or made to sound better. Where a customer wrote "recomended", it
 * says recomended. Where one wrote a sentence that reads oddly out of
 * context, it still reads oddly. The only normalization applied anywhere is
 * that apostrophes are the typographic character throughout, which changes
 * no word. The FTC's rule on endorsements is that a quoted review must be
 * the consumer's honest opinion in substance; quietly improving the prose is
 * how a testimonial page stops being evidence and starts being copy.
 *
 * NAMES ARE SHORTENED ON PURPOSE. Google publishes full names and these are
 * public there, but there is no reason for this site to add a second, more
 * durable copy — so only the first name and last initial are stored. The
 * full names are not in this file and not in this repository, which is
 * public. To match an entry back to its review, open the profile.
 *
 * DATES ARE DERIVED AND THE DERIVATION IS STORED. Google does not publish a
 * review date in this view; it publishes an age ("22 weeks ago"). `age` is
 * what Google displayed on 7 Nov 2026 and is the primary record. `month` is
 * that age converted to a calendar month, which is accurate to about a week
 * and is labeled as approximate on the page. If these ever need re-deriving,
 * `age` is the thing to re-derive them from.
 *
 * NO aggregateRating, NO Review markup, anywhere. See the long note on
 * business.rating: Google's own Review Snippet documentation makes a site
 * ineligible for star treatment when the entity controls the reviews about
 * itself, and forbids re-publishing another platform's ratings as structured
 * data. Marking this page up would buy no stars and risk a manual action.
 * The page shows the quotes and links to where they live. That is the whole
 * mechanism and it is deliberate.
 *
 * ENGLISH ONLY, like /image-use/. These are fifteen people's own words. A
 * translated testimonial is a testimonial nobody gave.
 *
 * WHAT IS NOT HERE, and why the omission is recorded rather than silent:
 *
 *   - One five-star review from April 2026 praises us for clearing the
 *     writer's "mole population". It is a real review and a happy customer,
 *     and it is left off this page because src/data/services.ts carries a
 *     published refusal — "Why we won't sell you mole trapping" — resting on
 *     I-713 (RCW 77.15.192–.194). Choosing that quote for our own marketing
 *     page would advertise a result from work this site says it will not
 *     sell. Leaving out a POSITIVE review to avoid contradicting ourselves
 *     is the opposite of review gating. The owner can overrule it.
 *
 *   - Nothing is left out for being critical. No review in the set supplied
 *     was below five stars. When one is, it does not get hidden here — see
 *     the standing note on the page itself.
 */

export interface Review {
  /** First name and last initial, as published. Never the full name. */
  name: string;
  /** Google's own relative stamp, exactly as it read on 7 Nov 2026. */
  age: string;
  /** `age` resolved to a calendar month. Approximate to about a week. */
  month: string;
  /** The review, word for word. Line breaks are the writer's own. */
  text: string;
  /** Google's service tag on the review, in Google's wording, not ours. */
  job?: string;
  /** Google's "Local Guide" badge — their label for a prolific reviewer. */
  localGuide?: boolean;
  /** Google truncated this one behind "View full review": it is an extract. */
  excerpt?: boolean;
}

/** Newest first, which is the order Google itself defaults to. */
export const reviews: Review[] = [
  {
    name: 'Bret B.',
    age: '3 days ago',
    month: 'November 2026',
    localGuide: true,
    job: 'Rodent extermination, General pest inspection',
    text: 'I had a great experience with Sasquatch Pest Control. Scheduling and communication through text messages was easy and convenient. The technician spent time with me discussing a rodent issue, helping identify potential entry points, and offering helpful advice and recommendations. I really appreciated that he took the time to listen, answer questions, and talk through everything without feeling rushed. Very professional, knowledgeable, and easy to work with. I would definitely recommend them.',
  },
  {
    name: 'David A.',
    age: '1 week ago',
    month: 'October 2026',
    excerpt: true,
    text: 'Excellent inspection services and follow-up, professional and courteous company.',
  },
  {
    name: 'Peter W.',
    age: '14 weeks ago',
    month: 'August 2026',
    excerpt: true,
    text: 'They’ve been servicing my house for 3 years, and I’m very satisfied. No rodents living in my crawl space!',
  },
  {
    name: 'Deborah L.',
    age: '15 weeks ago',
    month: 'July 2026',
    job: 'Hornet & wasp extermination',
    text: 'Very easy to schedule an appointment via text and fast turnaround time. Prompt and efficient! Very fair pricing too! Hope we never need their services again, but would be the first place we would call, trust was built with one visit.\nI most certainly will highly recommend them! Thank you TJ and team a real pleasure working with you!',
  },
  {
    name: 'MicSuni T.',
    age: '16 weeks ago',
    month: 'July 2026',
    job: 'Hornet & wasp extermination',
    text: 'We had a huge yellow jacket nest on the eave of our house that we did not see before it had gotten out of hand. Kris took care of efficiently and quickly. We will be using Sasquatch moving forward for all of our pests needs. Thank you again Kris!',
  },
  {
    name: 'Oleg V.',
    age: '19 weeks ago',
    month: 'June 2026',
    text: 'Kris and Tyson are exceptional in all the work they do. Were able to get out quick for a rodent infestation and were able to bullet proof the building in quick time for preventative maintenance.\n\nKeep it up',
  },
  {
    name: 'Tammy Y.',
    age: '19 weeks ago',
    month: 'June 2026',
    job: 'Rodent extermination',
    text: 'They have been pleasant explained what they were doing . Have come as scheduled. Always remind you when your next monthly inspection is due and gives you options to change date if necessary.',
  },
  {
    name: 'Maria G.',
    age: '22 weeks ago',
    month: 'June 2026',
    localGuide: true,
    job: 'General pest inspection',
    text: 'A friend of mine has been having issues with rodents under her house and inside her walls so I decided to have my crawl space checked just in case. I chose this company because of its ratings, free inspection, and the fact that it was a local business and not some big corporate company. I was completely impressed with the service technician who came out to look. He took video of my crawl space and showed me that there was nothing, absolutely nothing to worry about. No evidence of tracks, feces or urine, or torn up insulation. Everything was intact. He said it was impressive especially since I live in Sudden Valley and the house is 23 years old. He gave me such great assurance. I would highly recommend them over some national corporate company any day. He gave me lots of good information,\nwhat to look for, how to keep pests away, and more. If you have a problem, call them. I highly recommend them.',
  },
  {
    name: 'Sarah G.',
    age: '22 weeks ago',
    month: 'June 2026',
    job: 'Rodent extermination',
    text: 'I have a rat issue in my crawlspace and really liked Chris and Bryce. They’re knowledgeable, helpful, offered a variety of solution options and seem to really care to get the problem addressed well. It’s hard to find people who "care" these days and I didn’t get that impression from Sasquatch. They appeared to be good, honest guys. Highly recomended!',
  },
  {
    name: 'Bev K.',
    age: '23 weeks ago',
    month: 'May 2026',
    text: 'Best Pest Co in ALL respects: Very Knowledgeable Pest Background; Quality service; Timely service; Integrity & Honesty',
  },
  {
    name: 'David S.',
    age: '23 weeks ago',
    month: 'May 2026',
    text: 'I can’t say enough great things about Sasquatch Pest Control. Kris and Tyson are always so responsive, so helpful and so on-the-ball. We hired them for a rodent infestation, and since they’ve been on contract they’ve helped out with a gnarly sugar ant problem as well — and Kris even ID’d some harmless larval ladybugs for us, offering the sage advice to scrape em off and take ‘em outside where they’ll be happier :-) — and they did all this for free, under the initial rodent contract. They are always on-call for their clients. They won’t upsell you and are transparent and fair about their pricing. We feel so lucky to have found them and can recommend Sasquatch 1000%, without reservations. The best!',
  },
  {
    name: 'Duane A.',
    age: '24 weeks ago',
    month: 'May 2026',
    job: 'Hornet & wasp extermination, Rodent extermination',
    text: 'We recently used this pest control company and had a great experience. They were professional, showed up on time, explained everything clearly, and were thorough with the treatment. We noticed a big improvement quickly, and the whole process was easy from scheduling to service. Fair pricing and friendly service—would definitely recommend them to anyone needing pest control.',
  },
  {
    name: 'Kara B.',
    age: '27 weeks ago',
    month: 'May 2026',
    text: 'They responded quickly and came out for a free estimate. They took the time to thoroughly inspect the area and explain what changes we could make to help prevent future infestations. In the end, we didn’t even need their services, which really speaks to their honesty and integrity. I truly appreciate their transparency and would highly recommend them to anyone looking for trustworthy, knowledgeable help',
  },
  {
    name: 'Janna C.',
    age: '28 weeks ago',
    month: 'April 2026',
    text: 'Friendly, prompt and gives you all the info you need to know about the service',
  },
  {
    name: 'Andree B.',
    age: '29 weeks ago',
    month: 'April 2026',
    job: 'Hornet & wasp extermination',
    text: 'Great experience. Such an easy gentleman to work with. Quickly took care of our problem with ease',
  },
];
