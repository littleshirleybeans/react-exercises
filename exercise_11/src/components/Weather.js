import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({profile}) => {
  const [weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    console.log('effect')
    axios
    .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${profile.capital}`)
    .then(response => {
      console.log('promise fulfilled')
      console.log(response)
      console.log(response.data)
      console.log(response.data.current)
      console.log(response.data.current.temperature)
      setWeather(response.data.current)
    })
  }, [])
  console.log('render', weather.length, 'items')
  
  if (weather) {
    return (
      <div>
        <h2>Weather in {profile.capital}</h2>
        <div>
          <strong>temperature: {weather.temperature} Celcius</strong>
        </div>
        <img src={weather.weather_icons} alt={profile.capital}/>
        <div>
          <strong>wind: {weather.wind_speed} mph direction {weather.wind_dir}</strong>
        </div>
        
      </div>
    )
  } else {
    return <div></div>
  }
    
}

export default Weather