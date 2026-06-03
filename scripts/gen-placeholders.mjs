// Generates tasteful dark placeholder assets so the site looks intentional
// out of the box. Pedro replaces these files with the real photo/screenshots.
import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const ensure = (p) => mkdirSync(dirname(p), { recursive: true });

// ---------- PNG encoder (RGB, 8-bit) ----------
const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "latin1");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}
function encodePng(w, h, rgb) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type RGB
  const raw = Buffer.alloc(h * (w * 3 + 1));
  for (let y = 0; y < h; y++) {
    raw[y * (w * 3 + 1)] = 0; // filter: none
    rgb.copy(raw, y * (w * 3 + 1) + 1, y * w * 3, (y + 1) * w * 3);
  }
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// ---------- drawing helpers ----------
const clamp = (v, a = 0, b = 255) => Math.max(a, Math.min(b, v));
function buffer(w, h, base = [6, 7, 10]) {
  const b = Buffer.alloc(w * h * 3);
  for (let i = 0; i < w * h; i++) {
    b[i * 3] = base[0];
    b[i * 3 + 1] = base[1];
    b[i * 3 + 2] = base[2];
  }
  return b;
}
const set = (b, w, x, y, c) => {
  if (x < 0 || y < 0 || x >= w) return;
  const i = (y * w + x) * 3;
  if (i + 2 >= b.length) return;
  b[i] = clamp(c[0]);
  b[i + 1] = clamp(c[1]);
  b[i + 2] = clamp(c[2]);
};
function rect(b, w, h, x0, y0, x1, y1, c) {
  for (let y = Math.max(0, y0 | 0); y < Math.min(h, y1 | 0); y++)
    for (let x = Math.max(0, x0 | 0); x < Math.min(w, x1 | 0); x++) set(b, w, x, y, c);
}
function glow(b, w, h, cx, cy, radius, color, strength = 0.85) {
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const d = Math.hypot(x - cx, y - cy) / radius;
      let g = Math.max(0, 1 - d);
      g = g * g * strength;
      if (g <= 0) continue;
      const i = (y * w + x) * 3;
      b[i] = clamp(b[i] + (color[0] - b[i]) * g);
      b[i + 1] = clamp(b[i + 1] + (color[1] - b[i + 1]) * g);
      b[i + 2] = clamp(b[i + 2] + (color[2] - b[i + 2]) * g);
    }
}
function ring(b, w, h, cx, cy, r, thick, color) {
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const d = Math.hypot(x - cx, y - cy);
      if (d > r - thick && d < r) set(b, w, x, y, color);
    }
}

const ACCENT = [45, 107, 255];
const CYAN = [30, 160, 255];
const SURFACE = [20, 24, 31];
const PANEL = [10, 12, 16];

// ---------- HERO portrait placeholder ----------
function hero() {
  const w = 880,
    h = 1100;
  const b = buffer(w, h, [8, 10, 16]);
  glow(b, w, h, w * 0.6, h * 0.42, h * 0.62, ACCENT, 0.7);
  glow(b, w, h, w * 0.4, h * 0.85, h * 0.4, CYAN, 0.25);
  // vignette
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const dx = (x - w / 2) / (w / 2);
      const dy = (y - h / 2) / (h / 2);
      const v = Math.max(0, Math.hypot(dx, dy) - 0.7) * 0.9;
      if (v <= 0) continue;
      const i = (y * w + x) * 3;
      b[i] = clamp(b[i] * (1 - v));
      b[i + 1] = clamp(b[i + 1] * (1 - v));
      b[i + 2] = clamp(b[i + 2] * (1 - v));
    }
  return { w, h, b, path: "public/hero/pedro-kelvin.png" };
}

// ---------- App screenshot mock ----------
function appMock(path, style) {
  const w = 1280,
    h = 800;
  const b = buffer(w, h, [13, 16, 21]);
  glow(b, w, h, w * 0.8, 0, h * 0.9, ACCENT, 0.25);
  // top bar
  rect(b, w, h, 0, 0, w, 64, PANEL);
  rect(b, w, h, 28, 26, 120, 38, SURFACE);
  // sidebar
  rect(b, w, h, 0, 64, 250, h, PANEL);
  for (let i = 0; i < 7; i++) {
    rect(b, w, h, 28, 110 + i * 56, 222, 134 + i * 56, i === 1 ? [30, 45, 90] : SURFACE);
  }
  const mx = 290,
    mw = w - mx - 40;
  if (style === "dashboard") {
    // three stat cards
    for (let i = 0; i < 3; i++) {
      const x = mx + i * (mw / 3 + 10);
      rect(b, w, h, x, 110, x + mw / 3 - 20, 240, SURFACE);
    }
    // big chart card + score ring
    rect(b, w, h, mx, 270, w - 40, h - 60, SURFACE);
    ring(b, w, h, w - 220, 470, 96, 16, ACCENT);
    ring(b, w, h, w - 220, 470, 96, 16, ACCENT);
    glow(b, w, h, w - 220, 470, 150, ACCENT, 0.4);
    // bars
    for (let i = 0; i < 6; i++)
      rect(b, w, h, mx + 40 + i * 80, 600 - (i % 3) * 60, mx + 90 + i * 80, 660, [30, 45, 90]);
  } else if (style === "progress") {
    rect(b, w, h, mx, 110, w - 40, h - 60, SURFACE);
    glow(b, w, h, (mx + w - 40) / 2, h * 0.5, 220, ACCENT, 0.5);
    ring(b, w, h, (mx + w - 40) / 2, h * 0.5, 150, 26, ACCENT);
    // legend rows
    for (let i = 0; i < 4; i++)
      rect(b, w, h, mx + 40, 140 + i * 40, mx + 260, 165 + i * 40, PANEL);
  } else {
    // chat
    for (let i = 0; i < 5; i++) {
      const right = i % 2 === 1;
      const bw = 360 + (i % 3) * 80;
      const x0 = right ? w - 40 - bw : mx;
      rect(b, w, h, x0, 120 + i * 110, x0 + bw, 200 + i * 110, right ? [28, 42, 86] : SURFACE);
    }
    rect(b, w, h, mx, h - 110, w - 40, h - 50, PANEL);
  }
  return { w, h, b, path };
}

// ---------- OG image ----------
function og() {
  const w = 1200,
    h = 630;
  const b = buffer(w, h, [6, 7, 10]);
  glow(b, w, h, w * 0.18, h * 0.85, h * 1.1, ACCENT, 0.55);
  glow(b, w, h, w * 0.9, h * 0.1, h * 0.7, CYAN, 0.25);
  rect(b, w, h, 80, h - 90, 280, h - 88, [60, 90, 180]); // hairline
  return { w, h, b, path: "public/og.png" };
}

// ---------- minimal valid PDF ----------
function buildCv() {
  const content =
    "BT /F1 30 Tf 72 760 Td (Pedro Kelvin) Tj " +
    "/F1 14 Tf 0 -30 Td (Engenheiro de Software - Especialista em IA) Tj " +
    "0 -50 Td (Este e um arquivo de exemplo.) Tj " +
    "0 -22 Td (Substitua por seu curriculo em: public/cv/pedro-kelvin-cv.pdf) Tj ET";
  const objs = [
    "<</Type/Catalog/Pages 2 0 R>>",
    "<</Type/Pages/Kids[3 0 R]/Count 1>>",
    "<</Type/Page/Parent 2 0 R/MediaBox[0 0 595 842]/Resources<</Font<</F1 5 0 R>>>>/Contents 4 0 R>>",
    `<</Length ${Buffer.byteLength(content)}>>\nstream\n${content}\nendstream`,
    "<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>",
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [];
  objs.forEach((o, i) => {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const xref = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((o) => (pdf += `${String(o).padStart(10, "0")} 00000 n \n`));
  pdf += `trailer\n<</Size ${objs.length + 1}/Root 1 0 R>>\nstartxref\n${xref}\n%%EOF`;
  const p = resolve(root, "public/cv/pedro-kelvin-cv.pdf");
  ensure(p);
  writeFileSync(p, Buffer.from(pdf, "latin1"));
  console.log("wrote", "public/cv/pedro-kelvin-cv.pdf");
}

// ---------- run ----------
const images = [
  hero(),
  appMock("public/projects/entrevistai.png", "dashboard"),
  appMock("public/projects/certificai.png", "progress"),
  appMock("public/projects/sensetek.png", "chat"),
  og(),
];
for (const im of images) {
  const p = resolve(root, im.path);
  ensure(p);
  writeFileSync(p, encodePng(im.w, im.h, im.b));
  console.log("wrote", im.path);
}
buildCv();
