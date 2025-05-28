"use client";

import { createContext, useContext, useEffect, useState } from "react";


const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({children}) => {
    const [weatherData, setWeatherData]=useState({});
    const [airData, setAirData] = useState({});

    const fetchWeatherData = async () => {
        try{
            const res = await fetch("api/weather");
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await res.json();
            // console.log("res",data)
            setWeatherData(data);
        }catch(error){
            console.log("Error fetching weather forecast data", error)
        }
    }

    const fetchAirData = async () => {
        try{
            const res = await fetch("api/pollution");
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await res.json();
            // console.log("Air",data)
            setAirData(data);
        }catch(error){
            console.log("Error fetching air quality data", error)
        }
    }

    useEffect(() => {
        console.log("useEffect called");
        fetchWeatherData();
        fetchAirData();
    },[]);
    return (
        <GlobalContext.Provider value={{weatherData, airData}}>
            <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext)
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate)

