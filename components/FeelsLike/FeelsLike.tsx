"use client";

import { useGlobalContext } from '@/context/globalCtx';
import React from 'react'
import { Skeleton } from '../ui/skeleton';
import { kelToCel } from '@/utils/misc';
import { Thermometer } from 'lucide-react';

const FeelsLike = () => {
    const { weatherData } = useGlobalContext();

    if(!weatherData || !weatherData?.main || !weatherData?.main?.feels_like) {
         return <Skeleton className="h-[12rem] w-full" />;
    }

    const { feels_like, temp_min, temp_max } = weatherData?.main;

    const feelsLikeObj = (feelsLike: number, minTemp : number, maxTemp: number) => {
        const avgTemp = (minTemp + maxTemp) / 2;
        if (feelsLike < avgTemp-5) {
            return "Feels colder than actual" ;
        }
        if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5){
            return "Feels close to actual";
        }
         if (feelsLike > avgTemp + 5) {
      return "Feels significantly warmer than actual temperature.";
    }

    return "Temperature feeling is typical for this range.";
    }
    const feelsLikeDescription = feelsLikeObj(feels_like, temp_min, temp_max);
  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {<Thermometer size={15} />} Feels Like
        </h2>
        <p className="pt-4 text-2xl">{kelToCel(feels_like)}°</p>
      </div>

      <p className="text-sm">{feelsLikeDescription}</p>
    </div>
  )
}

export default FeelsLike