import React, { useState } from 'react'
import { Forecast } from './Forecast';
import './WeatherApp.css'
import search_icon from '../Assets/search.png';
import cloud_icon from '../Assets/cloud.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

const WeatherApp = () => {
    let api_key = '19f998f089728e00dd003cb89e654d10';

    const [wicon, setWicon] = useState(cloud_icon);
    const [data, setData] = useState(null);
    const [city, setCity] = useState('London');

    const search = async () => {
        const element = document.getElementsByClassName('cityInput');
        if (element[0].value === "") {
            return 0;
        }
    
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    
        try {
            let response = await fetch(url);
    
            if (!response.ok) {
                // Handle invalid response (e.g., city not found)
                alert('Invalid location. Please enter a valid city name.');
                return;
            }
    
            let data = await response.json();
            setData(data);
            setCity(data.name);
    
            const humidity = document.getElementsByClassName('humidity-percent');
            const wind = document.getElementsByClassName('wind-rate');
            const temperature = document.getElementsByClassName('weather-temp');
            const location = document.getElementsByClassName('weather-location');
            const description = document.getElementsByClassName('weather-description');
            const minTemp = document.getElementsByClassName('min-temp');
            const maxTemp = document.getElementsByClassName('max-temp');
    
            humidity[0].innerHTML = `${data.main.humidity}%`;
            wind[0].innerHTML = `${data.wind.speed} km/h`;
            temperature[0].innerHTML = `${Math.floor(data.main.temp)}°C`;
            location[0].innerHTML = `${data.name}`;
            description[0].innerHTML = `${data.weather[0].description}`;
            minTemp[0].innerHTML = `Min-Temp:-${data.main.temp_min}°C`;
            maxTemp[0].innerHTML = `Max-Temp:-${data.main.temp_max}°C`;
    
            // Icon according to weather
            setWicon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        } catch (error) {
            // Handle other errors (e.g., network issues)
            alert('An error occurred. Please try again later.');
        }
    };
    let flag = 0;
    const convert = () => {
        if (flag === 0 && data) {
            let currentTempElement = document.getElementsByClassName('weather-temp')[0];
            let celsiusTemperature = data.main.temp;
            let fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32;
            fahrenheitTemperature = Math.floor(fahrenheitTemperature);
            currentTempElement.innerHTML = `${fahrenheitTemperature}°F`;
            flag = 1
        } else if (flag === 1) {
            let currentTempElement = document.getElementsByClassName('weather-temp')[0];
            let celsiusTemperature = data.main.temp;
            celsiusTemperature = Math.floor(celsiusTemperature);
            currentTempElement.innerHTML = `${celsiusTemperature}°C`;
            flag = 0;
            
        }
        else{
            alert('Please enter a city name');
        }
    };
  return (
    <div className='container'>
        <div className='top-bar'>
            <input type='text' placeholder='Search City' className='cityInput'/>
            <div className="search-icon" onClick={()=>{search()}}>
                <img src={search_icon} alt="search-icon" />
            </div>
        </div>
        <div className="body-container">

            <div className="weather-image">
                <img src={wicon} alt="" />
                <div className="weather-description">Weather Description</div>
            </div>
            <div className='body-right'>

                <div className="weather-temp">--°C</div>
                <div className="weather-location">New York</div>
            </div>
            
        </div>
        <div className = 'min-max-temp'>
            <div className="min-temp">Min-Temp: </div>
            <div className="max-temp">Max-Temp: </div>
            <div className="convert-temp-btn">
                <button className='temp-btn' onClick={()=>{convert()}}>Change Unit</button>
            </div>
        </div>
        
        
        <div className="data-container">
            <div className="element">
                <img src={humidity_icon} className='icon' alt=''/>
                <div className="data">
                    <div className="humidity-percent">--%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind_icon} className='icon' alt=''/>
                <div className="data">
                    <div className="wind-rate">-- km/h</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
        {city && <Forecast city={city} />}
    </div>
  )
}
export default WeatherApp;