"use client";

import topCities from "@/utils/topCities";
import { createContext, useContext, useEffect, useState } from "react";
import { debounce } from "lodash";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState({});
  const [airData, setAirData] = useState({});
  const [fiveDayWeatherData, setFiveDayWeatherData] = useState({});
  const [uvData, setUvData] = useState({});

  const [geoCoords, setGeoCoords] = useState(topCities);
  const [inputVal, setInputVal] = useState("");

  const [activeCityCoords, setActiveCityCoords] = useState([
    23.2517399, 87.8667831,
  ]);

  const fetchWeatherData = async (lat,lon) => {
    try {
      const res = await fetch(`api/weather?lat=${lat}&lon=${lon}`);
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

  const fetchAirData = async (lat,lon) => {
    try {
      const res = await fetch(`api/pollution?lat=${lat}&lon=${lon}`);
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

  const fetchFiveDayWeatherData = async (lat,lon) => {
    try {
      const res = await fetch(`api/fiveday-weather?lat=${lat}&lon=${lon}`);
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

  const fetchUvData = async (lat,lon) => {
    try {
      const res = await fetch(`api/uv?lat=${lat}&lon=${lon}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      //   console.log("UV",data)
      setUvData(data);
    } catch (error) {
      console.log("Error fetching UV data", error);
    }
  };

  //geo-coords
  const fetchGeoCoords = async (search) => {
    try {
      const res = await fetch(`api/geo-coords?search=${search}`);
      const data = await res.json();
      // console.log("Geo-coords data", data);
      setGeoCoords(data);
    } catch (e) {
      console.log("Internal server errro, error fetching coordinate");
    }
  };

  // input logic
  const handleInput = (e) => {
    setInputVal(e.target.value);

    if (e.target.value === "") {
      setGeoCoords(topCities);
    }
  };

  // debounce function
  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      fetchGeoCoords(search);
    }, 300);

    if (inputVal) {
      debouncedFetch(inputVal);
    }

    // cleanup
    return () => debouncedFetch.cancel();
  }, [inputVal]);

  useEffect(() => {
    console.log("useEffect called");
    fetchWeatherData(activeCityCoords[0], activeCityCoords[1]);
    fetchAirData(activeCityCoords[0], activeCityCoords[1]);
    fetchFiveDayWeatherData(activeCityCoords[0], activeCityCoords[1]);
    fetchUvData(activeCityCoords[0], activeCityCoords[1]);
    // fetchGeoCoords("siliguri");
  }, [activeCityCoords]);
  return (
    <GlobalContext.Provider
      value={{
        weatherData,
        airData,
        fiveDayWeatherData,
        uvData,
        setActiveCityCoords,
        geoCoords,
        inputVal,
        handleInput,
      }}
    >
      <GlobalContextUpdate.Provider
        value={{
          setActiveCityCoords,
        }}
      >
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
