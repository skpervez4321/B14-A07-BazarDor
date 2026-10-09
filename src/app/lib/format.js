const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const WEEKDAYS = {
  Sunday: "রবিবার",
  Monday: "সোমবার",
  Tuesday: "মঙ্গলবার",
  Wednesday: "বুধবার",
  Thursday: "বৃহস্পতিবার",
  Friday: "শুক্রবার",
  Saturday: "শনিবার",
};

const MONTHS = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

const UNIT_NAMES = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
};

export function toBnDigits(value) {
  return String(value).replace(/\d/g, (digit) => BN_DIGITS[Number(digit)]);
}

export function toNumber(value) {
  if (typeof value === "number") return value;
  const latin = String(value)
    .replace(/[০-৯]/g, (digit) => String(BN_DIGITS.indexOf(digit)))
    .replace(/,/g, "");
  const result = Number(latin);
  return Number.isNaN(result) ? 0 : result;
}

export function formatNumber(value) {
  return toBnDigits(toNumber(value).toLocaleString("en-US"));
}

export function formatPrice(value) {
  return `${formatNumber(value)} টাকা`;
}

export function getChangeInfo(change) {
  const dir = change?.dir ?? "flat";
  const pct = Math.abs(toNumber(change?.pct ?? 0));
  const text = `${toBnDigits(pct.toFixed(1))}%`;

  if (dir === "up") return { dir: "up", label: `▲ ${text}` };
  if (dir === "down") return { dir: "down", label: `▼ ${text}` };
  return { dir: "flat", label: `—${text}` };
}

export function unitName(unit) {
  return UNIT_NAMES[unit] ?? unit;
}

export function unitLabel(unit) {
  return `প্রতি ${unitName(unit)}`;
}

export function getBanglaDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).formatToParts(date);

  const pick = (type) => parts.find((part) => part.type === type).value;

  return `${WEEKDAYS[pick("weekday")]}, ${toBnDigits(pick("day"))} ${
    MONTHS[Number(pick("month")) - 1]
  }, ${toBnDigits(pick("year"))}`;
}

export function topRisers(products, count = 6) {
  return products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, count);
}

export function topFallers(products, count = 6) {
  return products
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, count);
}

export function sortProducts(products, mode = "default") {
  if (mode === "price-asc") {
    return [...products].sort((a, b) => toNumber(a.today) - toNumber(b.today));
  }
  if (mode === "price-desc") {
    return [...products].sort((a, b) => toNumber(b.today) - toNumber(a.today));
  }
  return [...products];
}