import React, { useState, useEffect } from 'react';
import './Forecast.css';

export const Forecast = (props) => {
  const [cityWeather, setCityWeather] = useState('');
  const [fiveDaysForecast, setFiveDaysForecast] = useState([]);
  const [avgTemps, setAvgTemps] = useState([]);
  const [weatherDescriptions, setWeatherDescriptions] = useState([]);
  const apiKey = '19f998f089728e00dd003cb89e654d10';

  useEffect(() => {
    const gettingWeatherDetails = () => {
      const weather_api_url = `https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&units=Metric&appid=${apiKey}`;

      fetch(weather_api_url)
        .then((res) => res.json())
        .then((data) => {
          const forecastDays = [];
          const avgTempsArray = [];
          const weatherDescriptionsArray = [];

          const filteredForecast = data.list.filter(function (forecast) {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!forecastDays.includes(forecastDate)) {
              forecastDays.push(forecastDate);
              return true;
            }
            return false;
          });

          filteredForecast.forEach((day) => {
            const avgTemp = day.main.temp;
            const weatherDescription = day.weather[0].description;

            avgTempsArray.push(avgTemp);
            weatherDescriptionsArray.push(weatherDescription);
          });

          setFiveDaysForecast(filteredForecast);
          setCityWeather(data.city.name);
          setAvgTemps(avgTempsArray);
          setWeatherDescriptions(weatherDescriptionsArray);
        })
        .catch(() => {
          alert('Error Occurred While Fetching the Coordinates of Weather');
        });
    };
    gettingWeatherDetails();
  }, [props.city]);

  return (
    <div>
      <div className="forecast-container">
        <div className="forecast-header">
          <div className="city-name"><h1>Next Week Weather Forecast of {cityWeather}</h1></div>
        </div>
        <div className="forecast-days">
          {fiveDaysForecast.map((day, index) => {
            return (
              <div className="forecast-day" key={index}>
                <div className="forecast-day-date">
                  {new Date(day.dt_txt).toLocaleDateString()}
                </div>
                <div className="forecast-day-avg-temp">
                  <h1>Temp:{avgTemps[index]}°C</h1>
                  
                </div>
                <div className="forecast-day-icon">
                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt=""
                  />
                  <h3 className='forecast-des'>{weatherDescriptions[index]}</h3>
                </div>
                
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
