import React from 'react'
import '../styles/_weather.styl'

const Weather = ({ isCelsius, weather, weatherIcon, toggleCelsius }) => (
  <div className="weather">
    <h2>Weather in {weather.name}</h2>
    <h3>Temperature: {isCelsius ? weather.temp : parseInt(weather.temp, 10) * 9 / 5 + 32}{String.fromCharCode(176)} {isCelsius ? 'C' : 'F'}</h3>
    <h4>Condition: {weatherIcon.name}</h4>
    <img src={weatherIcon.icon} alt={weatherIcon.name} />
    <button onClick={toggleCelsius}>Switch to {isCelsius ? 'Fahrenheit' : 'Celsius'}</button>
  </div>
)

export default Weather
