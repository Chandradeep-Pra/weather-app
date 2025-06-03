"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useGlobalContext } from "./globalCtx"; 
const ImmersiveWeatherContext = createContext({ scene: null });

export const ImmersiveWeatherProvider = ({ children }) => {
  const { weatherData } = useGlobalContext();
  const [scene, setScene] = useState(null);

  useEffect(() => {
    if (!weatherData?.weather?.[0]) return;

    const condition = weatherData.weather[0].main.toLowerCase();
    // console.log("Live weather:", condition);

    // Map weather condition to scene name
    if (condition.includes("rain")) {
      setScene("rain");
    } else if (condition.includes("snow")) {
      setScene("snow");
    } else if (condition.includes("wind") || weatherData.wind?.speed > 6) {
      setScene("wind");
    } else if (condition.includes("clear")) {
      setScene("clear"); // can be starfield or no scene
    } else if (condition.includes("cloud")) {
      setScene("cloudy");
    } else {
      setScene(null); // default or fallback
    }
  }, [weatherData]);

  return (
    <ImmersiveWeatherContext.Provider value={{ scene }}>
      {children}
    </ImmersiveWeatherContext.Provider>
  );
};

export const useImmersiveWeather = () => useContext(ImmersiveWeatherContext);
