# Weather App

## Overview

This is a weather dashboard built with Next.js. It provides real-time weather data, pollution levels, forecasts, and immersive weather-driven visuals like rain, snow, and clouds. The project uses a modular layout inspired by bento grid design and offers both standard and immersive views.

---

## Development Process

### Design and Layout

- Started by planning the overall structure and UI design using a bento grid layout.
- Focused on making the layout modular and responsive for various screen sizes.
- Primary components were placed inside the grid for weather metrics, map view, and top cities.

### Coding

- Project bootstrapped with Next.js and TailwindCSS.
- Implemented a global context (`globalCtx`) to manage shared state like selected city and fetched data.
- Set up the initial structure starting from `Navbar.tsx`.
- Added individual weather-related components such as:
  - `Temperature`
  - `AirPollution`
  - `Sunset`
  - `Wind`
  - `UV`
  - `Humidity`
  - `Visibility`
  - `Pressure`
  - `FeelsLike`
  - `FiveDayWeather`
  - `TheMap`

- Introduced an immersive mode with animated background effects:
  - Rain, Snow, Clouds, and Wind scenes.
  - Controlled using `immersiveWeatherCtx`.

---

## Technologies Used

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Context API](https://reactjs.org/docs/context.html)
- [Lucide Icons](https://lucide.dev/)
- OpenWeatherMap APIs (for current weather, pollution, and forecasts)
- Mapbox or Leaflet (for interactive map visualization)

---

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/chandradeep-pra/weather-app.git
cd weather-app
npm install
```

### Configuration

- Create a .env.local file in the root directory and add the following:
    - NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key
    - NEXT_PUBLIC_GEOCODE_API_KEY=your_optional_geocode_key

### Run Project

```bash
npm run dev
```
- Go to - [localhost:3000](http://localhost:3000)