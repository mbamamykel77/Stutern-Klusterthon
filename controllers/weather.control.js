import weatherConfig from "../config/weather.js";
import axios from "axios";

const fetchWeatherData = async (req, res, next) => {
    try {
    //   const apiKey = weatherConfig;
      
      // Get user's location from the request (you may need to handle this differently in a real app)
      const { latitude, longitude } = req.query;
  
      if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
      }
  
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherConfig.weather_key}`;
  
      const response = await axios.get(apiUrl);
      req.weatherData = response.data; 
      const weatherResult = req.weatherData
    //   next();

    res.status(200).json({
        status: "success",
        message: "weather data successfully retrieved",
        data: weatherResult
    });
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export default fetchWeatherData
  