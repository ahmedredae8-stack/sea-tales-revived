import { CaptainAvatar, nameSeed } from "@/components/GameSprite";

type Props = {
  name: string;
  avatar?: number;
  level?: number;
  progress?: number;
  coins?: number;
  gems?: number;
  pearls?: number;
  fishFound?: number;
  fishTotal?: number;
  onAvatarClick?: () => void;
};

/** Premium top bar: captain crest on one side, gold and resources on the other. */
export function TopHud({
  name,
  avatar,
  level = 12,
  progress = 0.62,
  coins = 125680,
  gems = 2450,
  pearls = 1280,
  fishFound = 27,
  fishTotal = 40,
  onAvatarClick,
}: Props) {
  const seed = avatar ?? nameSeed(name);
  const fmt = (n: number) => (n >= 10000 ? `${Math.round(n / 1000)}K` : n.toLocaleString("en-US"));

  const values = [
    { key: "coin", icon: "/__l5e/assets-v1/906f37c0-d530-4e50-a3ce-00deaaf40a02/coin.png", text: fmt(coins), tone: "gold" },
    { key: "gem", icon: "/__l5e/assets-v1/81b9318d-8399-478f-bd28-abec7665a1a6/gem.png", text: fmt(gems), tone: "gem" },
    { key: "pearl", icon: "/__l5e/assets-v1/4b0616ca-5528-47ea-8c87-3ea157b6de3e/fish-pearl.png", text: fmt(pearls), tone: "pearl" },
    { key: "fish", icon: "/__l5e/assets-v1/d40f7c1c-8c7f-47ec-89a0-120eaa992bde/fish-tuna.png", text: `${fishFound}/${fishTotal}`, tone: "fish" },
  ];

  return (
    <div className="hud-bar" dir="ltr">
      <button type="button" className="hud-player" onClick={onAvatarClick} aria-label="حساب القبطان">
        <span className="hud-avatar">
          <CaptainAvatar seed={seed} className="hud-avatar-art" />
          <span className="hud-lvl">{level}</span>
        </span>
        <span className="hud-id">
          <span className="hud-name">{name}</span>
          <span className="hud-level">
            <i style={{ width: `${Math.round(progress * 100)}%` }} />
          </span>
        </span>
      </button>

      <div className="hud-values">
        {values.map((v) => (
          <div key={v.key} className={`hud-slot hud-slot-${v.tone}`}>
            <img src={v.icon} alt="" className="hud-ico" draggable={false} />
            <span className="hud-num">{v.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
