import hoodieImg from '../components/img/members/minji/minji-photoshoot_-_corduroy jacket.jpg';
import cargoImg from '../components/img/members/danielle/danielle-shop-photos_-_blue-white-red-triple-flanel-shirt.jpg';
import teeImg from '../components/img/members/yujin/yujin-apparel-shot_-_white-art-printed-tshirt.jpg';
import vinylImg from '../components/img/members/minji/minji-atmos-philosophy-cd-visual-unit.jpg';

export const products = [
  {
    id: 1,
    name: "ARCHITECTURAL HOODIE_V1",
    category: "APPAREL",
    price: 125.0,
    priceStr: "$125.00",
    mandate: "Thermal regulation & silhouette stability. Heavyweight cotton with a structured, architectural drape.",
    details: {
      material: "100% HEAVY COTTON / 500 GSM",
      sizing: "BOXY FIT / OVERSIZED",
      care: "COLD WASH / AIR DRY"
    },
    img: hoodieImg
  },
  {
    id: 2,
    name: "KINETIC CARGO_SYSTEM",
    category: "APPAREL",
    price: 185.0,
    priceStr: "$185.00",
    mandate: "High-mobility urban utility. Reinforced articulated knees and multi-plane storage architecture.",
    details: {
      material: "NYLON TECH-BLEND / WATER REPELLENT",
      sizing: "ADJUSTABLE WAIST / TAPERED",
      care: "DRY CLEAN RECOMMENDED"
    },
    img: cargoImg
  },
  {
    id: 3,
    name: "SYSTEM_LOGO TEE",
    category: "APPAREL",
    price: 55.0,
    priceStr: "$55.00",
    mandate: "Sensory comfort & visual identity. Premium jersey with high-fidelity embroidery.",
    details: {
      material: "SUPIMA COTTON / 250 GSM",
      sizing: "TRUE TO SIZE",
      care: "WASH AT 30°C"
    },
    img: teeImg
  },
  {
    id: 4,
    name: "UNRAW_SYNCHRONIZER VINYL",
    category: "AUDIO",
    price: 45.0,
    priceStr: "$45.00",
    mandate: "Pitch-perfect auditory reproduction. 180g heavy-set vinyl in high-momentum black.",
    details: {
      material: "180G AUDIOPHILE VINYL",
      sizing: "12 INCH / 33 RPM",
      care: "HANDLE WITH CARE"
    },
    img: vinylImg
  }
];
