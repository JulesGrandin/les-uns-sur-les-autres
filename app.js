const DATA = {
  world: "data/countries-all-50m.json",
  us: "data/us-states-10m.geojson",
};

const SKIP_ADM = new Set([
  "IOA", "HMD", "NFK", "ATC",
  "MAC", "HKG",
  "FRO", "ALD",
  "SPM", "WLF", "MAF", "BLM", "PYF", "NCL", "ATF",
  "ABW", "CUW", "SXM",
  "NIU", "COK",
  "SGS", "IOT", "SHN", "PCN", "AIA", "FLK", "CYM", "BMU", "VGB", "TCA", "MSR", "JEY", "GGY", "IMN",
  "MNP", "VIR", "GUM", "ASM", "PRI",
  "ATA", "KAS", "SOL", "CYN",
]);

const RENAME = { CHN: "Chine" };

const ALIAS = {
  USA: ["usa", "us", "etats unis d amerique"],
  GBR: ["uk", "grande bretagne", "royaume uni"],
  NLD: ["hollande"],
  CZE: ["republique tcheque"],
  MMR: ["myanmar"],
  VNM: ["vietnam"],
  ARE: ["emirats", "eau"],
  COD: ["rdc", "congo kinshasa", "zaire"],
  COG: ["congo brazzaville"],
  CAF: ["centrafrique"],
  SWZ: ["swaziland"],
  MKD: ["macedoine"],
  TLS: ["timor", "timor leste"],
  TWN: ["taiwan"],
  KOR: ["coree du sud"],
  PRK: ["coree du nord"],
  BIH: ["bosnie"],
  PNG: ["papouasie"],
  STP: ["sao tome"],
  CPV: ["cap vert"],
};

const STACK = { normal: 2, hard: 3, hyper: 5 };

const DIFF_LABEL = {
  normal: "Normale",
  hard: "Difficile",
  hyper: "Hyper difficile",
};

const PACE_LABEL = {
  30000: "À la cool",
  20000: "Stressant",
  10000: "Hyper stressant",
};

const TERRITORY_LABEL = {
  world: "Pays du monde",
  us: "États-Unis",
};

const UNKNOWN = {
  world: "Aucun pays à ce nom.",
  us: "Aucun État à ce nom.",
};

const PLACEHOLDER = {
  world: "Un pays…",
  us: "Un État…",
};

const WORLD_ARTICLE = {
  Afghanistan: "l", "Afrique du Sud": "l", Albanie: "l", Algérie: "l", Allemagne: "l", Andorre: "l",
  Angola: "l", "Antigua-et-Barbuda": "l", "Arabie saoudite": "l", Argentine: "l", Arménie: "l",
  Australie: "l", Autriche: "l", Azerbaïdjan: "l", Bahamas: "les", Bahreïn: "le", Bangladesh: "le",
  Barbade: "la", Belgique: "la", Belize: "le", Bénin: "le", Bhoutan: "le", Biélorussie: "la",
  Birmanie: "la", Bolivie: "la", "Bosnie-Herzégovine": "la", Botswana: "le", Brésil: "le", Brunei: "le",
  Bulgarie: "la", "Burkina Faso": "le", Burundi: "le", Cambodge: "le", Cameroun: "le", Canada: "le",
  "Cap-Vert": "le", Chili: "le", Chine: "la", Chypre: "", "Cité du Vatican": "la", Colombie: "la",
  Comores: "les", "Corée du Nord": "la", "Corée du Sud": "la", "Costa Rica": "le", "Côte d'Ivoire": "la",
  Croatie: "la", Cuba: "", Danemark: "le", Djibouti: "", Dominique: "la", Égypte: "l",
  "Émirats arabes unis": "les", Équateur: "l", Érythrée: "l", Espagne: "l", Estonie: "l", Eswatini: "l",
  "États fédérés de Micronésie": "les", "États-Unis": "les", Éthiopie: "l", Fidji: "les", Finlande: "la",
  France: "la", Gabon: "le", Gambie: "la", Géorgie: "la", Ghana: "le", Grèce: "la", Grenade: "la",
  Groenland: "le", Guatemala: "le", Guinée: "la", "Guinée équatoriale": "la", "Guinée-Bissau": "la",
  Guyana: "le", Haïti: "", Honduras: "le", Hongrie: "la", "Îles Marshall": "les", "Îles Salomon": "les",
  Inde: "l", Indonésie: "l", Irak: "l", Iran: "l", Irlande: "l", Islande: "l", Israël: "", Italie: "l",
  Jamaïque: "la", Japon: "le", Jordanie: "la", Kazakhstan: "le", Kenya: "le", Kirghizistan: "le",
  Kiribati: "les", Kosovo: "le", Koweït: "le", Laos: "le", Lesotho: "le", Lettonie: "la", Liban: "le",
  Liberia: "le", Libye: "la", Liechtenstein: "le", Lituanie: "la", Luxembourg: "le",
  "Macédoine du Nord": "la", Madagascar: "", Malaisie: "la", Malawi: "le", Maldives: "les", Mali: "le",
  Malte: "", Maroc: "le", Maurice: "", Mauritanie: "la", Mexique: "le", Moldavie: "la", Monaco: "",
  Mongolie: "la", Monténégro: "le", Mozambique: "le", Namibie: "la", Nauru: "", Népal: "le",
  Nicaragua: "le", Niger: "le", Nigeria: "le", Norvège: "la", "Nouvelle-Zélande": "la", Oman: "",
  Ouganda: "l", Ouzbékistan: "l", Pakistan: "le", Palaos: "les", Palestine: "la", Panama: "le",
  "Papouasie-Nouvelle-Guinée": "la", Paraguay: "le", "Pays-Bas": "les", Pérou: "le", Philippines: "les",
  Pologne: "la", Portugal: "le", Qatar: "le", Centrafrique: "la", Congo: "le",
  "République centrafricaine": "la", "République démocratique du Congo": "la",
  "République dominicaine": "la", "République du Congo": "la", "République tchèque": "la",
  Roumanie: "la", "Royaume-Uni": "le", Russie: "la", Rwanda: "le", "Saint-Christophe-et-Niévès": "",
  "Saint-Marin": "", "Saint-Vincent-et-les-Grenadines": "", "Sainte-Lucie": "", Salvador: "le",
  Samoa: "les", "Sao Tomé-et-Principe": "", Sénégal: "le", Serbie: "la", Seychelles: "les",
  "Sierra Leone": "la", Singapour: "", Slovaquie: "la", Slovénie: "la", Somalie: "la", Soudan: "le",
  "Soudan du Sud": "le", "Sri Lanka": "le", Suède: "la", Suisse: "la", Suriname: "le", Syrie: "la",
  Tadjikistan: "le", Taïwan: "", Tanzanie: "la", Tchad: "le", Tchéquie: "la", Thaïlande: "la",
  "Timor oriental": "le", Togo: "le", Tonga: "les", "Trinité-et-Tobago": "la", Tunisie: "la",
  Turkménistan: "le", Turquie: "la", Tuvalu: "les", Ukraine: "l", Uruguay: "l", Vanuatu: "le",
  Venezuela: "le", "Viêt Nam": "le", Yémen: "le", Zambie: "la", Zimbabwe: "le",
};

const US_ARTICLE = {
  Alabama: "l", Alaska: "l", Arizona: "l", Arkansas: "l", Californie: "la", "Caroline du Nord": "la",
  "Caroline du Sud": "la", Colorado: "le", Connecticut: "le", "Dakota du Nord": "le",
  "Dakota du Sud": "le", Delaware: "le", Floride: "la", Géorgie: "la", Hawaï: "", Idaho: "l",
  Illinois: "l", Indiana: "l", Iowa: "l", Kansas: "le", Kentucky: "le", Louisiane: "la", Maine: "le",
  Maryland: "le", Massachusetts: "le", Michigan: "le", Minnesota: "le", Mississippi: "le",
  Missouri: "le", Montana: "le", Nebraska: "le", Nevada: "le", "New Hampshire": "le",
  "New Jersey": "le", "New York": "", "Nouveau-Mexique": "le", Ohio: "l", Oklahoma: "l", Oregon: "l",
  Pennsylvanie: "la", "Rhode Island": "le", Tennessee: "le", Texas: "le", Utah: "l", Vermont: "le",
  Virginie: "la", "Virginie-Occidentale": "la", Washington: "", Wisconsin: "le", Wyoming: "le",
};

const MASK = 56;
const BOARD_ORIGIN = "https://les-uns-sur-les-autres.julesgrandin.workers.dev";
const BOARD_NAME_KEY = "uns-sur-les-autres-pseudo";

const $ = (id) => document.getElementById(id);

const ui = {
  load: $("load-overlay"),
  loadText: $("load-text"),
  loadFill: $("load-bar-fill"),
  intro: $("intro-modal"),
  lead: $("intro-lead"),
  start: $("btn-start"),
  timerBlock: $("timer-block"),
  timerFill: $("timer-fill"),
  timerValue: $("timer-value"),
  timerBar: document.querySelector("#timer-block .timer-bar"),
  chrome: $("chrome"),
  kicker: $("round-kicker"),
  scoreLine: $("score-line"),
  historyWrap: $("history-wrap"),
  history: $("history"),
  stage: $("stage"),
  stackFrame: $("stack-frame"),
  stack: $("stack"),
  pieces: $("pieces"),
  splitBtn: $("btn-split"),
  dock: $("dock"),
  ask: $("ask"),
  askLabel: $("ask-label"),
  form: $("guess-form"),
  guessWrap: $("guess-wrap"),
  guess: $("guess"),
  suggest: $("suggest"),
  hint: $("guess-hint"),
  validate: $("btn-validate"),
  feedback: $("feedback"),
  feedbackKicker: $("feedback-kicker"),
  feedbackDetail: $("feedback-detail"),
  next: $("btn-next"),
  finish: $("finish-modal"),
  finalScore: $("final-score"),
  finishPace: $("finish-pace"),
  recap: $("finish-recap"),
  boardMode: $("board-mode"),
  boardForm: $("board-form"),
  boardName: $("board-name"),
  boardSave: $("board-save"),
  boardNote: $("board-note"),
  boardList: $("board-list"),
  replay: $("btn-replay"),
};

const settings = { territory: "world", length: 5, difficulty: "normal", ms: 30000 };
let catalogs = null;
let rounds = [];
let index = 0;
let locked = false;
let suggestItems = [];
let suggestIndex = 0;
let ignoreSubmit = false;
let timerFrame = 0;
let roundEndsAt = 0;
let fitFrame = 0;
let fullHeight = window.innerHeight;
let splitFrame = 0;
let splitToken = 0;

const MAX_LINK_DEG = 13;
const MAX_FROM_MAIN_DEG = 13.2;
const MIN_PART_RATIO = 0.008;

function fixRing(ring) {
  if (!ring.length) return [];
  const out = [[ring[0][0], ring[0][1]]];
  for (let i = 1; i < ring.length; i += 1) {
    let lon = ring[i][0];
    const prev = out[i - 1][0];
    while (lon - prev > 180) lon -= 360;
    while (prev - lon > 180) lon += 360;
    out.push([lon, ring[i][1]]);
  }
  return out;
}

function ringStats(ring) {
  let crossSum = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < ring.length - 1; i += 1) {
    const x1 = ring[i][0];
    const y1 = ring[i][1];
    const x2 = ring[i + 1][0];
    const y2 = ring[i + 1][1];
    const cross = x1 * y2 - x2 * y1;
    crossSum += cross;
    cx += (x1 + x2) * cross;
    cy += (y1 + y2) * cross;
  }
  const area = Math.abs(crossSum) / 2;
  if (area < 1e-12) {
    let sx = 0;
    let sy = 0;
    ring.forEach((point) => {
      sx += point[0];
      sy += point[1];
    });
    return { cx: sx / ring.length, cy: sy / ring.length, area: 0 };
  }
  return { cx: cx / (3 * crossSum), cy: cy / (3 * crossSum), area };
}

function polygonsOf(geometry) {
  if (!geometry) return [];
  if (geometry.type === "Polygon") return [geometry.coordinates];
  if (geometry.type === "MultiPolygon") return geometry.coordinates;
  return [];
}

function degreeDistance(a, b) {
  const midLat = ((a.cy + b.cy) / 2) * Math.PI / 180;
  const dx = (a.cx - b.cx) * Math.cos(midLat);
  const dy = a.cy - b.cy;
  return Math.hypot(dx, dy);
}

function cluster(geometry) {
  const items = polygonsOf(geometry).map((polygon) => {
    const rings = polygon.map(fixRing).filter((ring) => ring.length >= 4);
    if (!rings.length) return null;
    const stats = ringStats(rings[0]);
    return { rings, cx: stats.cx, cy: stats.cy, area: stats.area };
  }).filter((item) => item && item.area > 0);

  if (!items.length) return [];
  items.sort((a, b) => b.area - a.area);
  const ref = items[0].cx;
  items.forEach((item) => {
    while (item.cx - ref > 180) {
      item.cx -= 360;
      item.rings = item.rings.map((ring) => ring.map(([lon, lat]) => [lon - 360, lat]));
    }
    while (ref - item.cx > 180) {
      item.cx += 360;
      item.rings = item.rings.map((ring) => ring.map(([lon, lat]) => [lon + 360, lat]));
    }
  });

  const kept = [items[0]];
  const rest = items.slice(1);
  let changed = true;
  while (changed) {
    changed = false;
    for (let i = rest.length - 1; i >= 0; i -= 1) {
      const item = rest[i];
      if (item.area < items[0].area * MIN_PART_RATIO) continue;
      if (degreeDistance(item, items[0]) > MAX_FROM_MAIN_DEG) continue;
      const near = kept.some((other) => degreeDistance(item, other) <= MAX_LINK_DEG);
      if (near) {
        kept.push(item);
        rest.splice(i, 1);
        changed = true;
      }
    }
  }
  return kept;
}

function silhouette(geometry, rotationDeg) {
  const kept = cluster(geometry);
  if (!kept.length) return null;
  let geoArea = 0;
  let points = 0;
  kept.forEach((item) => {
    geoArea += item.area;
    points += item.rings[0].length;
  });
  const polygons = kept.map((item) => item.rings);
  const [lon0, lat0] = territoryCenter(polygons);
  const projected = projectPolygons(polygons, lon0, lat0)
    .map((rings) => rings.map((ring) => ring.map(([x, y]) => [x, -y])));

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  projected.forEach((polygon) => polygon.forEach((ring) => ring.forEach(([x, y]) => {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  })));
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const rad = rotationDeg * Math.PI / 180;
  const cosR = Math.cos(rad);
  const sinR = Math.sin(rad);
  const rotate = ([x, y]) => {
    const dx = x - cx;
    const dy = y - cy;
    return [cx + dx * cosR - dy * sinR, cy + dx * sinR + dy * cosR];
  };
  const rotated = projected.map((polygon) => polygon.map((ring) => ring.map(rotate)));

  minX = Infinity;
  minY = Infinity;
  maxX = -Infinity;
  maxY = -Infinity;
  rotated.forEach((polygon) => polygon.forEach((ring) => ring.forEach(([x, y]) => {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  })));
  const width = maxX - minX;
  const height = maxY - minY;
  if (width < 1e-6 || height < 1e-6) return null;
  const pad = 6;
  const avail = 100 - pad * 2;
  const scale = avail / Math.max(width, height);
  const offsetX = pad + (avail - width * scale) / 2;
  const offsetY = pad + (avail - height * scale) / 2;
  const mapPoint = ([x, y]) => [
    offsetX + (x - minX) * scale,
    offsetY + (y - minY) * scale,
  ];

  let pathArea = 0;
  const commands = [];
  rotated.forEach((polygon) => polygon.forEach((ring) => {
    pathArea += Math.abs(ringStats(ring).area);
    ring.forEach((point, i) => {
      const [x, y] = mapPoint(point);
      commands.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`);
    });
    commands.push("Z");
  }));

  return {
    d: commands.join(" "),
    points,
    geoArea,
    sig: {
      aspect: width / height,
      fill: pathArea / (width * height),
    },
  };
}

function shiftLon(lon, ref) {
  let next = lon;
  while (next - ref > 180) next -= 360;
  while (ref - next > 180) next += 360;
  return next;
}

function shiftPolygons(polygons, ref) {
  return polygons.map((rings) => {
    if (!rings.length || !rings[0].length) return [];
    const delta = shiftLon(rings[0][0][0], ref) - rings[0][0][0];
    return rings.map((ring) => ring.map(([lon, lat]) => [lon + delta, lat]));
  });
}

function boundsOf(rings) {
  let minLon = Infinity;
  let minLat = Infinity;
  let maxLon = -Infinity;
  let maxLat = -Infinity;
  rings.forEach((ring) => {
    ring.forEach(([lon, lat]) => {
      minLon = Math.min(minLon, lon);
      minLat = Math.min(minLat, lat);
      maxLon = Math.max(maxLon, lon);
      maxLat = Math.max(maxLat, lat);
    });
  });
  return { minLon, minLat, maxLon, maxLat };
}

function toSphere(lon, lat, lon0, lat0) {
  const lambda = (lon - lon0) * Math.PI / 180;
  const phi = lat * Math.PI / 180;
  const phi0 = lat0 * Math.PI / 180;
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  return [
    cosPhi * Math.sin(lambda),
    Math.cos(phi0) * sinPhi - Math.sin(phi0) * cosPhi * Math.cos(lambda),
    Math.sin(phi0) * sinPhi + Math.cos(phi0) * cosPhi * Math.cos(lambda),
  ];
}

function inverseOrtho(x, y, lon0, lat0) {
  const rho2 = x * x + y * y;
  if (rho2 > 1) return null;
  const rho = Math.sqrt(rho2);
  if (rho < 1e-12) return [lon0, lat0];
  const c = Math.asin(Math.min(1, rho));
  const phi0 = lat0 * Math.PI / 180;
  const lambda0 = lon0 * Math.PI / 180;
  const phi = Math.asin(Math.cos(c) * Math.sin(phi0) + (y * Math.sin(c) * Math.cos(phi0)) / rho);
  const lambda = lambda0 + Math.atan2(
    x * Math.sin(c),
    rho * Math.cos(c) * Math.cos(phi0) - y * Math.sin(c) * Math.sin(phi0),
  );
  return [lambda * 180 / Math.PI, phi * 180 / Math.PI];
}

function territoryCenter(polygons) {
  const box = boundsOf(polygons.flat());
  let lon0 = (box.minLon + box.maxLon) / 2;
  let lat0 = (box.minLat + box.maxLat) / 2;
  for (let pass = 0; pass < 2; pass += 1) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    polygons.forEach((rings) => {
      if (!rings.length || !rings[0].length) return;
      const delta = shiftLon(rings[0][0][0], lon0) - rings[0][0][0];
      rings.forEach((ring) => ring.forEach(([lon, lat]) => {
        const point = toSphere(lon + delta, lat, lon0, lat0);
        if (point[2] <= 0) return;
        minX = Math.min(minX, point[0]);
        minY = Math.min(minY, point[1]);
        maxX = Math.max(maxX, point[0]);
        maxY = Math.max(maxY, point[1]);
      }));
    });
    if (!Number.isFinite(minX)) break;
    const next = inverseOrtho((minX + maxX) / 2, (minY + maxY) / 2, lon0, lat0);
    if (!next) break;
    lon0 = next[0];
    lat0 = next[1];
  }
  return [lon0, lat0];
}

function horizonPoint(a, b) {
  const dz = a[2] - b[2];
  const t = Math.abs(dz) < 1e-12 ? 0 : a[2] / dz;
  const x = a[0] + (b[0] - a[0]) * t;
  const y = a[1] + (b[1] - a[1]) * t;
  const len = Math.hypot(x, y) || 1;
  return [x / len, y / len, 0];
}

function horizonArc(a, b) {
  const start = Math.atan2(a[1], a[0]);
  let delta = Math.atan2(b[1], b[0]) - start;
  while (delta > Math.PI) delta -= Math.PI * 2;
  while (delta < -Math.PI) delta += Math.PI * 2;
  const steps = Math.ceil(Math.abs(delta) / (Math.PI / 30));
  if (steps <= 1) return [];
  const arc = [];
  for (let step = 1; step < steps; step += 1) {
    const angle = start + (delta * step) / steps;
    arc.push([Math.cos(angle), Math.sin(angle)]);
  }
  return arc;
}

function clipFront(sphere) {
  if (sphere.length < 2) return [];
  const visible = (point) => point[2] >= -1e-8;
  const same = (a, b) => Math.abs(a[0] - b[0]) < 1e-7 && Math.abs(a[1] - b[1]) < 1e-7;
  const pieces = [];
  let current = null;
  const closePiece = () => {
    if (current && current.length) pieces.push(current);
    current = null;
  };
  for (let i = 1; i < sphere.length; i += 1) {
    const a = sphere[i - 1];
    const b = sphere[i];
    const frontA = visible(a);
    const frontB = visible(b);
    if (frontA && frontB) {
      if (!current) current = [a];
      current.push(b);
    } else if (frontA) {
      if (!current) current = [a];
      current.push(horizonPoint(a, b));
      closePiece();
    } else if (frontB) {
      current = [horizonPoint(a, b), b];
    }
  }
  if (current && pieces.length && same(current[current.length - 1], pieces[0][0])) {
    pieces[0] = current.concat(pieces[0].slice(1));
    current = null;
  }
  if (current) pieces.push(current);
  if (!pieces.length) return [];
  if (pieces.length === 1 && same(pieces[0][0], pieces[0][pieces[0].length - 1])) {
    return [pieces[0].map((point) => [point[0], point[1]])];
  }
  const ring = [];
  pieces.forEach((piece, index) => {
    piece.forEach((point) => ring.push([point[0], point[1]]));
    const next = pieces[(index + 1) % pieces.length];
    horizonArc(piece[piece.length - 1], next[0]).forEach((point) => ring.push(point));
  });
  if (ring.length >= 3) ring.push(ring[0]);
  return ring.length >= 4 ? [ring] : [];
}

function projectPolygons(polygons, lon0, lat0) {
  const projected = [];
  polygons.forEach((rings) => {
    if (!rings.length || !rings[0].length) return;
    const delta = shiftLon(rings[0][0][0], lon0) - rings[0][0][0];
    const visible = [];
    rings.forEach((ring) => {
      const sphere = ring.map(([lon, lat]) => toSphere(lon + delta, lat, lon0, lat0));
      clipFront(sphere).forEach((part) => visible.push(part));
    });
    if (visible.length) projected.push(visible);
  });
  return projected;
}


function norm(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .toLowerCase()
    .replace(/['’]/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function keysFor(name, extra) {
  const keys = new Set();
  for (const raw of [name, ...(extra || [])]) {
    const spaced = norm(raw);
    if (!spaced) continue;
    keys.add(spaced);
    keys.add(spaced.replace(/ /g, ""));
  }
  return [...keys];
}

function articleOf(name, table) {
  if (Object.prototype.hasOwnProperty.call(table, name)) return table[name];
  console.warn("déterminant manquant", name);
  const bare = norm(name).replace(/[^a-z]/g, "");
  return /^[aeiouy]/.test(bare) ? "l" : "le";
}

function articleName(entity) {
  const { name, article } = entity;
  if (article === "le") return `le ${name}`;
  if (article === "la") return `la ${name}`;
  if (article === "les") return `les ${name}`;
  if (article === "l") return `l’${name}`;
  return name;
}

function joinNames(list) {
  const names = list.map(articleName);
  if (names.length <= 1) return names[0] || "";
  return `${names.slice(0, -1).join(", ")} et ${names[names.length - 1]}`;
}

function pointPhrase(count) {
  return count > 1 ? `${count} points` : `${count} point`;
}

function territoryWord(count) {
  if (settings.territory === "us") return count > 1 ? "États" : "État";
  return "pays";
}

function encoreText(left) {
  const word = territoryWord(left);
  return `Encore ${left} ${word}`;
}

function stackSize() {
  return STACK[settings.difficulty];
}

function refreshIntro() {
  const count = stackSize();
  const seconds = settings.ms / 1000;
  ui.lead.textContent = `Retrouvez les ${count} ${territoryWord(count)} empilés en ${seconds} secondes`;
  ui.guess.placeholder = PLACEHOLDER[settings.territory];
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function sampleFrom(list, count) {
  const copy = list.slice();
  for (let i = 0; i < count; i += 1) {
    const j = i + Math.floor(Math.random() * (copy.length - i));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

function rasterMask(d) {
  const canvas = document.createElement("canvas");
  canvas.width = MASK;
  canvas.height = MASK;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.scale(MASK / 100, MASK / 100);
  ctx.fillStyle = "#000";
  ctx.fill(new Path2D(d), "evenodd");
  const pixels = ctx.getImageData(0, 0, MASK, MASK).data;
  const mask = new Uint8Array(MASK * MASK);
  let area = 0;
  for (let i = 0; i < mask.length; i += 1) {
    if (pixels[i * 4 + 3] > 80) {
      mask[i] = 1;
      area += 1;
    }
  }
  return { mask, area };
}

function exposure(group) {
  const size = MASK * MASK;
  const cover = new Uint8Array(size);
  group.forEach((item) => {
    const mask = item.mask;
    for (let i = 0; i < size; i += 1) cover[i] += mask[i];
  });
  let worst = Infinity;
  group.forEach((item) => {
    const mask = item.mask;
    const seen = new Uint8Array(size);
    let area = 0;
    let visible = 0;
    for (let i = 0; i < size; i += 1) if (mask[i]) area += 1;
    const need = Math.max(36, area * 0.055);
    for (let start = 0; start < size; start += 1) {
      if (!mask[start] || cover[start] !== 1 || seen[start]) continue;
      let count = 0;
      const stack = [start];
      seen[start] = 1;
      while (stack.length) {
        const cur = stack.pop();
        count += 1;
        const x = cur % MASK;
        const y = (cur / MASK) | 0;
        for (let dy = -1; dy <= 1; dy += 1) {
          for (let dx = -1; dx <= 1; dx += 1) {
            if (!dx && !dy) continue;
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || ny < 0 || nx >= MASK || ny >= MASK) continue;
            const next = ny * MASK + nx;
            if (!mask[next] || cover[next] !== 1 || seen[next]) continue;
            seen[next] = 1;
            stack.push(next);
          }
        }
      }
      if (count >= 12) visible += count;
    }
    const ratio = visible / need;
    if (ratio < worst) worst = ratio;
  });
  return worst;
}

function improveDeal(groups) {
  if (!groups || groups.length < 2) return;
  const scores = groups.map((group) => exposure(group));
  for (let pass = 0; pass < 40; pass += 1) {
    let worstI = 0;
    for (let i = 1; i < scores.length; i += 1) {
      if (scores[i] < scores[worstI]) worstI = i;
    }
    let improved = false;
    for (let attempt = 0; attempt < 18; attempt += 1) {
      let other = Math.floor(Math.random() * groups.length);
      if (other === worstI) other = (other + 1) % groups.length;
      const a = Math.floor(Math.random() * groups[worstI].length);
      const b = Math.floor(Math.random() * groups[other].length);
      const left = groups[worstI][a];
      const right = groups[other][b];
      groups[worstI][a] = right;
      groups[other][b] = left;
      const nextWorst = exposure(groups[worstI]);
      const nextOther = exposure(groups[other]);
      const before = Math.min(scores[worstI], scores[other]);
      const after = Math.min(nextWorst, nextOther);
      if (after > before + 0.03) {
        scores[worstI] = nextWorst;
        scores[other] = nextOther;
        improved = true;
        break;
      }
      groups[worstI][a] = left;
      groups[other][b] = right;
    }
    if (!improved) break;
  }
}

function dealRounds(pool, roundCount, stack) {
  let best = null;
  let bestWorst = -1;
  const tight = pool.length <= roundCount * stack;
  const passes = tight ? 1 : (stack >= 5 ? 4 : 6);
  for (let pass = 0; pass < passes; pass += 1) {
    const remaining = shuffle(pool);
    const groups = [];
    let worst = Infinity;
    let failed = false;
    for (let roundIndex = 0; roundIndex < roundCount; roundIndex += 1) {
      if (remaining.length < stack) {
        failed = true;
        break;
      }
      const tries = remaining.length === stack ? 1 : (stack >= 5 ? 12 : 20);
      let pick = null;
      let pickScore = -1;
      for (let attempt = 0; attempt < tries; attempt += 1) {
        const group = sampleFrom(remaining, stack);
        const score = exposure(group);
        if (score > pickScore) {
          pickScore = score;
          pick = group;
        }
      }
      const ids = new Set(pick.map((item) => item.id));
      for (let i = remaining.length - 1; i >= 0; i -= 1) {
        if (ids.has(remaining[i].id)) remaining.splice(i, 1);
      }
      groups.push(pick);
      worst = Math.min(worst, pickScore);
    }
    if (!failed && worst > bestWorst) {
      bestWorst = worst;
      best = groups.map((group) => group.slice());
    }
  }
  improveDeal(best);
  return best;
}

function makeEntity(id, name, aliases, geometry, articles, kind) {
  const drawn = silhouette(geometry, 0);
  if (!drawn) return null;
  if (kind === "world" && (drawn.points < 40 || drawn.geoArea < 0.05)) return null;
  if (kind !== "world" && drawn.points < 12) return null;
  const painted = rasterMask(drawn.d);
  if (painted.area < 24) return null;
  return {
    id,
    name,
    article: articleOf(name, articles),
    keys: keysFor(name, aliases),
    d: drawn.d,
    mask: painted.mask,
  };
}

function worldEntities(collection) {
  const list = [];
  collection.features.forEach((feature) => {
    const props = feature.properties || {};
    const id = props.ADM0_A3;
    if (!id || SKIP_ADM.has(id)) return;
    const sourceName = props.NAME_FR || props.NAME;
    const name = RENAME[id] || sourceName;
    const aliases = [...(ALIAS[id] || [])];
    if (sourceName && sourceName !== name) aliases.push(sourceName);
    if (props.NAME && props.NAME !== name && props.NAME !== sourceName) aliases.push(props.NAME);
    const item = makeEntity(id, name, aliases, feature.geometry, WORLD_ARTICLE, "world");
    if (item) list.push(item);
  });
  return list;
}

function usEntities(collection) {
  const list = [];
  collection.features.forEach((feature) => {
    const props = feature.properties || {};
    if (props.type === "Federal District" || props.iso_3166_2 === "US-DC") return;
    let name = props.name_fr || props.name;
    name = name.replace(/^État de /, "").replace(/^Etat de /, "");
    const aliases = [];
    if (props.name && norm(props.name) !== norm(name)) aliases.push(props.name);
    if (props.name_fr && norm(props.name_fr) !== norm(name)) aliases.push(props.name_fr);
    const item = makeEntity(props.iso_3166_2 || name, name, aliases, feature.geometry, US_ARTICLE, "us");
    if (item) list.push(item);
  });
  return list;
}

function setPressed(selector, attr, value) {
  document.querySelectorAll(selector).forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset[attr] === value ? "true" : "false");
  });
}

function pointsSoFar() {
  return rounds.reduce((sum, round) => sum + round.foundIds.length, 0);
}

function renderHistory() {
  const done = rounds.filter((round) => round.closed);
  ui.historyWrap.hidden = done.length === 0;
  const items = done.map((round) => {
    const got = round.foundIds.length;
    const max = round.entities.length;
    const miss = got < max ? " is-miss" : "";
    const names = round.entities.map((item) => item.name).join(", ");
    return `<li><span class="names">${escapeHtml(names)}</span><span class="score-num${miss}">${got}/${max}</span></li>`;
  });
  if (done.length) {
    items.push(`<li class="score-history-total"><span>Score</span><span class="score-num">${pointsSoFar()}</span></li>`);
  }
  ui.history.innerHTML = items.join("");
}

function showSuggestions(items) {
  suggestItems = items;
  suggestIndex = 0;
  if (!items.length) {
    ui.suggest.hidden = true;
    ui.suggest.innerHTML = "";
    return;
  }
  ui.suggest.innerHTML = items.map((item, itemIndex) => (
    `<li role="option" data-i="${itemIndex}" class="${itemIndex === 0 ? "is-active" : ""}">${escapeHtml(item.name)}</li>`
  )).join("");
  ui.suggest.hidden = false;
}

function moveSuggestion(delta) {
  if (!suggestItems.length) return;
  suggestIndex = (suggestIndex + delta + suggestItems.length) % suggestItems.length;
  [...ui.suggest.children].forEach((li, itemIndex) => {
    li.classList.toggle("is-active", itemIndex === suggestIndex);
  });
  ui.suggest.children[suggestIndex].scrollIntoView({ block: "nearest" });
}

function suggestionsFor(query) {
  const q = norm(query);
  const tight = q.replace(/ /g, "");
  if (tight.length < 1) return [];
  const pool = catalogs[settings.territory];
  const tokens = q.split(" ").filter(Boolean);
  const hits = pool.filter((item) => item.keys.some((key) => {
    if (key.includes(" ")) return tokens.every((token) => token.length >= 2 && key.includes(token));
    return tight.length >= 2 && key.includes(tight);
  }));
  hits.sort((a, b) => {
    const aStart = norm(a.name).startsWith(q) ? 0 : 1;
    const bStart = norm(b.name).startsWith(q) ? 0 : 1;
    return aStart - bStart || a.name.length - b.name.length || a.name.localeCompare(b.name, "fr");
  });
  return hits.slice(0, 7);
}

function resolveGuess(query) {
  const q = norm(query);
  const tight = q.replace(/ /g, "");
  if (!q) return null;
  const pool = catalogs[settings.territory];
  const hits = pool.filter((item) => item.keys.includes(q) || item.keys.includes(tight));
  if (hits.length === 1) return hits[0];
  const exact = hits.filter((item) => norm(item.name) === q);
  if (exact.length === 1) return exact[0];
  return null;
}

function setHint(kind, text) {
  ui.hint.classList.remove("is-hit", "is-soft");
  if (kind === "hit") ui.hint.classList.add("is-hit");
  if (kind === "soft") ui.hint.classList.add("is-soft");
  ui.hint.textContent = text;
}

function shakeField() {
  ui.guessWrap.classList.remove("is-shake");
  void ui.guessWrap.offsetWidth;
  ui.guessWrap.classList.add("is-shake");
}

function stopRoundTimer() {
  cancelAnimationFrame(timerFrame);
  timerFrame = 0;
}

function tickRoundTimer() {
  if (locked) return;
  const left = roundEndsAt - Date.now();
  if (left <= 0) {
    ui.timerFill.style.width = "0%";
    ui.timerBar.setAttribute("aria-valuenow", "0");
    ui.timerValue.textContent = "0 s";
    closeRound("timeout");
    return;
  }
  const pct = Math.max(0, Math.min(100, (left / settings.ms) * 100));
  ui.timerFill.style.width = `${pct}%`;
  ui.timerBar.setAttribute("aria-valuenow", String(Math.round(pct)));
  ui.timerValue.textContent = `${Math.max(0, Math.ceil(left / 1000))} s`;
  timerFrame = requestAnimationFrame(tickRoundTimer);
}

function startRoundTimer() {
  stopRoundTimer();
  roundEndsAt = Date.now() + settings.ms;
  ui.timerBlock.hidden = false;
  ui.timerFill.style.width = "100%";
  ui.timerBar.setAttribute("aria-valuenow", "100");
  ui.timerValue.textContent = `${settings.ms / 1000} s`;
  timerFrame = requestAnimationFrame(tickRoundTimer);
}

function drawRound(round) {
  const lands = round.entities.map((item) => (
    `<g class="piece" data-id="${escapeHtml(item.id)}">
      <path class="land" fill-rule="evenodd" d="${item.d}"></path>
    </g>`
  )).join("");
  const edges = round.entities.map((item) => (
    `<g class="edge-piece" data-id="${escapeHtml(item.id)}">
      <path class="edge" fill-rule="evenodd" d="${item.d}"></path>
    </g>`
  )).join("");
  ui.pieces.innerHTML = lands + edges;
  round.foundIds.forEach((id) => markEdge(id, "is-found"));
}

function markEdge(id, className) {
  const group = ui.pieces.querySelector(`:scope > .edge-piece[data-id="${CSS.escape(id)}"]`);
  if (!group) return;
  const edge = group.querySelector(".edge");
  edge.classList.remove("is-found", "is-missed");
  edge.classList.add(className);
  if (className === "is-found") ui.pieces.appendChild(group);
}

function landPieces() {
  return [...ui.pieces.querySelectorAll(":scope > .piece")];
}

function placeCountry(land, x, y, scale) {
  placePiece(land, x, y, scale);
  const edge = ui.pieces.querySelector(`:scope > .edge-piece[data-id="${CSS.escape(land.dataset.id)}"]`);
  if (edge) placePiece(edge, x, y, scale);
}

function spreadFor(count) {
  const layout = count <= 2
    ? { scale: 0.46, radius: 26 }
    : count === 3
      ? { scale: 0.38, radius: 27 }
      : { scale: 0.28, radius: 30 };
  const start = count === 2 ? Math.PI : -Math.PI / 2;
  return Array.from({ length: count }, (_, i) => {
    const angle = start + (i * 2 * Math.PI) / count;
    return {
      x: Math.cos(angle) * layout.radius,
      y: Math.sin(angle) * layout.radius,
      scale: layout.scale,
    };
  });
}

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2;
}

function placePiece(piece, x, y, scale) {
  if (!x && !y && scale === 1) {
    piece.removeAttribute("transform");
    return;
  }
  piece.setAttribute(
    "transform",
    `translate(${50 + x} ${50 + y}) scale(${scale}) translate(-50 -50)`,
  );
}

function setSplitButton(visible) {
  ui.splitBtn.hidden = !visible;
  ui.stackFrame.classList.toggle("is-revealed", visible);
}

function setEdgeOpacity(value) {
  ui.stack.style.setProperty("--edge-opacity", String(value));
}

function stopSplit() {
  splitToken += 1;
  cancelAnimationFrame(splitFrame);
  splitFrame = 0;
  [...ui.pieces.children].forEach((piece) => piece.removeAttribute("transform"));
  setEdgeOpacity(1);
}

function playSplit(auto) {
  if (auto && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setEdgeOpacity(0);
    return;
  }
  const pieces = landPieces();
  if (pieces.length < 2) return;
  const targets = spreadFor(pieces.length);
  const token = ++splitToken;
  cancelAnimationFrame(splitFrame);
  const separate = 700;
  const hold = 520;
  const back = 820;
  const total = separate + hold + back;
  const started = performance.now();
  setEdgeOpacity(1);
  const step = (now) => {
    if (token !== splitToken) return;
    const elapsed = now - started;
    let spread;
    if (elapsed <= separate) spread = easeOutCubic(elapsed / separate);
    else if (elapsed <= separate + hold) spread = 1;
    else if (elapsed < total) spread = 1 - easeInOutCubic((elapsed - separate - hold) / back);
    else spread = 0;
    const backT = elapsed <= separate + hold ? 0 : Math.min(1, (elapsed - separate - hold) / back);
    const edge = backT < 0.42 ? 1 : 1 - easeInOutCubic((backT - 0.42) / 0.58);
    setEdgeOpacity(elapsed >= total ? 0 : edge);
    pieces.forEach((piece, i) => {
      const target = targets[i];
      placeCountry(
        piece,
        target.x * spread,
        target.y * spread,
        1 + (target.scale - 1) * spread,
      );
    });
    if (elapsed < total) splitFrame = requestAnimationFrame(step);
  };
  splitFrame = requestAnimationFrame(step);
}

function renderRound() {
  const round = rounds[index];
  locked = false;
  ui.kicker.textContent = `Manche ${index + 1} / ${rounds.length}`;
  ui.scoreLine.textContent = `Score ${pointsSoFar()}`;
  ui.askLabel.textContent = encoreText(round.entities.length);
  ui.ask.hidden = false;
  ui.form.hidden = false;
  ui.feedback.hidden = true;
  ui.feedback.classList.remove("is-miss");
  ui.guess.value = "";
  ui.guess.placeholder = PLACEHOLDER[settings.territory];
  setHint("", "");
  showSuggestions([]);
  stopSplit();
  setSplitButton(false);
  drawRound(round);
  renderHistory();
  scheduleFit();
  startRoundTimer();
  ui.guess.focus({ preventScroll: true });
}

function closeRound(kind) {
  if (locked) return;
  locked = true;
  stopRoundTimer();
  ui.timerBlock.hidden = true;
  const round = rounds[index];
  round.closed = true;
  round.timedOut = kind === "timeout";
  ui.ask.hidden = true;
  ui.form.hidden = true;
  showSuggestions([]);
  ui.feedback.hidden = false;
  ui.feedback.classList.toggle("is-miss", kind === "timeout");
  if (kind === "complete") {
    ui.feedbackKicker.textContent = "Bravo !";
    const word = territoryWord(round.entities.length);
    ui.feedbackDetail.textContent = `Les ${word} empilés étaient bien ${joinNames(round.entities)}.`;
  } else {
    const missed = round.entities.filter((item) => !round.foundIds.includes(item.id));
    missed.forEach((item) => markEdge(item.id, "is-missed"));
    ui.feedbackKicker.textContent = "Temps écoulé";
    ui.feedbackDetail.textContent = `${pointPhrase(round.foundIds.length)}. Il manquait ${joinNames(missed)}.`;
  }
  ui.next.textContent = index >= rounds.length - 1 ? "Voir le score" : "Manche suivante";
  ui.scoreLine.textContent = `Score ${pointsSoFar()}`;
  renderHistory();
  setSplitButton(true);
  playSplit(true);
  if (document.activeElement === ui.guess) ui.guess.blur();
  scheduleFit();
  ui.next.focus({ preventScroll: true });
}

function submitGuess(entity) {
  if (locked) return;
  showSuggestions([]);
  const round = rounds[index];
  if (!entity) {
    setHint("bad", UNKNOWN[settings.territory]);
    shakeField();
    ui.guess.select();
    return;
  }
  if (round.foundIds.includes(entity.id)) {
    setHint("soft", "Déjà trouvé.");
    ui.guess.select();
    return;
  }
  if (!round.entities.some((item) => item.id === entity.id)) {
    setHint("bad", "Pas dans le tas.");
    shakeField();
    ui.guess.select();
    return;
  }
  round.foundIds.push(entity.id);
  markEdge(entity.id, "is-found");
  ui.guess.value = "";
  showSuggestions([]);
  ui.scoreLine.textContent = `Score ${pointsSoFar()}`;
  const left = round.entities.length - round.foundIds.length;
  if (left === 0) {
    closeRound("complete");
    return;
  }
  setHint("hit", `Bravo ! Il y avait effectivement ${articleName(entity)}.`);
  ui.askLabel.textContent = encoreText(left);
  ui.guess.focus({ preventScroll: true });
}

function modeLabel() {
  return `${TERRITORY_LABEL[settings.territory]} · ${DIFF_LABEL[settings.difficulty]} · ${settings.length} manches · ${PACE_LABEL[settings.ms]}`;
}

function ordinal(rank) {
  return rank === 1 ? "1er" : `${rank}e`;
}

function boardOrigin() {
  if (location.hostname === "127.0.0.1" || location.hostname === "localhost") return "http://127.0.0.1:8787";
  return BOARD_ORIGIN;
}

function boardQuery(name) {
  const params = new URLSearchParams({
    territory: settings.territory,
    length: String(settings.length),
    pace: String(settings.ms),
    difficulty: settings.difficulty,
  });
  if (name) params.set("name", name);
  return `${boardOrigin()}/scores?${params}`;
}

function paintBoard(data) {
  ui.boardList.replaceChildren();
  (data.entries || []).forEach((entry) => {
    const li = document.createElement("li");
    if (entry.yours) li.className = "is-you";
    const rank = document.createElement("span");
    rank.className = "board-rank";
    rank.textContent = ordinal(entry.rank);
    const name = document.createElement("span");
    name.className = "board-name";
    name.textContent = entry.name;
    const score = document.createElement("span");
    score.className = "board-score";
    score.textContent = String(entry.score);
    li.append(rank, name, score);
    ui.boardList.append(li);
  });
}

function boardMessage(data, status) {
  if (!data.total) return "Personne n’a encore enregistré de score sur ce mode.";
  if (!data.rank) return `${data.total} score${data.total > 1 ? "s" : ""} sur ce mode.`;
  const place = `Tu es ${ordinal(data.rank)} sur ${data.total}.`;
  if (status === "created") return `Score enregistré. ${place}`;
  if (status === "improved") return `Nouveau record. ${place}`;
  if (status === "kept") return `Ton meilleur score reste ${data.best}. ${place}`;
  return place;
}

async function loadBoard() {
  ui.boardMode.textContent = modeLabel();
  const name = ui.boardName.value.trim();
  try {
    const response = await fetch(boardQuery(name), { signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(String(response.status));
    const data = await response.json();
    paintBoard(data);
    ui.boardNote.textContent = boardMessage(data);
  } catch {
    ui.boardList.replaceChildren();
    ui.boardNote.textContent = "Le classement ne répond pas pour le moment.";
  }
}

async function saveBoard(event) {
  event.preventDefault();
  const name = ui.boardName.value.trim();
  const score = pointsSoFar();
  if (!name) {
    ui.boardNote.textContent = "Indique un pseudo.";
    return;
  }
  ui.boardSave.disabled = true;
  try {
    const response = await fetch(`${boardOrigin()}/scores`, {
      signal: AbortSignal.timeout(8000),
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name,
        score,
        territory: settings.territory,
        length: settings.length,
        pace: settings.ms,
        difficulty: settings.difficulty,
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (response.status === 400 && data.error === "pseudo") {
      ui.boardNote.textContent = "Deux caractères minimum, sans symbole bizarre.";
      return;
    }
    if (!response.ok) throw new Error(String(response.status));
    try { localStorage.setItem(BOARD_NAME_KEY, name); } catch { /* mode privé */ }
    paintBoard(data);
    ui.boardNote.textContent = boardMessage(data, data.status);
  } catch {
    ui.boardNote.textContent = "Le classement ne répond pas pour le moment.";
  } finally {
    ui.boardSave.disabled = false;
  }
}

function finish() {
  stopRoundTimer();
  stopSplit();
  setSplitButton(false);
  ui.timerBlock.hidden = true;
  ui.dock.hidden = true;
  ui.stage.hidden = true;
  ui.chrome.hidden = true;
  ui.historyWrap.hidden = true;
  const total = pointsSoFar();
  const max = rounds.reduce((sum, round) => sum + round.entities.length, 0);
  ui.finalScore.textContent = `${total} / ${max}`;
  ui.finishPace.textContent = `${TERRITORY_LABEL[settings.territory]} · ${DIFF_LABEL[settings.difficulty]} · ${PACE_LABEL[settings.ms]}`;
  ui.recap.innerHTML = rounds.map((round, roundIndex) => {
    const got = round.foundIds.length;
    const maxRound = round.entities.length;
    const miss = got < maxRound;
    const missed = round.entities.filter((item) => !round.foundIds.includes(item.id));
    const detail = miss ? `<p class="finish-recap-detail">Il manquait ${escapeHtml(joinNames(missed))}.</p>` : "";
    return `<li>
      <p class="finish-recap-name">Manche ${roundIndex + 1} · ${escapeHtml(round.entities.map((item) => item.name).join(", "))}</p>
      <p class="finish-recap-score${miss ? " is-miss" : ""}">${got} / ${maxRound}</p>
      ${detail}
    </li>`;
  }).join("");
  ui.finish.hidden = false;
  if (!ui.boardName.value) {
    try { ui.boardName.value = localStorage.getItem(BOARD_NAME_KEY) || ""; } catch { /* mode privé */ }
  }
  loadBoard();
}

function startGame() {
  const pool = catalogs[settings.territory];
  const groups = dealRounds(pool, settings.length, stackSize());
  if (!groups || groups.length < settings.length) {
    ui.start.disabled = false;
    ui.start.textContent = "Je me lance";
    ui.intro.hidden = false;
    ui.chrome.hidden = true;
    ui.dock.hidden = true;
    ui.guess.blur();
    ui.lead.textContent = "Pas assez de territoires pour cette partie.";
    return;
  }
  rounds = groups.map((entities) => ({
    entities: shuffle(entities),
    foundIds: [],
    closed: false,
    timedOut: false,
  }));
  index = 0;
  ui.intro.hidden = true;
  ui.finish.hidden = true;
  ui.chrome.hidden = false;
  ui.stage.hidden = false;
  ui.dock.hidden = false;
  ui.historyWrap.hidden = true;
  renderRound();
}

function retainTypingFocus(button) {
  let touched = false;
  button.addEventListener("mousedown", (event) => {
    event.preventDefault();
  });
  button.addEventListener("touchstart", (event) => {
    event.preventDefault();
  }, { passive: false });
  button.addEventListener("touchend", (event) => {
    event.preventDefault();
    touched = true;
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    window.setTimeout(() => { touched = false; }, 500);
  });
  button.addEventListener("click", (event) => {
    if (!touched || !event.isTrusted) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);
}

function bindSettings() {
  document.querySelectorAll("[data-territory]").forEach((button) => {
    button.addEventListener("click", () => {
      settings.territory = button.dataset.territory;
      setPressed("[data-territory]", "territory", settings.territory);
      refreshIntro();
    });
  });
  document.querySelectorAll("[data-length]").forEach((button) => {
    button.addEventListener("click", () => {
      settings.length = Number(button.dataset.length);
      setPressed("[data-length]", "length", String(settings.length));
    });
  });
  document.querySelectorAll("[data-difficulty]").forEach((button) => {
    button.addEventListener("click", () => {
      settings.difficulty = button.dataset.difficulty;
      setPressed("[data-difficulty]", "difficulty", settings.difficulty);
      refreshIntro();
    });
  });
  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      settings.ms = Number(button.dataset.ms);
      setPressed("[data-ms]", "ms", String(settings.ms));
      refreshIntro();
    });
  });
  refreshIntro();
  ui.start.addEventListener("click", () => {
    if (ui.start.disabled) return;
    ui.start.disabled = true;
    ui.start.textContent = "Ça s’empile…";
    ui.intro.hidden = true;
    ui.chrome.hidden = false;
    ui.dock.hidden = false;
    ui.form.hidden = false;
    ui.ask.hidden = false;
    ui.guess.focus({ preventScroll: true });
    window.setTimeout(() => {
      startGame();
      ui.start.disabled = false;
      ui.start.textContent = "Je me lance";
    }, 40);
  });
  retainTypingFocus(ui.validate);
  ui.next.addEventListener("click", () => {
    if (index >= rounds.length - 1) finish();
    else {
      index += 1;
      renderRound();
    }
  });
  ui.splitBtn.addEventListener("click", () => {
    if (ui.splitBtn.hidden) return;
    playSplit(false);
  });
  ui.boardForm.addEventListener("submit", saveBoard);
  ui.replay.addEventListener("click", () => {
    stopRoundTimer();
    stopSplit();
    setSplitButton(false);
    ui.finish.hidden = true;
    ui.chrome.hidden = true;
    ui.historyWrap.hidden = true;
    ui.stage.hidden = true;
    ui.dock.hidden = true;
    ui.timerBlock.hidden = true;
    ui.intro.hidden = false;
    refreshIntro();
  });
  ui.form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (ignoreSubmit) {
      ignoreSubmit = false;
      return;
    }
    if (locked) return;
    const typed = ui.guess.value.trim();
    if (!typed) return;
    const picked = !ui.suggest.hidden && suggestItems[suggestIndex] ? suggestItems[suggestIndex] : null;
    if (picked) submitGuess(picked);
    else {
      const resolved = resolveGuess(typed);
      if (resolved) submitGuess(resolved);
      else submitGuess(null);
    }
  });
  ui.guess.addEventListener("input", () => {
    if (ui.hint.textContent) setHint("", "");
    showSuggestions(suggestionsFor(ui.guess.value));
  });
  ui.guess.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveSuggestion(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      moveSuggestion(-1);
    } else if (event.key === "Escape") {
      showSuggestions([]);
    }
  });
  ui.suggest.addEventListener("pointerover", (event) => {
    const li = event.target.closest("li");
    if (!li || ui.suggest.hidden) return;
    const itemIndex = Number(li.dataset.i);
    if (!suggestItems[itemIndex]) return;
    suggestIndex = itemIndex;
    [...ui.suggest.children].forEach((row, i) => {
      row.classList.toggle("is-active", i === suggestIndex);
    });
  });
  ui.suggest.addEventListener("mousedown", (event) => {
    const li = event.target.closest("li");
    if (!li) return;
    event.preventDefault();
    const item = suggestItems[Number(li.dataset.i)];
    if (!item) return;
    suggestIndex = Number(li.dataset.i);
    ignoreSubmit = true;
    window.setTimeout(() => { ignoreSubmit = false; }, 400);
    ui.guess.value = item.name;
    submitGuess(item);
  });
  ui.suggest.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
}

function fitPlayfield() {
  const viewport = window.visualViewport;
  const top = viewport ? viewport.offsetTop : 0;
  const height = viewport ? viewport.height : window.innerHeight;
  const root = document.documentElement;
  const focused = document.activeElement === ui.guess;
  const shrunk = fullHeight - height > 120;
  const keyboard = shrunk && (focused || root.classList.contains("is-keyboard"));
  if (!keyboard) fullHeight = Math.max(window.innerHeight, height);
  root.classList.toggle("is-keyboard", keyboard);
  root.style.setProperty("--vv-top", `${top}px`);
  root.style.setProperty("--vv-height", `${height}px`);
  const dockH = ui.dock && !ui.dock.hidden ? ui.dock.offsetHeight : 0;
  root.style.setProperty("--dock-h", `${dockH || 148}px`);
  if (window.scrollX || window.scrollY) window.scrollTo(0, 0);
}

function scheduleFit() {
  cancelAnimationFrame(fitFrame);
  fitFrame = requestAnimationFrame(fitPlayfield);
}

function bindViewport() {
  const viewport = window.visualViewport;
  if (viewport) {
    viewport.addEventListener("resize", scheduleFit);
    viewport.addEventListener("scroll", scheduleFit);
  }
  window.addEventListener("resize", scheduleFit);
  if ("ResizeObserver" in window) new ResizeObserver(scheduleFit).observe(ui.dock);
  ui.guess.addEventListener("focus", () => {
    window.scrollTo(0, 0);
    scheduleFit();
  });
  ui.guess.addEventListener("blur", scheduleFit);
  scheduleFit();
}

function setProgress(ratio) {
  const value = Math.max(0, Math.min(100, Math.round(ratio * 100)));
  ui.loadFill.style.width = `${value}%`;
  ui.loadFill.parentElement.setAttribute("aria-valuenow", String(value));
}

async function loadJson(url, from, to) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(url);
  const total = Number(response.headers.get("content-length")) || 0;
  const reader = response.body && response.body.getReader();
  if (!reader) {
    setProgress(to);
    return response.json();
  }
  const chunks = [];
  let received = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    received += value.length;
    const intra = total ? received / total : 1;
    setProgress(from + (to - from) * intra);
  }
  const buffer = new Uint8Array(received);
  let offset = 0;
  chunks.forEach((chunk) => {
    buffer.set(chunk, offset);
    offset += chunk.length;
  });
  return JSON.parse(new TextDecoder().decode(buffer));
}

async function boot() {
  bindSettings();
  bindViewport();
  try {
    const world = await loadJson(DATA.world, 0, 0.72);
    const us = await loadJson(DATA.us, 0.72, 0.9);
    setProgress(0.94);
    catalogs = {
      world: worldEntities(world),
      us: usEntities(us),
    };
    const missingWorld = catalogs.world.filter((item) => !Object.prototype.hasOwnProperty.call(WORLD_ARTICLE, item.name));
    const missingUs = catalogs.us.filter((item) => !Object.prototype.hasOwnProperty.call(US_ARTICLE, item.name));
    if (missingWorld.length || missingUs.length) {
      console.warn("déterminants manquants", missingWorld.map((item) => item.name), missingUs.map((item) => item.name));
    }
    if (catalogs.world.length < 120 || catalogs.us.length < 48) {
      throw new Error(`catalogue incomplet ${catalogs.world.length} ${catalogs.us.length}`);
    }
    setProgress(1);
    ui.load.classList.add("is-done");
    ui.load.setAttribute("aria-busy", "false");
    ui.intro.hidden = false;
    window.setTimeout(() => { ui.load.hidden = true; }, 500);
  } catch (error) {
    ui.loadText.textContent = "Le chargement des cartes a échoué.";
    console.error(error);
  }
}

boot();
