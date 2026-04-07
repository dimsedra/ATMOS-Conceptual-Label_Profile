# ATMOS | The Architectural Label

> "Rejecting consumption-based cycles to construct continuous sensory environments."

ATMOS is a highly interactive, functional brutalism front-end built for an architectural music collective. The application houses two primary routing branches: the **ATMOS** core manifesto, and the **UNRAW** kinetic subgroup. 

Engineered with severe brutalist aesthetics and zero-compromise kinematic mechanics, the interface heavily utilizes physics-based momentum systems, real-time typography scrambling, and multi-directional scrolling distortions to provide an ultra-premium sensory UX.

---

## ⚙️ Core Architecture & Features

- **Functional Brutalism Design:** High-contrast `clamp()` typography, monochromatic deep-black palettes cut with aggressive `var(--strike)` accents, and mathematically derived grid subdivisions.
- **Global Momentum Engine:** Integrated `@studio-freight/lenis` for customized, buttery smooth scroll hijacking. This effectively uncouples the viewport UX from rigid browser stepping and utilizes 1.5s exponential decay curves for "heavy" cinematic inertia.
- **Cinematic Interaction Physics:** Highly engineered `framer-motion` sequences, including viewport intersection tracking, spatial mouse scrubbing for multi-angled parallax components, and an inverted custom kinetic cursor.
- **Independent Tactile Typography:** Native high-frequency character decoding sequences (`<ScrambleText>`) placed surgically on specific layout bounds. These deliver highly mechanical, "tingly" tactile feedback exclusively when users physically intersect hover boundaries.
- **Vite/React Core:** Blistering fast development experience and optimized static asset delivery via Vite + SWC.

---

## 🛠 Local Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd "ATMOS Label"
   ```

2. **Install core Node dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   If you plan to utilize the Google/YouTube Developer API data interactions in the future, create a `.env.local` file in the root directory and securely inject your Google credentials tracking:
   ```env
   VITE_GOOGLE_CLIENT_ID="[YOUR_OAUTH_CLIENT_ID]"
   ```
   *(Note: The `secret.txt` and `.env.local` files are securely hidden via `.gitignore` to prevent public credential leaking.)*

4. **Boot the Local Development Server:**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:5173/` in your browser.

---

## 🚀 Production Deployment

This project uses modern SPA (Single Page Application) routing via `react-router-dom`. When deploying to static hosting environments like **Vercel** or **Netlify**, the routing fallbacks have already been thoroughly engineered into the local `vercel.json` and `netlify.toml` configuration files. 

To build the static production bundle locally for inspection:
```bash
npm run build
npm run preview
```

## 💻 Tech Stack
* **Framework:** React 18
* **Build Tool:** Vite
* **Routing:** React Router v6
* **Physics & Animation:** Framer Motion
* **Scroll Engine:** Lenis
* **Aesthetics:** Vanilla CSS (CSS Variables + Scoped Component Files)
