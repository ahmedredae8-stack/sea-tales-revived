import { CaptainAvatar, nameSeed } from "@/components/GameSprite";
import { Crown, Gift, Plus } from "lucide-react";

const coinArt = { url: "/__l5e/assets-v1/906f37c0-d530-4e50-a3ce-00deaaf40a02/coin.png" };
const gemArt = { url: "/__l5e/assets-v1/81b9318d-8399-478f-bd28-abec7665a1a6/gem.png" };
const fishArt = { url: "/__l5e/assets-v1/d40f7c1c-8c7f-47ec-89a0-120eaa992bde/fish-tuna.png" };

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
    { key: "coins" as const, tone: "gold", value: fmt(coins), label: "الذهب", art: coinArt.url },
    { key: "rubies" as const, tone: "ruby", value: fmt(rubies), label: "الياقوت", art: gemArt.url },
    { key: "diamonds" as const, tone: "sapphire", value: fmt(diamonds), label: "الألماس", art: gemArt.url },
  ];

  return (
    <div className="royal-hud" dir="rtl">
      <div className="royal-row">
        {capsules.map((c) => (
          <div
            key={c.key}
            className={`royal-capsule royal-capsule-${c.tone}`}
            role="button"
            tabIndex={0}
            onClick={() => onTopUp?.(c.key)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onTopUp?.(c.key); }}
          >
            <img className={`royal-icon royal-icon-${c.tone}`} src={c.art} alt="" aria-hidden="true" />
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
          <img className="royal-icon" src={fishArt.url} alt="" aria-hidden="true" />
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
