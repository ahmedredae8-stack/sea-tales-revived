import boat1Idle from "@/assets/fleet/boat-1-idle.png";
import boat1Cast from "@/assets/fleet/boat-1-cast.png";
import boat1Submerged from "@/assets/fleet/boat-1-submerged.png";
import boat1Haul from "@/assets/fleet/boat-1-haul.png";
import shipIdle from "@/assets/ships/ship-v2-idle.png.asset.json";
import shipCast from "@/assets/ships/ship-v2-cast.png.asset.json";
import shipHaul from "@/assets/ships/ship-v2-haul.png.asset.json";
import shipSubmerged from "@/assets/ships/ship-v2-submerged.png.asset.json";

/** The four drawn poses every hull in the fleet must ship with. */
export type PoseSet = {
  idle: string;
  cast: string;
  submerged: string;
  haul: string;
};

export type FleetShip = {
  id: number;
  name: string;
  /** Species this hull pulls up. */
  fish: string[];
  /** Full trip length in seconds, with no crew aboard. */
  tripSeconds: number;
  source: "store" | "tribe";
  poses: PoseSet;
  /** True once bespoke artwork exists for all four poses. */
  drawn: boolean;
};

/** Placeholder art until each hull gets its own four poses drawn. */
const fallback: PoseSet = {
  idle: shipIdle.url,
  cast: shipCast.url,
  submerged: shipSubmerged.url,
  haul: shipHaul.url,
};

const boat1: PoseSet = {
  idle: boat1Idle,
  cast: boat1Cast,
  submerged: boat1Submerged,
  haul: boat1Haul,
};

export const fleetCatalog: FleetShip[] = [
  { id: 1, name: "قارب صغير", fish: ["سردين"], tripSeconds: 30, source: "store", poses: boat1, drawn: true },
  { id: 2, name: "لنش", fish: ["سردين"], tripSeconds: 50, source: "store", poses: fallback, drawn: false },
  { id: 3, name: "مركب", fish: ["سردين", "قد"], tripSeconds: 90, source: "store", poses: fallback, drawn: false },
  { id: 4, name: "مركب سريع", fish: ["حفش", "محار"], tripSeconds: 120, source: "store", poses: fallback, drawn: false },
  { id: 5, name: "مركب شراعي", fish: ["محار", "سلور"], tripSeconds: 180, source: "store", poses: fallback, drawn: false },
  { id: 6, name: "سفينة شراعية", fish: ["قد", "دنيس"], tripSeconds: 240, source: "store", poses: fallback, drawn: false },
  { id: 7, name: "سفينة صيد", fish: ["مفلطح", "سلمون"], tripSeconds: 360, source: "store", poses: fallback, drawn: false },
  { id: 8, name: "سفينة صيد كبيرة", fish: ["سلمون", "كريل"], tripSeconds: 600, source: "store", poses: fallback, drawn: false },
  { id: 9, name: "مركب كمين", fish: ["سرطان البحر", "قد"], tripSeconds: 900, source: "store", poses: fallback, drawn: false },
  { id: 10, name: "يخت", fish: ["سلمون", "سلطعون"], tripSeconds: 1080, source: "store", poses: fallback, drawn: false },
  { id: 11, name: "مركب متقدم", fish: ["سمك نهري", "مفلطح"], tripSeconds: 1320, source: "store", poses: fallback, drawn: false },
  { id: 12, name: "مركب ثلجي", fish: ["حبار", "ثعبان البحر"], tripSeconds: 1500, source: "store", poses: fallback, drawn: false },
  { id: 13, name: "حفارة", fish: ["مانتا راي", "حبار"], tripSeconds: 1800, source: "store", poses: fallback, drawn: false },
  { id: 14, name: "معرض البحرية", fish: ["سلور", "مانتا راي"], tripSeconds: 2100, source: "store", poses: fallback, drawn: false },
  { id: 15, name: "مركز أبحاث السفن", fish: ["جراد البحر", "سمكة الأفعى"], tripSeconds: 2400, source: "store", poses: fallback, drawn: false },
  { id: 16, name: "غواصة", fish: ["الحوت الصيني", "الحوت القاتل"], tripSeconds: 3000, source: "store", poses: fallback, drawn: false },
  { id: 17, name: "ريح", fish: ["سردين", "شمس المحيط"], tripSeconds: 30, source: "tribe", poses: fallback, drawn: false },
  { id: 18, name: "نار", fish: ["سردين", "التونة الوثابة"], tripSeconds: 30, source: "tribe", poses: fallback, drawn: false },
  { id: 19, name: "برق", fish: ["سردين", "مكاريل"], tripSeconds: 30, source: "tribe", poses: fallback, drawn: false },
];

export const starterShip = fleetCatalog[0]!;

/** "1د 30ث" style trip label. */
export function tripLabel(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (!m) return `${s}ث`;
  return s ? `${m}د ${s}ث` : `${m}د`;
}
