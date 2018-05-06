import React, { Component } from 'react'
import Header from '../components/Header'
import Weather from '../components/Weather'
import Footer from '../components/Footer'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      location: {
        latitude: 0,
        longitude: 0
      },
      weather: {},
      weatherIcon: {
        name: '',
        icon: '#'
      },
      isCelsius: true
    }

    this.getLocation = this.getLocation.bind(this)
    this.getWeather = this.getWeather.bind(this)
    this.toggleCelsius = this.toggleCelsius.bind(this)
  }

  componentDidMount () {
    this.getLocation()
  }

  getLocation () {
    navigator.geolocation.getCurrentPosition(pos => {
      this.setState({
        location: {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        }
      }, () => this.getWeather())
    })
  }

  getWeather () {
    const { latitude, longitude } = this.state.location
    fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`)
      .then(response => response.json())
      .then(data => {
        const { icon, main } = data.weather[0]
        const { name } = data
        const { temp } = data.main
        this.setState({
          weatherIcon: {
            name: main,
            icon
          },
          weather: {
            temp: Math.round(temp),
            name
          }
        })
      })
  }

  toggleCelsius () {
    this.setState({ isCelsius: !this.state.isCelsius })
  }

  render () {
    const { isCelsius, weather, weatherIcon } = this.state
    return (
      <div>
        <Header />
        <Weather
          isCelsius={isCelsius}
          weatherIcon={weatherIcon}
          weather={weather}
          toggleCelsius={this.toggleCelsius}
        />

        <Footer />
      </div>
    )
  }
}

export default App
