# Heimdall Dashboard (Frontend)

This is a single-page React + Vite frontend for the Heimdall project. It uses Tailwind CSS for styling, React Three Fiber for the 3D globe, and Framer Motion for animated panels.

Quick start

```bash
cd dashboard/site
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

Notes
- Metrics are currently hardcoded in the frontend (Satellite A and B). The React state is structured so a backend endpoint can later be plugged in to fetch real predictions (RUL/SOH/etc.).
