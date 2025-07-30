
const ipDisplay = document.getElementById("ip");
const locationDisplay = document.getElementById("location");
const timezoneDisplay = document.getElementById("timezone");
const ispDisplay = document.getElementById("isp");
const form = document.getElementById("search-form");
const input = document.getElementById("ip-input");

// Initialize Leaflet map
let map = L.map("map").setView([0, 0], 13);
let marker = L.marker([0, 0]).addTo(map);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Fetch geolocation data
// Secure: no API key exposed
async function getGeoData(ip = "") {
  const response = await fetch(`/api/ip-lookup?ip=${ip}`);
  const data = await response.json();
  return data;
}


// Update UI and map
function updateUI(data) {
  const { ip, isp, location } = data;

  ipDisplay.textContent = ip;
  locationDisplay.textContent = `${location.city}, ${location.region}, ${location.country}`;
  timezoneDisplay.textContent = `UTC ${location.timezone}`;
  ispDisplay.textContent = isp;

  const lat = location.lat;
  const lng = location.lng;

  map.setView([lat, lng], 13);
  marker.setLatLng([lat, lng]);
}

// Initial load: get user's IP info
(async () => {
  try {
    const data = await getGeoData();
    updateUI(data);
  } catch (err) {
    alert("Error fetching initial IP data");
    console.error(err);
  }
})();

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const ip = input.value.trim();

  if (!ip) return;

  try {
    const data = await getGeoData(ip);
    updateUI(data);
  } catch (err) {
    alert("Invalid IP or domain");
    console.error(err);
  }
});
