"use client";

import {
  Command,
  CommandInput,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/context/globalCtx";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const SearchButton = () => {
  const { geoCoords, inputVal, handleInput } = useGlobalContext();
  const { setActiveCityCoords } = useGlobalContextUpdate();
  const [hoveredItem, setHoveredItem] = useState<number>(0);

  const getCityCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="text-white hover:text-cyan-300 transition-all"
          title="Search City"
        >
          <Search size={20} />
        </button>
      </DialogTrigger>

      <DialogContent className="p-0 max-w-md rounded-xl overflow-hidden backdrop-blur-md bg-white/10 border border-white/10">
        <Command className="p-4">
          <CommandInput
            placeholder="Search a city..."
            value={inputVal}
            onChangeCapture={handleInput}
          />
          <ul className="px-3 pb-2">
            <p className="p-2 text-sm text-muted-foreground">Suggestions</p>
            {geoCoords?.length === 0 && <p>No geo data</p>}
            {geoCoords?.map((city, i) => (
              <li
                key={i}
                className={`py-3 px-2 text-sm cursor-pointer rounded-md hover:bg-accent ${
                  hoveredItem === i ? "bg-accent" : ""
                }`}
                onClick={() => getCityCoords(city.lat, city.lon)}
                onMouseEnter={() => setHoveredItem(i)}
              >
                <p>{city.name}, {city.state && `${city.state}, `}{city.country}</p>
              </li>
            ))}
          </ul>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchButton;
