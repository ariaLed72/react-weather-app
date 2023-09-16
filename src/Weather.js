import React, { useState } from "react";
import axios from "axios";
import "./style.css";

export default function Weather() {
  let [city, setCity] = useState(null);
  let [temperature, changeTemp] = useState(null);
  let [humidity, changeHumidity] = useState(null);
  let [windSpeed, changeWindSpeed] = useState(null);
  let [description, changeDescription] = useState(null);
  let [icon, changeIcon] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = `9a5dc8766b040bccf4c4d1f2659e8c62`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${event.target.value}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(newWeather);
  }

  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  function newWeather(response) {
    changeTemp(Math.round(response.data.main.temp));
    changeHumidity(Math.round(response.data.main.humidity));
    changeWindSpeed(response.data.wind.speed);
    changeDescription(response.data.weather[0].description);
    changeIcon(
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input type="search" placeholder="Search Here" onChange={updateCity} />
        <input type="submit" value="search" />
      </form>
      <div>
        <ul>
          <li> {city}</li>
          <li>Temperature: {temperature}°F</li>
          <li>Humidity: {humidity}%</li>
          <li>Wind Speed: {windSpeed} mph</li>
          <li>Description: {description}</li>
          <img src={icon} alt={description} />
        </ul>
      </div>
    </div>
  );
}
