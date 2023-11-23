import dotenv from "dotenv";
dotenv.config();

  const weatherConfig = ({
    weather_key: process.env.weatherApi
  })
  
  
  export default weatherConfig
  