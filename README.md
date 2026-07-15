# FundRise — Crowdfunding Platform

Admin username: admin@fundrise.com
Admin password: Admin123 (seed this user manually in DB, see below)
Live site URL: _add after you deploy to Vercel_

## Features
- Three role system (Supporter, Creator, Admin) with JWT + role-based middleware on every protected route.
- Firebase email/password and Google sign-in, with one-time signup credit bonus (50 for Supporter, 20 for Creator).
- Persistent login — reloading a private route never bounces the user back to `/login` while auth state resolves.
- Campaign lifecycle: create → pending → admin approve/reject → live to supporters, with imgBB cover image upload.
- Contribution workflow: supporter contributes → creator approves (adds to raised total) or rejects (auto-refunds credits).
- Withdrawal system with the 20-credits-to-$1 conversion, $10 minimum payout, and admin "Payment Success" approval.
- Real-time-feeling notification records written to MongoDB for every approval/rejection/withdrawal/new-contribution event.
- Supporter credit purchase flow wired to Stripe PaymentIntents (falls back to a mock transaction if no Stripe key is set).
- Paginated "My Contributions" table with color-coded status badges.
- Campaign reporting: supporters can flag suspicious campaigns; admin can suspend or delete from the Reports page.
- Fully responsive glassmorphism UI with Framer Motion page/section animations, custom cursor, hover-tilt cards, and gradient glow buttons.

## Stack
Client: React (Vite) + Tailwind + React Router + Firebase Auth + Framer Motion + Swiper + Axios
Server: Node + Express + MongoDB driver + JWT + Stripe

## Local Setup

### Server
```
cd server
cp .env.example .env   # fill in your Mongo + JWT + Stripe values
npm install
npm run dev
```

### Client
```
cd client
cp .env.example .env   # fill in your Firebase + imgBB + API URL values
npm install
npm run dev
```

## Deployment Notes
- Deploy `server` to Vercel (or Render/Railway) as a Node service; deploy `client` to Vercel as a static Vite build.
- Whitelist your deployed client's domain in the server's CORS origin list (`CLIENT_URL` env var).
- Add your deployed server URL as `VITE_API_URL` in the client's Vercel environment variables.
- Enable Email/Password and Google providers in Firebase Console → Authentication.
- Add your Vercel domain to Firebase Console → Authentication → Settings → Authorized domains.

## Seeding an Admin
There's no public admin signup — register normally as a Supporter or Creator, then in MongoDB Atlas manually change that user's `role` field to `"admin"`. From then on you can promote/demote other users from Manage Users.

## What's stubbed / needs your keys before it's "live"
- Stripe: card collection UI uses a simplified confirm step — swap in `@stripe/react-stripe-js` `<CardElement>` for full production card capture.
- imgBB: registration photo + campaign cover upload both call the imgBB API — needs `VITE_IMGBB_API_KEY`.
- Email notifications (SendGrid/SES) and MongoDB aggregation search filters are listed in the brief as optional — not included in this scaffold, hooks are easy to add in `server/index.js`.
