"use client";

import RainEffect from "./Scenes/RainEffect";
import SnowEffect from "./Scenes/SnowEffect";
import CloudEffect from "./Scenes/CloudEffect";
import WindEffect from "./Scenes/WindEffect";

import { useImmersiveWeather } from "@/context/immersiveWeaatherCtx";
import { useGlobalContext } from "@/context/globalCtx";
import { getSkyColor } from "@/utils/misc";
import ImmersiveNavbar from "../Navbars/ImmersiveNavbar";
import SearchButton from "../Search/SearchButton";

const ImmersiveLayout = () => {
  const { scene } = useImmersiveWeather();
  const { weatherData, airData } = useGlobalContext();

  if (!weatherData?.weather?.[0]) return null;

  const dt = weatherData.dt;
  const sunrise = weatherData.sys.sunrise;
  const sunset = weatherData.sys.sunset;
  const cloudCoverage = weatherData.clouds?.all || 0;
  const weather = weatherData.weather[0].main;

  const { background, timeOfDay, isCloudy } = getSkyColor({
    weather,
    dt,
    sunrise,
    sunset,
    cloudCoverage,
  });

  return (
    <div
      className="relative h-screen w-screen overflow-hidden transition-all duration-1000"
      style={{ background }}
    >
      {/* Immersive Navbar */}
      <div className="absolute z-10 p-4">
        <ImmersiveNavbar />
      </div>

      {/* Debug Panel */}

      {/* <div className="absolute top-4 left-4 z-50 bg-black/50 backdrop-blur-md text-white text-sm p-4 rounded-xl shadow-lg space-y-1">
  <p><span className="font-semibold">Scene:</span> {scene}</p>
  <p><span className="font-semibold">Time of Day:</span> {timeOfDay}</p>
  <p><span className="font-semibold">Daytime:</span> {dt >= sunrise && dt <= sunset ? "Yes" : "No"}</p>
  <p><span className="font-semibold">Weather:</span> {weather}</p>
  <p><span className="font-semibold">Cloud Coverage:</span> {cloudCoverage}%</p>
  <p><span className="font-semibold">Sky:</span> {isCloudy ? "Cloudy" : "Clear"}</p>
</div> */}

      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {scene === "rain" && <RainEffect />}
        {scene === "snow" && <SnowEffect />}
        {scene === "cloudy" && <CloudEffect />}
        {scene === "wind" && <WindEffect />}
      </div>
    </div>
  );
};

export default ImmersiveLayout;
