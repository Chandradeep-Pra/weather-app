"use client";

import { createContext, useContext, useState } from "react";


const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({children}) => {
    const [weatherData, setWeatherData]=useState({});
    return (
        <GlobalContext.Provider value="hello">
            <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext)
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate)

