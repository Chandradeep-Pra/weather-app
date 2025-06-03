"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, Star, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const themes = ["light", "dark", "immersive"];

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  // Remove all theme classes and add the current one manually on <html> or <body>
  useEffect(() => {
    // You can choose document.documentElement (html) or document.body depending on your CSS
    const el = document.documentElement;

    // Remove all possible theme classes
    themes.forEach((t) => el.classList.remove(t));

    // Add the current theme class
    if (theme) {
      el.classList.add(theme);
    }
  }, [theme]);

  // Pick icon based on current theme
  const getThemeIcon = () => {
    if (theme === "dark") return <MoonIcon size={15} className="rotate-0 scale-100" />;
    if (theme === "immersive") return <Star size={15} className="rotate-0 scale-100 text-red-300" />;
    // Default to light
    return <SunIcon size={15} className="rotate-0 scale-100" />;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {getThemeIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((themeName, i) => {
          const themeIcon =
            themeName === "light" ? (
              <SunIcon size={15} />
            ) : themeName === "dark" ? (
              <MoonIcon size={15} />
            ) : (
              <Star size={15} />
            );

          return (
            <DropdownMenuItem key={i} onClick={() => setTheme(themeName)}>
              <div className="flex gap-2 items-center">
                {themeIcon} <span className="capitalize">{themeName}</span>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeButton;
