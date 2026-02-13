import { db } from "../firebase/firebaseConfig.js";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// =======================
// DOM ELEMENTS
// =======================
const announcementsContainer = document.getElementById("announcements");
const eventsContainer = document.getElementById("events");

// Header counts
const annCountEl = document.getElementById("annCount");
const eventCountEl = document.getElementById("eventCount");

// Sidebar widgets
const currentTimeEl = document.getElementById("currentTime");
const currentPeriodEl = document.getElementById("currentPeriod");
const currentDateEl = document.getElementById("currentDate");
const currentDayEl = document.getElementById("currentDay");
const weatherEl = document.getElementById("weather");

// Stats
const totalAnnouncementsEl = document.getElementById("totalAnnouncements");
const totalEventsEl = document.getElementById("totalEvents");

// =======================
// CLOCK & CALENDAR
// =======================
function updateDateTime() {
  const now = new Date();
  
  // Time with seconds
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  const timeStr = now.toLocaleTimeString('en-US', timeOptions);
  
  // Period (AM/PM)
  const period = now.getHours() >= 12 ? 'PM' : 'AM';
  
  // Date
  const dateOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  };
  const dateStr = now.toLocaleDateString('en-US', dateOptions);
  
  // Day of week
  const dayOptions = { weekday: 'long' };
  const dayStr = now.toLocaleDateString('en-US', dayOptions);
  
  // Update DOM
  if (currentTimeEl) currentTimeEl.textContent = timeStr;
  if (currentPeriodEl) currentPeriodEl.textContent = period;
  if (currentDateEl) currentDateEl.textContent = dateStr;
  if (currentDayEl) currentDayEl.textContent = dayStr;
}

// Update every second
setInterval(updateDateTime, 1000);
updateDateTime();

// =======================
// WEATHER
// =======================
function loadWeather() {
  const API_KEY = "f5168c305674a67a705409181a80046d";
  const LAT = 10.650; // Camotes, Cebu
  const LON = 124.350;

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      if (data.cod && Number(data.cod) !== 200) {
        console.error("OpenWeatherMap error:", data);
        if (weatherEl) weatherEl.textContent = "Weather unavailable";
        return;
      }

      const temp = Math.round(data.main.temp);
      const desc = data.weather?.[0]?.description || "Unknown";
      const prettyDesc = desc
        .split(" ")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

      if (weatherEl) {
        weatherEl.textContent = `${temp}°C • ${prettyDesc}`;
      }
    })
    .catch(err => {
      console.error("Weather fetch failed:", err);
      if (weatherEl) weatherEl.textContent = "Weather unavailable";
    });
}

// Load weather immediately and refresh every 30 minutes
loadWeather();
setInterval(loadWeather, 30 * 60 * 1000);

// =======================
// RENDER FUNCTION
// =======================
function renderItems(container, data, type = 'announcement') {
  if (data.length === 0) {
    container.innerHTML = `
      <div style="
        padding: 40px 20px; 
        text-align: center; 
        opacity: 0.5;
        border: 2px dashed var(--border-color);
        border-radius: 12px;
      ">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style="margin: 0 auto 12px; opacity: 0.3;">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M8 12H16M12 8V16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <p style="margin: 0; color: var(--text-muted); font-size: 14px;">No active ${type}s yet</p>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: var(--text-muted);">Check back later for updates!</p>
      </div>
    `;
    return;
  }

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

// =======================
// FIRESTORE LISTENERS
// =======================
let totalAnnouncements = 0;
let totalEvents = 0;

function listenAnnouncements() {
  const now = new Date();

  const q = query(
    collection(db, "announcements"),
    where("startDate", "<=", now),
    orderBy("startDate", "desc")
  );

  onSnapshot(
    q,
    (snapshot) => {
      const now2 = new Date();

      const data = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(item => {
          const end = item.endDate?.toDate ? item.endDate.toDate() : item.endDate;
          return end && end >= now2;
        });

      totalAnnouncements = data.length;
      
      renderItems(announcementsContainer, data, 'announcement');
      
      // Update counts
      if (annCountEl) annCountEl.textContent = totalAnnouncements;
      if (totalAnnouncementsEl) totalAnnouncementsEl.textContent = totalAnnouncements;
    },
    (err) => {
      console.error("Announcements snapshot error:", err);
      if (announcementsContainer) {
        announcementsContainer.innerHTML = `
          <p style="opacity:.6; text-align: center; padding: 20px;">
            Error loading announcements
          </p>
        `;
      }
    }
  );
}

function listenEvents() {
  const now = new Date();

  const q = query(
    collection(db, "events"),
    where("startDate", "<=", now),
    orderBy("startDate", "asc")
  );

  onSnapshot(
    q,
    (snapshot) => {
      const now2 = new Date();

      const data = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(item => {
          const end = item.endDate?.toDate ? item.endDate.toDate() : item.endDate;
          return end && end >= now2;
        });

      totalEvents = data.length;
      
      renderItems(eventsContainer, data, 'event');
      
      // Update counts
      if (eventCountEl) eventCountEl.textContent = totalEvents;
      if (totalEventsEl) totalEventsEl.textContent = totalEvents;
    },
    (err) => {
      console.error("Events snapshot error:", err);
      if (eventsContainer) {
        eventsContainer.innerHTML = `
          <p style="opacity:.6; text-align: center; padding: 20px;">
            Error loading events
          </p>
        `;
      }
    }
  );
}

// =======================
// FAILSAFE AUTO-REFRESH
// =======================
setInterval(() => {
  console.log('Auto-refreshing display...');
  location.reload();
}, 1000 * 60 * 30); // every 30 minutes

// =======================
// SMOOTH SCROLL ANIMATIONS
// =======================
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.classList && node.classList.contains('announcement')) {
        node.style.animation = 'slideIn 0.4s ease';
      }
    });
  });
});

if (announcementsContainer) {
  observer.observe(announcementsContainer, { childList: true });
}

if (eventsContainer) {
  observer.observe(eventsContainer, { childList: true });
}

// =======================
// INIT DISPLAY APP
// =======================
console.log('CTU Digital Bulletin Board - Display initialized');
listenAnnouncements();
listenEvents();

// Add load animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  console.log('Display loaded successfully');
});
