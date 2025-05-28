"use client";

import { createContext, useContext, useEffect, useState } from "react";


const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({children}) => {
    const [weatherData, setWeatherData]=useState({});

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

    useEffect(() => {
        console.log("useEffect called");
        fetchWeatherData();
    },[]);
    return (
        <GlobalContext.Provider value={{weatherData, setWeatherData}}>
            <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext)
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate)

