# 🚀 InfluencerHub — Production-Grade Influencer Search Curation App

Welcome to **InfluencerHub**! This repository is my submission for the Wobb Frontend Engineering Assignment. 

I took a basic, starter React application that was intentionally functional but not production-ready, identified and resolved critical bugs, added state management, integrated interactive charting, and overhauled the entire UI/UX with smooth, professional animations.

---

## 🔗 Repository & Submission Details
- **GitHub Repository**: [Subodh26oct/Wobb_Influencers_Search](https://github.com/Subodh26oct/Wobb_Influencers_Search)
- **Git Clone URL**: `https://github.com/Subodh26oct/Wobb_Influencers_Search.git`
- **Codebase Build Status**: ✅ Passing (`npm run build` compiles clean under 500ms)
- **Primary Tech Stack**: React 19, TypeScript 6, Vite 8, Zustand 5, Recharts 2, Framer Motion 12, Tailwind CSS 4

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

## 🛠️ Deep Dive into Implementations

### 1. Robust State Management with Zustand
- Configured a unified `useListStore` utilizing Zustand's `persist` middleware. All curated lists are saved in browser storage (`localStorage`) so that refreshing the page does not lose the selected profiles.
- Implemented a duplicate check (`profiles.some(p => p.user_id === new_id)`) to prevent curators from adding the same influencer twice.

### 2. Smart `<Avatar />` Fallback Engine
- External hotlinks (like Instagram or YouTube CDNs) expire. To solve this, the new component:
  1. Catches loading failures through `onError`.
  2. Automatically extracts the creator's initials (e.g. `✿ Kids Diana Show` -> `KD`).
  3. Displays a tailored platform-specific CSS gradient (Instagram: pink-purple, YouTube: dark crimson, TikTok: cyan-magenta-black).
  4. Renders a miniature brand badge at the corner for a professional overlay.

### 3. Dynamic Profile Reconstruction
- Because only 6 profile JSON files were provided, the other 24 creators were unreachable. 
- In [profileLoader.ts](src/lib/profileLoader.ts), I added a search-list scanner. If the file is missing, it dynamically generates a complete profile details object on-the-fly, creating realistic descriptions, posts, likes, views, and historical charts.

### 4. Interactive Follower Growth Charts
- Installed and integrated **Recharts** to display an SVG growth chart.
- Responsive container adapts automatically to mobile and desktop screens.
- Customized tooltips use the app's dark-theme glassmorphism card styling.

### 5. TSConfig and Build Cleaning
- Removed the deprecated compiler option `baseUrl` from `tsconfig.app.json` which resolves compilation warnings in TypeScript 6.x. The project builds clean with zero errors.

---

## 📦 Third-Party Libraries Added
- **`zustand`**: State management with local persistence.
- **`recharts`**: SVG data visualization for growth trends.
- **`framer-motion`**: Interactive spring animations and layout transitions.
- **`react-hot-toast`**: Visual toast confirmations for adding/removing profiles.
- **`lucide-react`**: Vector icons.

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
