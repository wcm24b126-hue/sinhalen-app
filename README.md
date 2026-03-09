# Personal Finance Pro - Sri Lanka (මගේ මුදල්) 🇱🇰

Welcome to **Personal Finance Pro**, a comprehensive financial management platform designed exclusively for Sri Lankans. This application helps users track their daily expenses, manage income, and seamlessly verify crypto payments, all with a localized and premium user experience.

## ✨ Key Features

1. **Bilingual Support (English & Sinhala):**
   - Full toggleable translation for the entire application.
   - Localized greetings based on the time of day (e.g., "සුබ උදෑසනක්", "සුබ සවසක්").
   - LKR (Rupee) formatting for all financial figures.

2. **Premium UI/UX (Glassmorphism design):**
   - Sleek dark theme with lively animated gradient backgrounds.
   - Glassmorphism panels (blurred translucent effects).
   - Fully responsive design for Mobile, Tablet, and Desktop.
   - CSS handled purely via Vanilla CSS with Tailwind CSS CDN for quick utility classes.

3. **Secure Authentication & Database (Supabase):**
   - Unified Login and Registration pages.
   - Secure Row Level Security (RLS) policies implemented in the database to ensure users only access their own data.
   - Automatically triggered profile and category creation upon new user sign-up.

4. **Sri Lankan Context Defaults:**
   - Registers new users with local, pre-configured expenditure categories (e.g., Keells/Cargills, CEB (Electricity), Water Board, Dialog/Mobitel, PickMe/Uber).

5. **Crypto Payment Gateway Integration (Polygon MATIC):**
   - Allows users to deposit MATIC via the Polygon Mainnet.
   - Integrated with **Etherscan/Polygonscan API V2**.
   - Intelligent 10-second interval polling mechanism to bypass free-tier rate limits.
   - "Mock Payment" testing mode included for testing without real crypto assets.

---

## 🛠️ Technology Stack

- **Frontend Framework:** React.js (Bootstrapped with Vite)
- **Styling:** Vanilla CSS + Tailwind CSS (via CDN) + CSS animations
- **Backend/BaaS:** Supabase (PostgreSQL Database, Auth, RLS Policies)
- **Routing:** React Router DOM
- **Icons:** Lucide-React & FontAwesome
- **Blockchain API:** Polygonscan API V2 (Etherscan API)

---

## 🗄️ Database Schema Architecture (Supabase / Postgres)

The project leverages a robust relational database model.
- `auth.users`: Default Supabase authentication table.
- `profiles`: Extends user info (First Name, Last Name, Avatar). Linked via Auth Hook Triggers.
- `accounts`: Stores wallet/bank balances (Cash, Savings, Checking).
- `categories`: Stores transaction types and labels (Income/Expense). Automatically seeded with local SL categories using front-end logic on the first login.
- `transactions`: Logs every income and expenditure, relating back to `accounts` and `categories`.
- `budgets`: For setting limits on specific categories.

---

## 🚀 How to Run Locally

### Prerequisites
1. Node.js installed.
2. A Supabase account with an active project.
3. A Polygonscan API Key.

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/wcm24b126-hue/sinhalen-app.git
   cd sinhalen-app
   ```
2. Install NPM dependencies:
   ```bash
   npm install
   ```
3. Set up your Environment Variables:
   Create a `.env` file in the root of the project:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_POLYGONSCAN_API_KEY=your_polygonscan_api_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. View the app at `http://localhost:5173`.

---

## ☁️ Deployment (Vercel)

1. Push your code to your GitHub repository.
2. Log into [Vercel](https://vercel.com/) and Add a New Project.
3. Import the GitHub repository.
4. Under the **Environment Variables** section, manually add the 3 variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_POLYGONSCAN_API_KEY`).
5. Click **Deploy**.

---

## 📝 Developer Notes
Developed with ❤️ by the Antigravity Agent. The project pushes the limits of standard React setups by seamlessly merging local Sri Lankan cultural requirements with modern web3 technologies (Crypto Deposits) and state-of-the-art UI practices.
