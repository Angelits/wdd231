const apiKey = "8a44046f0f6546e0d3905d16f8fd4582";
const city = "Progreso";
const units = "imperial"; // "imperial" => °F, "metric" => °C
const locale = "en-US";

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${units}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${units}`;
const membersJsonPath = "data/members.json";
const eventsJsonPath = "data/events.json";

/* ====== HELPERS ====== */
const unitSymbol = () => (units === "imperial" ? "°F" : units === "metric" ? "°C" : "°");
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");
const escapeHtml = (str) =>
  String(str || "").replace(/[&<>"']/g, (s) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[s]));

function formatTimeUnix(unix, tzOffsetSeconds = 0) {
  return new Date((unix + (tzOffsetSeconds || 0)) * 1000).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
}

// MOBILE MENU TOGGLE
function setupMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (!toggle || !navLinks) return;

  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active"); // toggle visibility
    toggle.textContent = isOpen ? "✖" : "☰"; // swap icon
    toggle.setAttribute("aria-expanded", isOpen);
  });

  // Optional: close menu when a link is clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        toggle.textContent = "☰";
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
})

/* ====== EVENTS SECTION ====== */
async function loadEvents() {
  const container = document.getElementById("events-container");
  if (!container) return;

  container.innerHTML = `
    <div class="event-card" role="listitem">
      <h3>Upcoming Event</h3>
      <p><strong>Date:</strong> --</p>
      <p><strong>Location:</strong> --</p>
      <p>Details will be updated soon.</p>
    </div>
  `;
}

/* ====== LOAD CURRENT WEATHER ====== */
async function loadCurrentWeather() {
  try {
    const res = await fetch(currentUrl, { cache: "no-store" });
    if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
    const data = await res.json();

    const iconEl = document.getElementById("current-icon");
    const tempEl = document.getElementById("current-temp");
    const descEl = document.getElementById("current-desc");
    const humidityEl = document.getElementById("current-humidity");
    const highLowEl = document.getElementById("current-highlow");

    if (iconEl && data.weather?.[0]) {
      iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      iconEl.alt = data.weather[0].description || "weather icon";
    }
    if (tempEl) tempEl.textContent = `${Number(data.main.temp).toFixed(1)}${unitSymbol()}`;
    if (descEl) descEl.textContent = cap(data.weather?.[0]?.description || "");
    if (humidityEl) humidityEl.textContent = `Humidity: ${data.main.humidity}%`;
    if (highLowEl) highLowEl.textContent = `High: ${Number(data.main.temp_max).toFixed(1)}${unitSymbol()} · Low: ${Number(data.main.temp_min).toFixed(1)}${unitSymbol()}`;

    const container = document.querySelector(".card--current .weather-info");
    if (container && data.sys) {
      const existing = container.querySelector(".sunrise-sunset");
      if (existing) existing.remove();
      const sun = document.createElement("p");
      sun.className = "sunrise-sunset";
      const tz = data.timezone ?? 0;
      sun.textContent = `Sunrise: ${formatTimeUnix(data.sys.sunrise, tz)} · Sunset: ${formatTimeUnix(data.sys.sunset, tz)}`;
      container.appendChild(sun);
    }
  } catch (err) {
    console.error("loadCurrentWeather:", err);
    const tempEl = document.getElementById("current-temp");
    const container = document.querySelector(".card--current .weather-info");
    if (tempEl) tempEl.textContent = "--";
    if (container) container.insertAdjacentHTML("beforeend", '<p style="color:#b00;">Unable to load current weather.</p>');
  }
}

/* ====== LOAD FORECAST ====== */
async function loadForecast() {
  try {
    const res = await fetch(forecastUrl, { cache: "no-store" });
    if (!res.ok) throw new Error(`Forecast API error: ${res.status}`);
    const data = await res.json();

    const list = Array.isArray(data.list) ? data.list : [];
    const dailyMap = new Map();

    // Pick only one forecast per day (prefer 12:00:00)
    list.forEach(item => {
      const dateStr = new Date(item.dt_txt).toDateString();
      const timeStr = item.dt_txt.split(" ")[1];
      if (!dailyMap.has(dateStr) || timeStr === "12:00:00") {
        dailyMap.set(dateStr, item);
      }
    });

    const daily = Array.from(dailyMap.values()).slice(0, 3);

    const forecastListEl = document.getElementById("forecast-list");
    if (!forecastListEl) throw new Error("Missing #forecast-list element");
    forecastListEl.innerHTML = "";

    const todayDate = new Date().toDateString();

    daily.forEach(day => {
      const icon = day.weather?.[0]?.icon || "";
      const desc = cap(day.weather?.[0]?.description || "");
      const max = day.main?.temp_max != null ? Number(day.main.temp_max).toFixed(1) : "--";
      const min = day.main?.temp_min != null ? Number(day.main.temp_min).toFixed(1) : "--";
      const forecastDate = new Date(day.dt_txt);
      const name = forecastDate.toDateString() === todayDate
        ? "Today"
        : forecastDate.toLocaleDateString(locale, { weekday: "short" });

      const itemEl = document.createElement("div");
      itemEl.className = "forecast-item";
      itemEl.setAttribute("role", "listitem"); // accessibility improvement
      itemEl.innerHTML = `
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <img src="https://openweathermap.org/img/wn/${escapeHtml(icon)}.png" alt="${escapeHtml(desc)}" style="width:34px;height:34px;">
          <div>
            <p class="day">${escapeHtml(name)}</p>
            <p class="desc">${escapeHtml(desc)}</p>
          </div>
        </div>
        <div style="text-align:right;">
          <p class="temp">${escapeHtml(max)}${unitSymbol()}</p>
          <p>${escapeHtml(min)}${unitSymbol()}</p>
        </div>
      `;
      forecastListEl.appendChild(itemEl);
    });
  } catch (err) {
    console.error("loadForecast:", err);
    const forecastListEl = document.getElementById("forecast-list");
    if (forecastListEl) forecastListEl.innerHTML = '<p style="color:#b00;">Unable to load forecast.</p>';
  }
}

/* ====== SPOTLIGHTS ====== */
async function loadSpotlights() {
  const container = document.getElementById("spotlights");
  if (!container) return;
  container.innerHTML = "<p>Loading spotlights...</p>";

  try {
    const res = await fetch(membersJsonPath, { cache: "no-store" });
    if (!res.ok) throw new Error(`members.json fetch error: ${res.status}`);
    const members = await res.json();
    if (!Array.isArray(members)) throw new Error("members.json did not return an array");

    let filtered = members.filter(m => Number(m.membership) === 3 || Number(m.membership) === 2);
    if (!filtered.length) { container.innerHTML = "<p>No spotlight members available.</p>"; return; }

    filtered = filtered.sort(() => 0.5 - Math.random());
    const take = Math.min(filtered.length, Math.floor(Math.random() * 2) + 2);
    const chosen = filtered.slice(0, take);

    container.innerHTML = "";
    chosen.forEach(member => {
      const name = escapeHtml(member.name || "Unnamed");
      const img = escapeHtml(member.image || "placeholder-icon.png");
      const phone = escapeHtml(member.phone || "");
      const address = escapeHtml(member.address || "");
      const url = member.url ? escapeHtml(member.url) : "";
      const membershipLabel = Number(member.membership) === 3 ? "Gold" : "Silver";

      const card = document.createElement("div");
      card.className = "spotlight-card";
      card.setAttribute("role", "listitem"); // accessibility improvement
      card.innerHTML = `
        <img src="${img}" alt="${name}" loading="lazy">
        <div class="spotlight-body">
          <h3>${name}</h3>
          <p><strong>Membership: </strong>${membershipLabel}</p>
          ${address ? `<p>📍 ${address}</p>` : ""}
          ${phone ? `<p>📞 ${phone}</p>` : ""}
          ${url ? `<p><a href="${url}" target="_blank" rel="noopener">Visit website</a></p>` : ""}
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error("loadSpotlights:", err);
    container.innerHTML = "<p style='color:#b00;'>Error loading spotlights.</p>";
  }
}

/* ====== FOOTER YEAR ====== */
function setFooterYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

/* ====== INIT ====== */
async function initAll() {
  await Promise.allSettled([loadEvents(), loadCurrentWeather(), loadForecast(), loadSpotlights()]);
  setFooterYear();
}

document.addEventListener("DOMContentLoaded", initAll);
