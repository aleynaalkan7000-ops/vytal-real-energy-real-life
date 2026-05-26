import { X } from "lucide-react";
import { useState } from "react";

export function DiscountBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="discount-banner">
      <div className="discount-banner__glow" />

      <div className="discount-banner__content">
        <span className="discount-banner__label">Student drop</span>

        <p className="discount-banner__text">
          15% off your first refill setup with code{" "}
          <strong>REFILL15</strong>
        </p>

        <a href="/shop#starter" className="discount-banner__button">
          Shop now
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