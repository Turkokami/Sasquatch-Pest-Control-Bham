/**
 * OPENING HOURS, FORMATTED FROM THE ONE PLACE THEY ARE WRITTEN.
 *
 * Why this exists: the hours were typed out five times — the footer in two
 * languages, both contact pages and the Spanish home page — beside a sixth
 * copy in business.hours that fed the schema. On 27 Sep 2026 a post-launch
 * audit found Sunday published as opening at 8 AM when it opens at 10, on all
 * 438 pages and in the structured data. One row was corrected; five sentences
 * would have kept the old time. Hours are a fact a customer acts on, so they
 * get one source and no copies.
 *
 * The day names are written out rather than taken from Intl, because
 * business.hours uses English day names as its keys (schema.org requires
 * them) and a locale-aware lookup would silently produce nothing if a key
 * were ever misspelled. A table that has to be edited to break is safer here
 * than a lookup that fails quietly.
 */
import { business } from '../data/business';

type Lang = 'en' | 'es';

const DAY_SHORT: Record<Lang, Record<string, string>> = {
  en: {
    Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu',
    Friday: 'Fri', Saturday: 'Sat', Sunday: 'Sun',
  },
  es: {
    Monday: 'Lun', Tuesday: 'Mar', Wednesday: 'Mié', Thursday: 'Jue',
    Friday: 'Vie', Saturday: 'Sáb', Sunday: 'Dom',
  },
};

const DAY_LONG: Record<Lang, Record<string, string>> = {
  en: {
    Monday: 'Monday', Tuesday: 'Tuesday', Wednesday: 'Wednesday',
    Thursday: 'Thursday', Friday: 'Friday', Saturday: 'Saturday', Sunday: 'Sunday',
  },
  es: {
    Monday: 'lunes', Tuesday: 'martes', Wednesday: 'miércoles',
    Thursday: 'jueves', Friday: 'viernes', Saturday: 'sábado', Sunday: 'domingo',
  },
};

/** '08:00' -> '8:00 AM' / '8:00 a. m.' — the Spanish form the site already uses. */
export function clockTime(hhmm: string, lang: Lang = 'en'): string {
  const [hStr, mStr] = hhmm.split(':');
  const h = Number(hStr);
  const suffix = h < 12 ? (lang === 'es' ? 'a. m.' : 'AM') : lang === 'es' ? 'p. m.' : 'PM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${mStr} ${suffix}`;
}

/** A row's days as a range when they are consecutive, else a list. */
function dayLabel(days: string[], lang: Lang, long: boolean): string {
  const table = long ? DAY_LONG[lang] : DAY_SHORT[lang];
  const names = days.map((d) => table[d] ?? d);
  if (names.length === 1) return names[0];
  const joiner = long ? (lang === 'es' ? ' a ' : '–') : '–';
  return `${names[0]}${joiner}${names[names.length - 1]}`;
}

/**
 * One short line per row, for the footer: 'Mon–Fri: 8:00 AM – 6:00 PM'.
 */
export function hoursLines(lang: Lang = 'en'): string[] {
  return business.hours.map(
    (h) =>
      `${dayLabel(h.days, lang, false)}: ${clockTime(h.open, lang)} – ${clockTime(h.close, lang)}`,
  );
}

/**
 * The long form for a contact page: 'Monday–Friday: 8:00 AM – 6:00 PM'.
 */
export function hoursLinesLong(lang: Lang = 'en'): string[] {
  return business.hours.map((h) => {
    /* Spanish does not capitalize day names mid-sentence, and these are not
       mid-sentence — each one opens its own line. The label is capitalized
       for that position only; hoursSentence() below leaves them lowercase,
       where they belong. */
    const label = dayLabel(h.days, lang, true);
    const shown = lang === 'es' ? label.charAt(0).toUpperCase() + label.slice(1) : label;
    return `${shown}: ${clockTime(h.open, lang)} – ${clockTime(h.close, lang)}`;
  });
}

/**
 * One sentence, for prose: 'lunes a viernes de 8:00 a. m. a 6:00 p. m.;
 * sábado de 8:00 a. m. a 4:00 p. m.; domingo de 10:00 a. m. a 4:00 p. m.'
 */
export function hoursSentence(lang: Lang = 'en'): string {
  return business.hours
    .map((h) =>
      lang === 'es'
        ? `${dayLabel(h.days, 'es', true)} de ${clockTime(h.open, 'es')} a ${clockTime(h.close, 'es')}`
        : `${dayLabel(h.days, 'en', true)} ${clockTime(h.open, 'en')} to ${clockTime(h.close, 'en')}`,
    )
    .join('; ');
}
