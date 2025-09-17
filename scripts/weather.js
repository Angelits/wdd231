// Select HTML elements
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

// API URL (Trier, Germany) with your key
const url = "https://api.openweathermap.org/data/2.5/weather?lat=49.756&lon=6.641&units=metric&appid=8a44046f0f6546e0d3905d16f8fd4582";

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // check structure
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log("Fetch error:", error);
  }
}

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp.toFixed(1)}&deg;C`;

  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  let desc = data.weather[0].description;

  weatherIcon.setAttribute("src", iconsrc);
  weatherIcon.setAttribute("alt", desc);
  captionDesc.textContent = desc;
}

// Run fetch
apiFetch();