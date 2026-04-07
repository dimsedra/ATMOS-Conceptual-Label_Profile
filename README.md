<img width="1813" height="967" alt="image" src="https://github.com/user-attachments/assets/abbf2748-d628-49d7-a9b0-442d4492dd52" /># ATMOS | The Architectural Label

> "Rejecting consumption-based cycles to construct continuous sensory environments."

ATMOS is a highly interactive, functional brutalism front-end built for an architectural music collective. The application houses two primary routing branches: the **ATMOS** core manifesto, and the **UNRAW** kinetic subgroup.

Engineered with severe brutalist aesthetics and zero-compromise kinematic mechanics, the interface heavily utilizes physics-based momentum systems, real-time typography scrambling, and multi-directional scrolling distortions to provide an ultra-premium sensory UX.

---

## ⚙️ Core Architecture & Features

- **Functional Brutalism Design:** High-contrast `clamp()` typography, monochromatic deep-black palettes cut with aggressive `var(--strike)` accents, and mathematically derived grid subdivisions.
- **Global Momentum Engine:** Integrated `lenis` (v1.3.21) for customized, buttery smooth scroll hijacking. This effectively uncouples the viewport UX from rigid browser stepping and utilizes 1.5s exponential decay curves for "heavy" cinematic inertia.
- **Cinematic Interaction Physics:** Highly engineered `framer-motion` sequences, including viewport intersection tracking, spatial mouse scrubbing for multi-angled parallax components, and an inverted custom kinetic cursor.
- **Independent Tactile Typography:** Native high-frequency character decoding sequences (`<ScrambleText>`) placed surgically on specific layout bounds. These deliver highly mechanical, "tingly" tactile feedback exclusively when users physically intersect hover boundaries.
- **Vite/React Core:** Blistering fast development experience and optimized static asset delivery via **Vite 8** + **React 19** + **SWC**.

---

## 🛠 Local Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dimsedra/ATMOS-Conceptual-Label_Profile.git
   cd "ATMOS Label"
   ```

2. **Install core Node dependencies:**

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure Environment Variables:**
   If you plan to utilize the Google/YouTube Developer API data interactions in the future, create a `.env.local` file in the root directory and securely inject your Google credentials tracking:

   ```env
   VITE_GOOGLE_CLIENT_ID="[YOUR_OAUTH_CLIENT_ID]"
   ```

   _(Note: The `secret.txt` and `.env.local` files are securely hidden via `.gitignore` to prevent public credential leaking.)_

4. **Boot the Local Development Server:**
   ```bash
   npm run dev
   ```
   Navigate to the local port (e.g., `http://localhost:5173/` or `5175/`) in your browser.

---

## Production Deployment

To build the static production bundle locally for inspection:

```bash
npm run build
npm run preview
```

## Showcase

I've deployed this website through vercel, if you'd like to see how it looks, here it is: [ATMOS](https://atmos-conceptual-label-profile.vercel.app/)

## 💻 Tech Stack (2026 Standards)

- **Framework:** React 19.2
- **Build Tool:** Vite 8.0 (SWC)
- **3D Engine:** Three.js 0.183.2
- **Routing:** React Router v6
- **Physics & Animation:** Framer Motion
- **Scroll Engine:** Lenis 1.3
- **Aesthetics:** Vanilla CSS (CSS Variables + Scoped Component Files)
