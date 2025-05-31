"use client";

import { useGlobalContext } from "@/context/globalCtx";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Cloud, CloudDrizzle, CloudRain, CloudSun } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import moment from "moment";
import { kelToCel } from "@/utils/misc";

const DailyWeather = () => {
  const { weatherData, fiveDayWeatherData } = useGlobalContext();
  const { city, list } = fiveDayWeatherData || {};
  const { weather } = weatherData;
  const today = new Date().toISOString().split("T")[0];

  if (!weather || !city || !list || list.length === 0) {
    return (
      <Skeleton className="h-[12rem] w-full cols-span-2 md:col-span-full " />
    );
  }

  // Filter today's weather data
  const todayWeather = list.filter(
    (weather: { dt_txt: string; main: { temp: number } }) => {
      // const date = new Date(item.dt_txt);
      return weather.dt_txt.startsWith(today);
    }
  );

  const { main: weatherMain } = weather[0] || {};

  const getWIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return <CloudDrizzle size={18} />;
      case "Rain":
        return <CloudRain size={18} />;
      case "Clouds":
        return <Cloud size={18} />;
      case "Clear":
      default:
        return <CloudSun size={18} />;
    }
  };
  return (
    <div className="col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2 pt-6 px-4 h-[12rem] border rounded-xl flex flex-col gap-4 dark:bg-[#0A0A0A] shadow-sm dark:shadow-none ">
      <div className="h-full flex gap-10 overflow-hidden">
        {todayWeather.length > 0 ? (
          <div className="w-full">
            <Carousel>
              <CarouselContent>
                {todayWeather.map(
                  (weather: { dt_txt: string; main: { temp: number } }) => {
                    return <div  key={weather.dt_txt}>
                        <CarouselItem className="flex basis-[8.5rem] flex-col gap-4 cursor-grab">
                            <p className="text-gray-300">
                                {moment(weather.dt_txt).format("HH:mm")}
                            </p>
                            <p>{getWIcon()}</p>
                            <p className="mt-4">{kelToCel(weather.main.temp)}° C</p>
                        </CarouselItem>
                    </div>;
                  }
                )}
              </CarouselContent>
            </Carousel>
          </div>
        ) : (
            <h1 className="text-xl line-through text-rose-500">No Data Available</h1>
        )}
      </div>
    </div>
  );
};

export default DailyWeather;
