# Weather App (Frontend Mentor Challenge)

A responsive weather dashboard built with plain HTML, CSS, and JavaScript using the Open-Meteo APIs.

Live demo: [https://sunnyyeahboiii.github.io/Weather-App-FrontEnd-Mentors/](https://sunnyyeahboiii.github.io/Weather-App-FrontEnd-Mentors/)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [API Usage](#api-usage)
- [Responsive Behavior](#responsive-behavior)
- [Known Limitations](#known-limitations)
- [Roadmap Ideas](#roadmap-ideas)
- [Credits](#credits)

## Overview

This project is a solution to the Frontend Mentor weather app challenge. It provides:

- Location search with geocoding suggestions
- Current weather conditions
- "Feels like", humidity, wind speed, and precipitation metrics
- 7-day daily forecast cards
- Hourly forecast for a selected weekday
- Unit switching for temperature, wind speed, and precipitation

The app is implemented as a static frontend (no framework, no bundler, no backend).

## Features

- **Location Search**
  - Uses Open-Meteo geocoding API to fetch matching cities
  - Displays dropdown-style result cards
  - Loads selected city's forecast data
- **Current Weather Board**
  - Shows location text, date, weather icon, and current temperature
  - Starts with a skeleton/loading state
- **Additional Metrics**
  - Feels like temperature
  - Relative humidity
  - Wind speed
  - Precipitation
- **Daily Forecast**
  - Seven cards with weekday, icon, max/min temperature
- **Hourly Forecast**
  - Scrollable hourly list
  - Day selector to switch between weekdays
- **Unit Selector**
  - Temperature: Celsius/Fahrenheit
  - Wind speed: km/h or mph
  - Precipitation: mm or inch

## Tech Stack

- HTML5
- CSS3 (`styles.css`, `responsive.css`, `skeleton.css`)
- Vanilla JavaScript (`script.js`)
- Open-Meteo APIs
- Deployed via GitHub Pages

## Project Structure

```text
.
├── index.html
├── script.js
├── styles.css
├── responsive.css
├── skeleton.css
├── assets/
│   ├── images/
│   └── fonts/
├── style-guide.md
├── README-FrontendMentors.md
└── README-template.md
```

## Getting Started

Because this is a static site, you can run it directly or with a local static server.

### 1) Clone the repository

```bash
git clone https://github.com/sunnyyeahboiii/Weather-App-FrontEnd-Mentors.git
cd Weather-App-FrontEnd-Mentors
```

### 2) Run locally

Choose one option:

- Open `index.html` directly in your browser
- Or start a local server (recommended), for example:

```bash
python3 -m http.server 5500
```

Then visit `http://localhost:5500`.

## How It Works

At a high level:

1. User searches for a city
2. Geocoding API returns location candidates
3. User selects a city card
4. Forecast API fetches weather data using selected coordinates + chosen units
5. UI sections are populated:
   - current weather board
   - detail metric cards
   - daily forecast
   - hourly forecast for selected day

Key client-side state in `script.js`:

- `latitude`, `longitude`
- `cityName`, `cityAdmin`
- `temperatureUnit`, `windSpeedUnit`, `precipitationUnit`
- `dataObj` (fetched weather payload)
- `forecastDayOfTheWeek` (selected hourly day)

## API Usage

### Geocoding (search)

Endpoint:

```text
https://geocoding-api.open-meteo.com/v1/search?name=<location_name>
```

### Forecast (weather data)

Endpoint pattern used:

```text
https://api.open-meteo.com/v1/forecast?latitude=<lat>&longitude=<lon>&temperature_unit=<unit>&precipitation_unit=<unit>&wind_speed_unit=<unit>&current=temperature_2m,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&&minutely_15=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation
```

No API key is required for these Open-Meteo endpoints.

## Responsive Behavior

Responsive rules are primarily in `responsive.css`:

- `max-width: 768px`:
  - Main weather layout switches from grid to stacked column flow
  - Forecast cards adjust widths
- `max-width: 475px`:
  - Header/logo and text sizes adapt further
  - Current weather board content stacks vertically

## Known Limitations

From current codebase behavior:

- **Weather icon assets**
  - JS expects files like `assets/images/icon-<condition>.webp`.
  - If those files are missing, weather condition images will not render.
- **Search edge cases**
  - If geocoding returns no `results`, UI error handling can be improved.
- **Error handling**
  - Fetch errors are currently logged to console, but user-facing error states are limited.
- **Initial state mismatch**
  - Default coordinates are set to Berlin values while displayed default city text is "Vietnam".
- **Accessibility opportunities**
  - Unit and forecast controls can be improved with richer ARIA semantics and keyboard UX polish.

## Roadmap Ideas

- Add robust empty-state and API-error UI
- Add loading states per section (search, daily, hourly) for clearer feedback
- Add better time formatting (`12:00 AM/PM`, zero-padding)
- Add automated tests for core rendering/formatting logic
- Refactor JS into smaller modules for maintainability

## Credits

- Challenge: [Frontend Mentor - Weather app](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49)
- Weather data and geocoding: [Open-Meteo](https://open-meteo.com/)
- Author: [Sunny](https://github.com/sunnyyeahboiii)