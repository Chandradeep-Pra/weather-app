"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Github, Navigation } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useGlobalContextUpdate } from "@/context/globalCtx";
import { useImmersiveWeather } from "@/context/immersiveWeaatherCtx";
import SearchButton from "../Search/SearchButton";
import WeatherMusic from "../WeatherMusic/WeatherMusic";
import ThemeButton from "../Theme/ThemeButton";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { glowMap, tintMap } from "@/utils/misc";

const ImmersiveNavbar = () => {
  const router = useRouter();
  const { setActiveCityCoords } = useGlobalContextUpdate();
  const { scene } = useImmersiveWeather();
  // const scene = "thunderstorm";

  const [visible, setVisible] = useState(true);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setActiveCityCoords([latitude, longitude]);
        toast.success("Live location set successfully!");
      },
      (error) => {
        toast.error("Failed to get current location");
        console.error("Geolocation error:", error);
      }
    );
  };

  

  const resetHideTimer = () => {
    setVisible(true);
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
    }

    hideTimeout.current = setTimeout(() => {
      setVisible(false);
    }, 5000);
  };

  useEffect(() => {
    window.addEventListener("mousemove", resetHideTimer);
    window.addEventListener("touchstart", resetHideTimer);
    resetHideTimer(); // start timer initially

    return () => {
      window.removeEventListener("mousemove", resetHideTimer);
      window.removeEventListener("touchstart", resetHideTimer);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  return (
    <TooltipProvider delayDuration={200}>
      <div
        className={cn(
          "fixed top-1/2 -translate-y-1/2 right-4 z-30 flex flex-col items-center gap-3 transition-all duration-300",
          "backdrop-blur-md rounded-2xl border p-3 shadow-xl hover:scale-105 hover:p-4",
          !visible && "opacity-0 scale-95 pointer-events-none",
          glowMap[scene] ?? "border-white/10"
        )}
      >
        {/* Search */}
        <SearchButton />

        {/* Location */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "transition-all duration-300 hover:scale-110",
                tintMap[scene] ?? "text-white/80"
              )}
              onClick={handleUseMyLocation}
            >
              <Navigation size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Use My Location</TooltipContent>
        </Tooltip>

        {/* Theme */}
        <Tooltip>
          <TooltipTrigger asChild>
            <ThemeButton />
          </TooltipTrigger>
          <TooltipContent side="left">Toggle Theme</TooltipContent>
        </Tooltip>

        {/* Weather Music */}
        <Tooltip>
          <TooltipTrigger asChild>
            <WeatherMusic />
          </TooltipTrigger>
          <TooltipContent side="left">Weather Music</TooltipContent>
        </Tooltip>

        {/* GitHub */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "transition-all duration-300 hover:scale-110",
                tintMap[scene] ?? "text-white/80"
              )}
              onClick={() => router.push("https://github.com/Chandradeep-Pra")}
            >
              <Github size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">View GitHub</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default ImmersiveNavbar;
