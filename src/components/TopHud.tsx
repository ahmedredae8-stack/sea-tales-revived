import { CaptainAvatar, nameSeed } from "@/components/GameSprite";
import { Crown, Gift, Plus } from "lucide-react";

type Props = {
  name: string;
  avatar?: number;
  title?: string;
  level?: number;
  progress?: number;
  coins?: number;
  rubies?: number;
  diamonds?: number;
  fishFound?: number;
  fishTotal?: number;
  onAvatarClick?: () => void;
  onGiftClick?: () => void;
  onTopUp?: (kind: "coins" | "rubies" | "diamonds") => void;
};

/** Royal command bar: gilded resource capsules plus the captain's title plate. */
export function TopHud({
  name,
  avatar,
  title = "الملك البحري",
  level = 12,
  progress = 0.62,
  coins = 125680,
  rubies = 2450,
  diamonds = 1280,
  fishFound = 27,
  fishTotal = 40,
  onAvatarClick,
  onGiftClick,
  onTopUp,
}: Props) {
  const seed = avatar ?? nameSeed(name);
  const fmt = (n: number) => n.toLocaleString("en-US");

  const capsules = [
    { key: "coins" as const, tone: "gold", value: fmt(coins), label: "الذهب" },
    { key: "rubies" as const, tone: "ruby", value: fmt(rubies), label: "الياقوت" },
    { key: "diamonds" as const, tone: "sapphire", value: fmt(diamonds), label: "الألماس" },
  ];

  return (
    <div className="royal-hud" dir="rtl">
      <div className="royal-row">
        {capsules.map((c) => (
          <div key={c.key} className={`royal-capsule royal-capsule-${c.tone}`}>
            <span className={`royal-orb royal-orb-${c.tone}`} aria-hidden="true" />
            <span className="royal-value">{c.value}</span>
            <button
              type="button"
              className="royal-plus"
              aria-label={`شحن ${c.label}`}
              onClick={() => onTopUp?.(c.key)}
            >
              <Plus aria-hidden="true" />
            </button>
          </div>
        ))}

        <div className="royal-capsule royal-capsule-fish">
          <span className="royal-orb royal-orb-fish" aria-hidden="true" />
          <span className="royal-fish-stack">
            <span className="royal-value">
              {fishFound}/{fishTotal}
            </span>
            <span className="royal-caption">نوع مستكشف</span>
          </span>
        </div>
      </div>

      <div className="royal-row royal-row-lower">
        <button type="button" className="royal-tile royal-gift" aria-label="الهدايا" onClick={onGiftClick}>
          <Gift aria-hidden="true" />
        </button>

        <button type="button" className="royal-tile royal-face" aria-label="حساب القبطان" onClick={onAvatarClick}>
          <CaptainAvatar seed={seed} className="royal-face-art" />
          <span className="royal-face-plus" aria-hidden="true">
            <Plus />
          </span>
        </button>

        <div className="royal-plate">
          <span className="royal-plate-top">
            <Crown aria-hidden="true" />
            <span>اللاعب</span>
          </span>
          <strong className="royal-plate-name">{title}</strong>
          <span className="royal-plate-sub">{name} · المستوى {level}</span>
          <span className="royal-xp">
            <i style={{ width: `${Math.round(progress * 100)}%` }} />
          </span>
        </div>
      </div>
    </div>
  );
}
