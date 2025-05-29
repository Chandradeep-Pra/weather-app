"use client";

import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState({});
  const [airData, setAirData] = useState({});
  const [fiveDayWeatherData, setFiveDayWeatherData] = useState({});
  const [uvData, setUvData] = useState({});

  const fetchWeatherData = async () => {
    try {
      const res = await fetch("api/weather");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      // console.log("res",data)
      setWeatherData(data);
    } catch (error) {
      console.log("Error fetching weather forecast data", error);
    }
  };

  const fetchAirData = async () => {
    try {
      const res = await fetch("api/pollution");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      // console.log("Air",data)
      setAirData(data);
    } catch (error) {
      console.log("Error fetching air quality data", error);
    }
  };

  const fetchFiveDayWeatherData = async () => {
    try {
      const res = await fetch("api/fiveday-weather");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
    //   console.log("5 day",data)
      setFiveDayWeatherData(data);
    } catch (error) {
      console.log("Error fetching 5-day weather data", error);
    }
  };

  const fetchUvData = async () => {
    try {
      const res = await fetch("api/uv");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
    //   console.log("UV",data)
      setUvData(data);
    } catch (error) {
      console.log("Error fetching UV data", error);
    }
  } 

  useEffect(() => {
    console.log("useEffect called");
    fetchWeatherData();
    fetchAirData();
    fetchFiveDayWeatherData();
    fetchUvData();
  }, []);
  return (
    <GlobalContext.Provider value={{ weatherData, airData, fiveDayWeatherData, uvData }}>
      <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
