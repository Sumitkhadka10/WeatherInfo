let myWeather = {
  apiKey: "dd0bb92d325265ceb8ccf893dd2b9e0d",
  fetchWeather: function(city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then(response => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then(data => this.displayWeather(data));
  },
  displayWeather: function(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");

    // Add date and time
    function showDateTime() {
      const date = new Date();
      const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
      const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
      const dateString = date.toLocaleDateString("en-US", dateOptions);
      const timeString = date.toLocaleTimeString("en-US", timeOptions);
      document.querySelector(".date").innerText = dateString;
      document.querySelector(".time").innerText = timeString;
    }
    showDateTime();
  },
  search: function() {
    this.fetchWeather(document.querySelector(".search-bar").value);
  }
};

document.querySelector(".search button").addEventListener("click", function() {
  myWeather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
  if (event.key == "Enter") {
    myWeather.search();
  }
});

myWeather.fetchWeather("Torrance");
