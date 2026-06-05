import { X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";

export function DiscountBanner() {
  const [visible, setVisible] = useState(true);
  const { lang } = useLanguage();
  const isDE = lang === "de";

  if (!visible) return null;

  return (
    <div className="discount-banner">
      <div className="discount-banner__glow" />

      <div className="discount-banner__content">
        <span className="discount-banner__label">
          {isDE ? "Studentenrabatt" : "Student drop"}
        </span>

        <span className="discount-banner__text-short">
          15% off · REFILL15
        </span>
        <p className="discount-banner__text">
          {isDE
            ? <>15% auf dein erstes Nachfüll-Setup mit Code <strong>REFILL15</strong></>
            : <>15% off your first refill setup with code <strong>REFILL15</strong></>}
        </p>

        <a href="/shop#starter" className="discount-banner__button">
          {isDE ? "Jetzt kaufen" : "Shop now"}
        </a>

        <button
          type="button"
          onClick={() => setVisible(false)}
          className="discount-banner__close"
          aria-label="Close discount banner"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
