# 🚀 InfluencerHub — Production-Grade Influencer Search Curation App

Welcome to **InfluencerHub**! This repository is my submission for the Wobb Frontend Engineering Assignment. 

I took a basic, starter React application that was intentionally left in a rough-but-working state, identified and resolved critical bugs, added state management, integrated interactive charting, and overhauled the entire UI/UX with smooth, professional animations.

---

## 🔗 Repository, Live Demo & Details
- **Live Deployment (Vercel)**: [wobb-influencers-search.vercel.app](https://wobb-influencers-search.vercel.app/)
- **GitHub Repository**: [Subodh26oct/Wobb_Influencers_Search](https://github.com/Subodh26oct/Wobb_Influencers_Search)
- **Git Clone URL**: `https://github.com/Subodh26oct/Wobb_Influencers_Search.git`
- **Codebase Build Status**: ✅ Passing (`npm run build` compiles clean under 500ms)

---

## 💡 Quick Pitch for HR / Recruiters (Interview Talking Points)
> *"For this assignment, I focused not just on completing the tasks, but on turning the app into a premium, resilient, production-ready product. I solved critical search crashes, handled real-world issues like broken external image URLs by writing an automatic gradient fallback avatar component, replaced React Context with Zustand to enable persistent list curation across refreshes, and designed interactive growth charts using Recharts with platform-specific branding (Instagram/YouTube/TikTok) to provide recruiters and users with actionable insights."*

---

## 🔄 What Was Changed? (Before vs. After)

| Feature / Bug | Before (Starter Repo) | After (My Implementation) |
|---|---|---|
| **YouTube Search** | ❌ **Crashed** when searching YouTube because creators like *Vlad and Niki* lacked a `username` property (threw `TypeError: toLowerCase of undefined`). | ✅ **Safe & Bulletproof**. Sanitized the filter keys to fallback to handles/names safely. |
| **Profile Detail Pages** | ❌ **Broken**. 24 out of the 30 creators showed a "Profile Not Found" page because their static detail files didn't exist. | ✅ **Fully Functional**. Added a dynamic mock generator fallback that constructs a rich profile on-the-fly with matching metrics. |
| **Creator Avatars** | ❌ **Broken Images**. Several external image URLs returned `403 Forbidden` / `404` due to expired CDN tokens. | ✅ **Smart Fallbacks**. Built an `<Avatar />` component that automatically renders initials in platform-themed gradients. |
| **State Management** | ❌ **Context API / Incomplete**. No state persistence and the "Add to List" button was a disabled placeholder. | ✅ **Zustand + Persist**. Integrated Zustand with `localStorage` persistence, duplicate check prevention, and visual toasts. |
| **Interactive Data** | ❌ **None**. Profile details only showed raw numbers. | ✅ **Recharts Growth Charts**. Dynamic SVG Area Charts plotting the last 6 months of follower history with glowing custom gradients. |
| **UI/UX & Aesthetics** | ❌ **Basic / Static**. Generic design with no motion or micro-interactions. | ✅ **Premium Designer Look**. Staggered entrance animations, tab slides, card scaling, and platform-specific glows on hover. |

---

## 🛠️ Deep Dive into Implementations & Tech Stack

### 1. Robust State Management (Zustand + Persist)
* **Zustand (`^5.0.14`)**: Replaced React Context with Zustand to manage the curation list. It decouples state from the component tree, preventing unnecessary top-level re-renders.
* **State Persistence**: Configured Zustand's `persist` middleware to automatically serialize the list state into `localStorage`. The list remains intact even after browser reloads.
* **Duplicate Prevention**: Implemented duplicate checking logic inside the store to prevent recruiters or curators from adding the exact same profile twice.

### 2. Smart `<Avatar />` Fallback Engine
* **Broken Link Detection**: Created a resilient Avatar component that detects failed image fetches (`onError` listener) caused by expired hotlinks or blocked hotlinking on external CDNs.
* **Initials Parsing**: Safely cleanses the influencer's name from emojis and special characters to compute clean initials (e.g. `✿ Kids Diana Show` -> `KD`).
* **Platform-Branded Gradients**: Styled fallback initials with premium CSS gradient combinations matching the platform colors:
  * **Instagram**: pink-purple-orange gradient.
  * **YouTube**: deep crimson gradient.
  * **TikTok**: dark cyan-magenta-black gradient.
* **Overlay Brand Badges**: Automatically overlays a miniature SVG platform badge at the corner of the avatar for quick recognition.

### 3. Dynamic Profile Detail Reconstruction
* **Vite Glob Loader**: Leveraged Vite's ESM-based dynamic import resolver (`import.meta.glob`) to lazy-load JSON files.
* **Smart Mock Fallback**: To handle the 24 profiles missing detail files, the loader intercepts requests, matches the summary data across the three search databases, and constructs a detailed user payload on-the-fly. This prevents broken routes and enables complete navigation for all 30 profiles.

### 4. SVG follow History Visualization (Recharts)
* **Recharts (`^2.12.7`)**: Integrated Recharts to render Area Charts plotting follower counts over the last 6 months.
* **Custom Tooltips**: Styled tooltips with glassmorphism (translucent dark panels, subtle border outlines, and backdrop blurs) to match the dark-theme aesthetic.
* **Color Themes**: Follows the active platform color scheme (Instagram: pink/purple fill, YouTube: red fill, TikTok: cyan/magenta fill).

### 5. Advanced UI/UX & Micro-interactions
* **Framer Motion (`^12.42.1`)**: Uses layout animations and spring physics (`stiffness`, `damping`) rather than standard CSS linear transitions, creating native, fluid animation states.
  * **Entrance Effects**: Staggered cards float up smoothly on page load.
  * **Tab Indicators**: The platform tab selection bar features a sliding spring bubble indicator.
  * **Sidebar Slide-In**: The "My List" drawer slides out from the right with a dampening spring recoil.
  * **Card Hover Glow**: Hovering over cards enlarges them slightly and emits a platform-colored ambient glow.
* **Lucide React (`^1.22.0`)**: Integrated SVG icons throughout filters, badges, stats, and navigation.

### 6. Clean Codebase & Optimization
* **Component Memoization**: Used React's `memo` along with `useCallback` and `useMemo` hooks to avoid unnecessary child component updates, keeping the app lightweight and fast.
* **Build Cleaning**: Fixed deprecation warnings in `tsconfig.app.json` by removing `baseUrl` for path mapping (as modern TypeScript resolves path aliases natively).

---

## ⚙️ How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Subodh26oct/Wobb_Influencers_Search.git
   cd Wobb_Influencers_Search
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Verify the production build**:
   ```bash
   npm run build
   ```
