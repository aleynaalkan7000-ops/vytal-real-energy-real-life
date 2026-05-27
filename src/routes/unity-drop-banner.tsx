import { Link } from "@tanstack/react-router";

export function UnityDropBanner() {
  return (
    <div className="unity-drop-banner">
      <div className="unity-drop-banner__glow" />

      <span className="unity-drop-banner__tag">
        LIMITED DROP
      </span>

      <p className="unity-drop-banner__text">
        UNITY Bottle now available — translucent collector edition.
      </p>

     <Link
        to="/shop"
        hash="unity"
        className="unity-drop-banner__button"
        >
        View drop →
    </Link>
    </div>
  );
}