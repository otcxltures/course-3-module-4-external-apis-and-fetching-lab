// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";

// Your code here!
const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const alertsDiv = document.getElementById("alerts-display");
const errorDiv = document.getElementById("error-message");

if (button) {
  button.addEventListener("click", getAlerts);
}

function getAlerts() {
  const state = input.value.trim().toUpperCase();

  // clear previous results
  alertsDiv.innerHTML = "";
  errorDiv.textContent = "";
  errorDiv.style.display = "none";
  errorDiv.classList.add("hidden");

  // validate input
  if (!/^[A-Z]{2}$/.test(state)) {
    return displayError("Please enter a valid 2-letter state code.");
  }

  fetch(`${weatherApi}${state}`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch alerts.");
      return res.json();
    })
    .then(data => {
      // clear error if successful
      errorDiv.textContent = "";
      errorDiv.style.display = "none";
      errorDiv.classList.add("hidden");

      const summary = document.createElement("h2");
      summary.textContent = `${data.title}: ${data.features.length}`;
      alertsDiv.appendChild(summary);

      data.features.forEach(feature => {
        const p = document.createElement("p");
        p.textContent = feature.properties.headline;
        alertsDiv.appendChild(p);
      });

      // clear input
      input.value = "";
    })
    .catch(err => displayError(err.message));
}

function displayError(message) {
  errorDiv.textContent = message;
  errorDiv.style.display = "block";
  errorDiv.classList.remove("hidden");
}

module.exports = { getAlerts };
