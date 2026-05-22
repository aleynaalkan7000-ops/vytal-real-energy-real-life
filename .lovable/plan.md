# VYTAL Premium Webshop — Build Plan

This is a large, multi-system build. To ship it well (and not as a fragile mega-edit), I'll deliver it in **3 phases**. Each phase is fully functional on its own. You approve phase 1, I build it, then we move on.

---

## Phase 1 — Cinematic Shop Front + Cart (no backend yet)

Pure frontend. Ships immediately, no Cloud needed.

**Shop page redesign (`/shop`)**
- Hero with product **visible above the fold** (bottle + floating tablets, atmospheric lighting, grain overlay, slow parallax)
- Headline "Built for calmer focus." + 3 CTAs
- Denser, rhythm-driven product grid (asymmetric editorial layout, hover lift, light sweep, soft zoom)
- Ambient moving gradient + subtle noise across the whole page

**Product detail page (`/shop/$slug`)** *(new route)*
- Large cinematic product image dominates viewport
- Dissolve / ripple motion accents
- Ingredients, ritual, nutrition, reviews — editorial layout
- Add-to-cart with magnetic button + success microinteraction

**Global cart (client-side, `localStorage`)**
- Cart context + animated cart icon in header (badge count)
- **Side drawer** with glassmorphism, animated quantity steppers, live totals
- Persists across reloads

**Global header upgrade**
- Glassmorphism on scroll, animated hover underlines
- Cart icon + account icon (account icon links to /account, gated in phase 2)

**Starter Kit Configurator (`/shop/starter-kit`)** *(new route)*
- Step flow: bottle type → color → 3 flavor picks → goal
- Live preview that swaps imagery, tints background, updates summary
- "Add ritual to cart" at the end

---

## Phase 2 — Accounts + Checkout (requires Lovable Cloud)

I'll enable Lovable Cloud (DB + auth). I'll ask one question first: do you need profile fields (name, etc.) beyond email?

**Auth**
- Email/password + Google sign-in
- `/login`, `/signup`, `/reset-password` routes
- Protected `/account/*` via `_authenticated` layout

**Account dashboard (`/account`)**
- Profile, order history, saved favorites, refill reminders, reorder button
- Calm editorial layout matching shop

**Checkout flow (`/checkout`)**
- Steps: shipping → payment (mock for now) → confirmation
- Progress animation, soft transitions, order summary
- Orders persisted to Cloud DB
- **Note:** real payments are out of scope for this phase — I'll wire mock checkout that saves orders. If you want real Stripe/Paddle, that's a separate enable step afterward.

---

## Phase 3 — Polish + Journal Integration

- Journal cards integrated into shop footer + cross-links from product pages
- Final motion pass (magnetic buttons everywhere, page transition blur, ambient light layers refinement)
- SEO meta per route, OG images from product hero shots

---

## Technical notes

- Cart state: React Context + localStorage in phase 1, synced to Cloud on login in phase 2
- Motion: CSS transforms + IntersectionObserver (already pattern in codebase), no new heavy deps
- Imagery: reuse existing `src/assets/product-*.jpg` + `bottle-*.jpg`; generate 2–3 new hero/configurator atmospheric shots
- New routes: `/shop/$slug`, `/shop/starter-kit`, `/account`, `/account/orders`, `/login`, `/signup`, `/reset-password`, `/checkout`, `/checkout/confirmation`

---

## What I need from you

1. **Approve this plan** so I can start Phase 1.
2. After Phase 1 ships, I'll confirm before enabling Lovable Cloud for Phase 2.
3. For Phase 2: do you want **real payments** (Stripe/Paddle) or is a **mock checkout** (saves order, shows confirmation) fine for now?

Phase 1 is the biggest visual lift and the part you'll feel immediately. Ready to start when you approve.