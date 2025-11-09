# 🛰️ Heimdall Dashboard

A sleek, interactive 3D dashboard for satellite health monitoring and predictive maintenance analytics.

## 🎯 Features

- **3D Interactive Globe**: Slow-rotating Earth with starfield background
- **Orbiting Satellites**: 5 satellites in orbit, 2 with hardcoded analytics data
- **Real-time Analytics**: Click satellites to view detailed health metrics
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Dark Mode UI**: Modern glassmorphism design with neon accents

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

```bash
cd dashboard
npm install
```

### Development

```bash
npm run dev
```

The dashboard will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📊 Satellite Data

### Satellite A (Stable Health)
- **RUL**: 95 cycles
- **SOH**: 0.94 (94%)
- **Capacity Retention**: 0.91 (91%)
- **Status**: 🟢 Healthy

### Satellite B (Critical Degradation)
- **RUL**: 18 cycles
- **SOH**: 0.76 (76%)
- **Capacity Retention**: 0.68 (68%)
- **Status**: 🔴 Critical

## 🎨 Design System

- **Background**: `#0B0C10` (Dark mode)
- **Accent Colors**: 
  - Neon Magenta: `#FF00FF`
  - Lime Green: `#00FF00`
  - Blue: `#0B1AAE`
- **Glassmorphism**: Backdrop blur effects on panels and cards

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Three Fiber** - 3D rendering
- **Three.js** - 3D graphics
- **Framer Motion** - Animations
- **@react-three/drei** - Three.js helpers

## 📁 Project Structure

```
dashboard/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Top navigation bar
│   │   ├── GlobeScene.jsx      # Main 3D scene container
│   │   ├── Globe.jsx            # Earth globe component
│   │   ├── Satellite.jsx       # Individual satellite component
│   │   ├── AnalyticsPanel.jsx  # Side panel with metrics
│   │   └── Footer.jsx          # Footer component
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css               # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🔮 Future Integration

The dashboard is structured to easily connect with backend model endpoints:

```javascript
// Example: Replace hardcoded data with API calls
const fetchSatelliteData = async (satelliteId) => {
  const response = await fetch(`/api/satellites/${satelliteId}/health`);
  return response.json();
};
```

## 📝 Notes

- RUL (Remaining Useful Life) is measured in **cycles**
- 1 cycle = 1 full charge-discharge cycle (chemical-electromechanical transduction)
- Metrics are currently hardcoded but structured for API integration

## 📄 License

© Heimdall 2025 | Built by the UTS AI Research Group

