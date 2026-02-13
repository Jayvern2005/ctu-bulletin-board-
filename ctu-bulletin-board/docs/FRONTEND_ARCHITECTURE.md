# CTU Digital Bulletin Board System
## Front-End Architecture Documentation

### Connecting IPOO Framework to Code Implementation

---

## Executive Summary

This document connects the theoretical **Input-Process-Output-Outcome (IPOO)** framework to the actual code implementation of the CTU Digital Bulletin Board System. It demonstrates how HTML, CSS, and JavaScript work together to create a modern, real-time campus communication platform deployed on GitHub Pages and accessible via Local Area Network (LAN).

---

## 1. IPOO Framework → Code Mapping

### INPUT Stage

**Theory:** The system gathers various data sources including announcements, academic calendar, real-time weather, and event details.

**Code Implementation:**

```javascript
// File: app.js - Lines 15-45

// INPUT 1: Announcements from Firebase
function listenAnnouncements() {
  const now = new Date();
  const q = query(
    collection(db, "announcements"),
    where("startDate", "<=", now),
    orderBy("startDate", "desc")
  );
  onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
    renderItems(announcementsContainer, data, annCountEl);
  });
}

// INPUT 2: Events from Firebase
function listenEvents() {
  const now = new Date();
  const q = query(
    collection(db, "events"),
    where("startDate", "<=", now),
    orderBy("startDate", "asc")
  );
  onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
    renderItems(eventsContainer, data, eventCountEl);
  });
}

// INPUT 3: Weather Data from API
function loadWeather() {
  const API_KEY = "f5168c305674a67a705409181a80046d";
  const LAT = 10.650;  // Camotes, Cebu
  const LON = 124.350;
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => processWeatherData(data));
}
```

---

### PROCESS Stage

**Theory:** The system retrieves real-time weather data, manages and schedules bulletin content, generates displays, combines information into a single layout, and sends to the Digital Bulletin Board.

**Code Implementation:**

```javascript
// File: app.js - Lines 60-120

// PROCESS 1: Filter Active Content Based on Dates
function renderItems(container, data, countEl) {
  container.innerHTML = "";
  
  const now = new Date();
  
  // Filter only active content
  const activeData = data.filter(item => {
    const end = item.endDate?.toDate ? item.endDate.toDate() : item.endDate;
    return end && end >= now;
  });

  if (activeData.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No active content</p>
      </div>
    `;
    if (countEl) countEl.textContent = '0';
    return;
  }

  // PROCESS 2: Generate HTML for Each Item
  activeData.forEach(item => {
    const div = document.createElement("div");
    div.className = "announcement";
    div.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.content}</p>
    `;
    container.appendChild(div);
  });
  
  // PROCESS 3: Update Live Counter
  if (countEl) countEl.textContent = activeData.length;
}

// PROCESS 4: Generate Mini Calendar
function generateCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  let html = '';
  
  // Generate previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    html += `<div class="calendar-day other-month">${day}</div>`;
  }
  
  // Generate current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === today;
    const todayClass = isToday ? ' today' : '';
    html += `<div class="calendar-day${todayClass}">${day}</div>`;
  }
  
  calendarDaysEl.innerHTML = html;
}

// PROCESS 5: Update Time Display Every Second
function updateDateTime() {
  const now = new Date();
  
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };
  currentTimeEl.textContent = now.toLocaleTimeString('en-US', timeOptions);
  
  const dateOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  };
  currentDateEl.textContent = now.toLocaleDateString('en-US', dateOptions);
}

setInterval(updateDateTime, 1000); // Update every second
```

---

### OUTPUT Stage

**Theory:** Digital Bulletin Board with local weather updates, data analysis, and admin monitoring dashboard.

**Code Implementation:**

**HTML Structure** (index.html):
```html
<!-- OUTPUT 1: Digital Bulletin Board Display -->
<main class="three-column-layout">
  
  <!-- Left Column: Announcements -->
  <section class="panel announcements-panel">
    <div class="panel-header">
      <h2>📢 Announcements</h2>
      <div class="panel-badge">
        <span id="annCount">0</span>
      </div>
    </div>
    <div id="announcements" class="content-list">
      <!-- Dynamic content populated by JavaScript -->
    </div>
  </section>

  <!-- Middle Column: Events -->
  <section class="panel events-panel">
    <div class="panel-header">
      <h2>📅 Events & Notices</h2>
      <div class="panel-badge">
        <span id="eventCount">0</span>
      </div>
    </div>
    <div id="events" class="content-list">
      <!-- Dynamic content populated by JavaScript -->
    </div>
  </section>

  <!-- Right Column: Information Sidebar -->
  <aside class="sidebar">
    
    <!-- Time Widget -->
    <div class="widget time-widget">
      <div class="widget-content">
        <div class="widget-label">Current Time</div>
        <div id="currentTime" class="time-display">--:--:--</div>
      </div>
    </div>

    <!-- Calendar Widget -->
    <div class="widget calendar-widget">
      <div class="widget-content">
        <div class="widget-label">Today's Date</div>
        <div id="currentDate" class="date-display">Loading...</div>
      </div>
    </div>

    <!-- Weather Widget -->
    <div class="widget weather-widget">
      <div class="widget-content">
        <div class="widget-label">Weather</div>
        <div id="weather" class="weather-display">Loading...</div>
        <div class="weather-location">Camotes, Cebu</div>
      </div>
    </div>

    <!-- Mini Calendar -->
    <div class="widget mini-calendar-widget">
      <h3 id="calendarMonth">Loading...</h3>
      <div id="calendarDays" class="calendar-days">
        <!-- Generated by JavaScript -->
      </div>
    </div>

    <!-- Status Indicator -->
    <div class="widget status-widget">
      <div class="status-dot"></div>
      <span>Live Updates Active</span>
    </div>

  </aside>

</main>
```

**CSS Styling** (style.css):
```css
/* OUTPUT 2: Visual Presentation */

/* Three-Column Grid Layout */
.three-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr 400px;
  gap: 20px;
  padding: 24px;
  max-width: 1920px;
  margin: 0 auto;
}

/* Glassmorphism Panel Design */
.panel {
  background: rgba(21, 27, 46, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.6);
}

/* Animated Background Orbs */
.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.35;
  animation: float 25s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(50px, -70px) scale(1.1); }
  66% { transform: translate(-30px, 40px) scale(0.9); }
}

/* Widget Styling */
.widget {
  background: rgba(21, 27, 46, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 20px;
}

/* Time Display */
.time-display {
  font-family: 'Space Grotesk', monospace;
  font-size: 24px;
  font-weight: 700;
  color: #f8fafc;
}

/* Calendar Grid */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

.calendar-day.today {
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  color: white;
  font-weight: 700;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.4);
}
```

---

### OUTCOME Stage

**Theory:** Faster and more accessible information sharing, modernized platform, improved communication, enhanced efficiency, centralized digital transformation.

**Implementation Results:**

```javascript
// OUTCOME 1: Real-Time Updates (Enhanced Efficiency)
// Auto-refresh every 30 minutes + Real-time Firebase listeners
setInterval(() => {
  console.log('Auto-refreshing display...');
  location.reload();
}, 1000 * 60 * 30);

// OUTCOME 2: Live Data Synchronization (Improved Communication)
onSnapshot(query, (snapshot) => {
  // Instantly update display when admin adds content
  renderItems(container, snapshot.docs);
});

// OUTCOME 3: Centralized Platform (Digital Transformation)
// Single URL accessible campus-wide
// https://ctu-sf.github.io/bulletin-board/display/

// OUTCOME 4: Reduced Administrative Effort
// Admin dashboard with CRUD operations
// No manual poster updates needed

// OUTCOME 5: Accessibility (Faster Information Sharing)
// Three-column layout: Announcements + Events + Info Sidebar
// Live counters show active content count
// Responsive design works on all devices
```

---

## 2. Front-End Architecture Details

### HTML: Structure & Semantics

**Role:** Provides the skeletal framework and content organization.

**Key Components:**

```html
<!-- 1. Metadata & Resources -->
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CTU Digital Bulletin Board</title>
  <link rel="stylesheet" href="style.css" />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk&family=Inter" rel="stylesheet">
</head>

<!-- 2. Semantic Structure -->
<body>
  <header><!-- Branding & Navigation --></header>
  <main><!-- Content Panels --></main>
  <aside><!-- Information Widgets --></aside>
  <footer><!-- Copyright Info --></footer>
</body>

<!-- 3. Dynamic Content Containers -->
<div id="announcements"><!-- Populated by JavaScript --></div>
<div id="events"><!-- Populated by JavaScript --></div>
<div id="weather"><!-- Populated by JavaScript --></div>
```

**Accessibility Features:**
- Semantic HTML5 elements (`<header>`, `<main>`, `<aside>`, `<footer>`)
- Alt text for images
- ARIA labels for dynamic content
- Keyboard navigation support

---

### CSS: Styling & Visual Design

**Role:** Adds colors, fonts, spacing, and visual effects to create an engaging user interface.

**Design System:**

```css
/* 1. Color Variables (Centralized Design System) */
:root {
  --primary: #3b82f6;        /* Blue - Primary actions */
  --accent: #06b6d4;         /* Cyan - Highlights */
  --success: #10b981;        /* Green - Status indicators */
  --bg-primary: #0a0e1a;     /* Dark background */
  --text-primary: #f8fafc;   /* Light text */
}

/* 2. Typography Hierarchy */
body {
  font-family: 'Inter', -apple-system, sans-serif;
  line-height: 1.6;
}

h1, h2, h3 {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
}

/* 3. Grid-Based Layout */
.three-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr 400px;
  gap: 20px;
}

/* 4. Responsive Breakpoints */
@media (max-width: 1200px) {
  .three-column-layout {
    grid-template-columns: 1fr 1fr;
  }
  .sidebar {
    grid-column: 1 / -1;
  }
}

@media (max-width: 768px) {
  .three-column-layout {
    grid-template-columns: 1fr;
  }
}

/* 5. Modern Visual Effects */
.panel {
  backdrop-filter: blur(20px);           /* Glassmorphism */
  box-shadow: 0 20px 25px rgba(0,0,0,.6); /* Depth */
  transition: transform 0.3s ease;        /* Smooth interactions */
}

.panel:hover {
  transform: translateY(-4px);
}
```

---

### JavaScript: Interactivity & Data

**Role:** Handles user interactions, data fetching, real-time updates, and dynamic content rendering.

**Core Functionality:**

```javascript
// 1. Firebase Integration (Backend Communication)
import { db } from "../firebase/firebaseConfig.js";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. Real-Time Data Listeners
const q = query(
  collection(db, "announcements"),
  where("startDate", "<=", new Date()),
  orderBy("startDate", "desc")
);

onSnapshot(q, (snapshot) => {
  // Automatically updates when data changes
  const data = snapshot.docs.map(doc => doc.data());
  renderItems(announcementsContainer, data);
});

// 3. DOM Manipulation
function renderItems(container, data) {
  container.innerHTML = "";
  
  data.forEach(item => {
    const div = document.createElement("div");
    div.className = "announcement";
    div.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.content}</p>
    `;
    container.appendChild(div);
  });
}

// 4. API Integration
async function loadWeather() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?...`
  );
  const data = await response.json();
  displayWeather(data);
}

// 5. Time Management
setInterval(() => {
  const now = new Date();
  document.getElementById('currentTime').textContent = 
    now.toLocaleTimeString('en-US', { hour12: true });
}, 1000);
```

---

## 3. Network Architecture & LAN Integration

### Local Area Network (LAN) Access

**Theory:** The front-end communicates with the back-end through Local Area Network (LAN) for campus-wide accessibility.

**Implementation:**

```
Campus Network Topology:

         Internet
            |
    [Campus Router/Gateway]
            |
    ┌───────┼───────┐
    |       |       |
[Admin] [Display] [Users]
Station  Monitor  Devices
```

**Network Flow:**

```javascript
// 1. User Device (via LAN) → GitHub Pages
http://192.168.1.100:8080/display/  // Local development
https://ctu-sf.github.io/bulletin-board/  // Production

// 2. Static Files Served
index.html → Browser
style.css → Browser
app.js → Browser (ES6 Module)

// 3. Dynamic Data Fetch
app.js → Firebase Firestore (via Internet)
app.js → OpenWeatherMap API (via Internet)

// 4. Real-Time Updates
Firebase → app.js → DOM → Browser Display
```

**LAN Benefits:**
- ✅ Fast local access within campus
- ✅ Reduced external bandwidth usage
- ✅ Cached static assets
- ✅ Secure admin access (LAN-only admin dashboard)

---

## 4. GitHub Pages Deployment

### Static Hosting Platform

**What GitHub Pages Provides:**
- Free hosting for HTML, CSS, JavaScript files
- HTTPS encryption (secure data transmission)
- CDN distribution (fast global delivery)
- Version control integration
- Custom domain support

**Deployment Process:**

```bash
# Step 1: Initialize Git Repository
cd bulletin-board-system
git init

# Step 2: Add Files
git add display/index.html
git add display/style.css
git add display/app.js
git add admin/

# Step 3: Commit
git commit -m "Deploy CTU Digital Bulletin Board"

# Step 4: Push to GitHub
git remote add origin https://github.com/ctu-sf/bulletin-board.git
git push -u origin main

# Step 5: Enable GitHub Pages
# Repository Settings → Pages → Source: main branch → /docs folder → Save

# Step 6: Access Live Site
# https://ctu-sf.github.io/bulletin-board/display/
```

**File Structure on GitHub:**

```
ctu-sf/bulletin-board/
├── index.html          # Redirects to display
├── display/
│   ├── index.html      # Public display
│   ├── style.css
│   ├── app.js
│   └── ctulogo.jpg
├── admin/
│   ├── index.html      # Admin login
│   ├── dashboard.html
│   ├── admin.css
│   ├── admin.js
│   └── dashboard.js
├── firebase/
│   └── firebaseConfig.js
└── README.md
```

---

## 5. Data Flow Architecture

### Request-Response Cycle

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERACTION                         │
└───────────────────────────┬─────────────────────────────────┘
                            ▼
                ┌──────────────────────┐
                │   Browser (Client)   │
                │   - HTML rendered    │
                │   - CSS applied      │
                │   - JS executing     │
                └──────────┬───────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
  │GitHub Pages │  │  Firebase   │  │  Weather    │
  │Static Files │  │  Firestore  │  │     API     │
  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
         │                │                │
         │                │                │
         └────────────────┼────────────────┘
                          │
                ┌─────────▼──────────┐
                │  JavaScript        │
                │  - Data processing │
                │  - DOM updates     │
                └─────────┬──────────┘
                          │
                ┌─────────▼──────────┐
                │  Updated Display   │
                │  - Announcements   │
                │  - Events          │
                │  - Weather         │
                │  - Time/Calendar   │
                └────────────────────┘
```

### Code Example: Complete Data Flow

```javascript
// 1. User opens bulletin board URL
https://ctu-sf.github.io/bulletin-board/display/

// 2. GitHub Pages serves static files
// → index.html loads
// → style.css applies styling
// → app.js executes

// 3. app.js initializes Firebase connection
import { db } from "../firebase/firebaseConfig.js";

// 4. Set up real-time listeners
onSnapshot(query(collection(db, "announcements")), (snapshot) => {
  // 5. Firebase returns data
  const announcements = snapshot.docs.map(doc => doc.data());
  
  // 6. Process and filter data
  const activeAnnouncements = announcements.filter(item => {
    return item.endDate.toDate() >= new Date();
  });
  
  // 7. Update DOM
  renderItems(announcementsContainer, activeAnnouncements);
});

// 8. Fetch weather data
fetch('https://api.openweathermap.org/data/2.5/weather?...')
  .then(res => res.json())
  .then(data => {
    // 9. Display weather
    weatherDiv.textContent = `${data.main.temp}°C`;
  });

// 10. User sees updated display
// - Announcements panel populated
// - Events panel populated
// - Weather widget showing current conditions
// - Time/date widgets updating every second
```

---

## 6. Feature Implementations

### Feature 1: Real-Time Announcements

**HTML:**
```html
<section class="panel announcements-panel">
  <div class="panel-header">
    <h2>📢 Announcements</h2>
    <div class="panel-badge">
      <span id="annCount">0</span>
    </div>
  </div>
  <div id="announcements" class="content-list"></div>
</section>
```

**CSS:**
```css
.announcements-panel {
  background: rgba(21, 27, 46, 0.85);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 24px;
}

.announcement {
  padding: 18px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.announcement:hover {
  transform: translateX(6px);
}
```

**JavaScript:**
```javascript
function listenAnnouncements() {
  const q = query(
    collection(db, "announcements"),
    where("startDate", "<=", new Date()),
    orderBy("startDate", "desc")
  );
  
  onSnapshot(q, (snapshot) => {
    const activeAnnouncements = snapshot.docs
      .map(doc => doc.data())
      .filter(item => item.endDate.toDate() >= new Date());
    
    renderItems(announcementsContainer, activeAnnouncements, annCountEl);
  });
}
```

**Result:** Live announcements panel that updates automatically when admin adds/removes content.

---

### Feature 2: Live Weather Widget

**HTML:**
```html
<div class="widget weather-widget">
  <div class="widget-icon">
    <svg><!-- Sun icon --></svg>
  </div>
  <div class="widget-content">
    <div class="widget-label">Weather</div>
    <div id="weather" class="weather-display">Loading...</div>
    <div class="weather-location">Camotes, Cebu</div>
  </div>
</div>
```

**CSS:**
```css
.weather-widget {
  display: flex;
  align-items: center;
  gap: 16px;
}

.weather-icon {
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.15); }
}
```

**JavaScript:**
```javascript
function loadWeather() {
  const API_KEY = "f5168c305674a67a705409181a80046d";
  const LAT = 10.650;
  const LON = 124.350;
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      const temp = Math.round(data.main.temp);
      const desc = data.weather[0].description;
      const feelsLike = Math.round(data.main.feels_like);
      
      weatherDiv.innerHTML = `
        <div style="font-size: 24px; font-weight: 700;">${temp}°C</div>
        <div style="font-size: 12px;">${desc}</div>
        <div style="font-size: 11px;">Feels like ${feelsLike}°C</div>
      `;
    });
}

// Update every 30 minutes
setInterval(loadWeather, 30 * 60 * 1000);
```

**Result:** Live weather widget showing current temperature, conditions, and feels-like temperature for Camotes, Cebu.

---

### Feature 3: Mini Calendar with Current Day Highlight

**HTML:**
```html
<div class="widget mini-calendar-widget">
  <div class="mini-calendar-header">
    <h3 id="calendarMonth">February 2026</h3>
  </div>
  <div class="calendar-grid">
    <div class="calendar-day-header">S</div>
    <div class="calendar-day-header">M</div>
    <!-- ... -->
    <div id="calendarDays" class="calendar-days">
      <!-- Generated by JavaScript -->
    </div>
  </div>
</div>
```

**CSS:**
```css
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.calendar-day.today {
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  color: white;
  font-weight: 700;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.4);
}
```

**JavaScript:**
```javascript
function generateCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  
  // Update month header
  const monthOptions = { month: 'long', year: 'numeric' };
  calendarMonthEl.textContent = now.toLocaleDateString('en-US', monthOptions);
  
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  let html = '';
  
  // Previous month days (grayed out)
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    html += `<div class="calendar-day other-month">${day}</div>`;
  }
  
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === today;
    const todayClass = isToday ? ' today' : '';
    html += `<div class="calendar-day${todayClass}">${day}</div>`;
  }
  
  // Next month days
  const totalCells = firstDay + daysInMonth;
  const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let day = 1; day <= remainingCells; day++) {
    html += `<div class="calendar-day other-month">${day}</div>`;
  }
  
  calendarDaysEl.innerHTML = html;
}

generateCalendar();
```

**Result:** Interactive mini calendar showing current month with today's date highlighted in gradient blue.

---

## 7. Responsive Design Implementation

### Mobile-First Approach

**CSS Media Queries:**

```css
/* Base: Mobile (320px+) */
.three-column-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding: 16px;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .three-column-layout {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 20px;
  }
  
  .sidebar {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

/* Desktop (1200px+) */
@media (min-width: 1200px) {
  .three-column-layout {
    grid-template-columns: 1fr 1fr 400px;
    padding: 24px;
  }
  
  .sidebar {
    grid-column: auto;
    display: flex;
    flex-direction: column;
  }
}

/* Large Desktop (1400px+) */
@media (min-width: 1400px) {
  .three-column-layout {
    max-width: 1920px;
    margin: 0 auto;
  }
}
```

**Responsive Behavior:**
- **Mobile (320-767px):** Single column, stacked layout
- **Tablet (768-1199px):** Two columns for content, widgets in grid below
- **Desktop (1200px+):** Three columns (announcements, events, sidebar)
- **Large (1400px+):** Centered with max-width

---

## 8. Performance Optimization

### Loading Strategy

```html
<!-- 1. Preconnect to External Resources -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- 2. Async Font Loading -->
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk&family=Inter&display=swap" rel="stylesheet">

<!-- 3. Module Scripts (Deferred by Default) -->
<script type="module" src="app.js"></script>
```

### Caching Strategy

```javascript
// Firebase Offline Persistence
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      // Multiple tabs open
    } else if (err.code == 'unimplemented') {
      // Browser doesn't support
    }
  });

// Service Worker for Static Assets (Optional)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('SW registered'));
}
```

### Lazy Loading Images

```html
<img src="ctulogo.jpg" alt="CTU Logo" loading="lazy" />
```

---

## 9. Security Implementation

### Frontend Security Measures

```javascript
// 1. Input Sanitization
function sanitizeInput(input) {
  const div = document.createElement('div');
  div.textContent = input; // Safe text insertion
  return div.innerHTML;
}

// 2. XSS Prevention
// SAFE: Using textContent
div.textContent = userInput;

// UNSAFE: Using innerHTML with user data
// div.innerHTML = userInput; // Never do this!

// 3. Firebase Security Rules
// File: firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /announcements/{document} {
      allow read: if true;  // Public can read
      allow write: if request.auth != null;  // Only authenticated admin
    }
    match /events/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Authentication Flow

```javascript
// Admin Login (admin.js)
import { signInWithEmailAndPassword } from "firebase/auth";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (err) {
    console.error("Login error:", err);
    showMessage("Invalid credentials", "error");
  }
});

// Protected Dashboard (dashboard.js)
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html"; // Redirect to login
  }
});
```

---

## 10. Maintenance & Version Control

### Git Workflow

```bash
# Development Workflow
git checkout -b feature/academic-calendar
# Make changes...
git add .
git commit -m "Add academic calendar integration"
git push origin feature/academic-calendar

# Merge to main
git checkout main
git merge feature/academic-calendar
git push origin main

# GitHub Pages auto-deploys from main branch
# Changes live within 1-2 minutes
```

### Content Updates

```
Admin Dashboard Flow:

1. Admin logs in
   └─> dashboard.html

2. Creates new announcement
   └─> dashboard.js → addDoc()

3. Firebase stores data
   └─> Firestore collection

4. Real-time listener triggers
   └─> onSnapshot() in app.js

5. Display updates automatically
   └─> No refresh needed!
```

---

## 11. System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      USER DEVICES (LAN)                     │
│  Desktop PCs  │  Laptops  │  Tablets  │  Mobile Phones     │
└────────────────────────┬────────────────────────────────────┘
                         │
            ┌────────────┴────────────┐
            │   Campus Router/LAN     │
            └────────────┬────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    ┌────▼────┐    ┌─────▼─────┐   ┌────▼────┐
    │ GitHub  │    │ Firebase  │   │ Weather │
    │  Pages  │    │ Firestore │   │   API   │
    └────┬────┘    └─────┬─────┘   └────┬────┘
         │               │               │
         └───────────────┼───────────────┘
                         │
                  ┌──────▼──────┐
                  │   Browser   │
                  │  ┌────────┐ │
                  │  │  HTML  │ │
                  │  │  CSS   │ │
                  │  │   JS   │ │
                  │  └────────┘ │
                  └─────────────┘
```

---

## 12. Conclusion

The CTU Digital Bulletin Board System successfully implements the IPOO framework through modern web technologies:

### **INPUT** → Code Mapping:
- Firebase Firestore queries (`listenAnnouncements()`, `listenEvents()`)
- OpenWeatherMap API calls (`loadWeather()`)
- User input from admin dashboard

### **PROCESS** → Code Mapping:
- Data filtering by date (`filter()` functions)
- Content rendering (`renderItems()`)
- Calendar generation (`generateCalendar()`)
- Real-time updates (`onSnapshot()` listeners)

### **OUTPUT** → Code Mapping:
- HTML structure (three-column layout)
- CSS styling (glassmorphism, animations)
- JavaScript DOM manipulation (dynamic content)

### **OUTCOME** → System Benefits:
- ✅ Faster information dissemination
- ✅ Centralized communication platform
- ✅ Reduced administrative workload
- ✅ Enhanced student engagement
- ✅ Modernized campus infrastructure

### Technology Stack Summary:
- **Frontend:** HTML5, CSS3, JavaScript ES6+
- **Backend:** Firebase (Firestore + Authentication)
- **APIs:** OpenWeatherMap
- **Hosting:** GitHub Pages
- **Network:** Campus LAN with internet connectivity
- **Version Control:** Git + GitHub

The system demonstrates how theoretical frameworks (IPOO) translate into practical implementations through carefully structured code, creating a real-world solution for campus communication challenges.

---

**Document Version:** 1.0  
**Date:** February 10, 2026  
**Prepared by:** CTU-SF Development Team
