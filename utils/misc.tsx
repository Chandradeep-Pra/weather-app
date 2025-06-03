import moment from "moment";

type SkyTheme = {
  background: string;
};

export const kelToCel = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};

export const airQualityRatings = [
  {
    rating: 20,
    label: "Good",
    description:
      "Air quality is considered satisfactory, and air pollution poses little or no risk.",
  },
  {
    rating: 40,
    label: "Moderate",
    description:
      "Air quality is acceptable; however, for some pollutants, there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.",
  },
  {
    rating: 60,
    label: "Satisfactory",
    description:
      "Members of sensitive groups may experience health effects. The general public is not likely to be affected.",
  },
  {
    rating: 80,
    label: "Unhealthy",
    description:
      "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.",
  },
  {
    rating: 100,
    label: "Very Unhealthy",
    description:
      "Health alert: everyone may experience more serious health effects.",
  },
  {
    rating: Infinity,
    label: "Hazardous",
    description:
      "Health warnings of emergency conditions. The entire population is more likely to be affected.",
  },
];

export const unixToTime = (unix: number, timezone: number) => {
  return moment
    .unix(unix)
    .utcOffset(timezone / 60)
    .format("HH:mm");
};

export const unixToDay = (unix: number) => {
  return moment.unix(unix).format("ddd");
};

export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num;
  }
};

export const interpolateHSL = (
  hslStart: [number, number, number],
  hslEnd: [number, number, number],
  t: number
): string => {
  const [h1, s1, l1] = hslStart;
  const [h2, s2, l2] = hslEnd;

  const h = h1 + (h2 - h1) * t;
  const s = s1 + (s2 - s1) * t;
  const l = l1 + (l2 - l1) * t;

  return `hsl(${h}, ${s}%, ${l}%)`;
};

//get sky color
export const getSkyColor = ({
  weather,
  dt,
  sunrise,
  sunset,
  cloudCoverage,
}: {
  weather: string;
  dt: number;
  sunrise: number;
  sunset: number;
  cloudCoverage: number;
}) => {
  const hour = new Date(dt * 1000).getHours();

  const getTimeOfDay = () => {
    const morningStart = 5;
    const dayStart = 8;
    const eveningStart = 17;
    const nightStart = 20;

    if (hour >= morningStart && hour < dayStart) return "morning";
    if (hour >= dayStart && hour < eveningStart) return "day";
    if (hour >= eveningStart && hour < nightStart) return "evening";
    return "night";
  };

  const timeOfDay = getTimeOfDay();

  const isCloudy = cloudCoverage > 50;

  // HSL color stops: [Hue, Saturation, Lightness]
  const baseHSL: Record<string, [number, number, number]> = {
    morning: [30, 100, 75],   // soft orange
    day: [210, 90, 85],       // sky blue
    evening: [330, 80, 65],   // pinkish
    night: [240, 40, 15],     // deep navy
  };

  const cloudyHSL: Record<string, [number, number, number]> = {
    morning: [240, 20, 70],
    day: [210, 10, 60],
    evening: [220, 15, 50],
    night: [220, 10, 20],
  };

  const weatherOverrides: Record<
    string,
    [number, number, number] | undefined
  > = {
    rain: [220, 20, 35],
    thunderstorm: [220, 40, 20],
    snow: [200, 30, 90],
    mist: [220, 10, 50],
    fog: [220, 10, 40],
    clear: undefined,
    clouds: isCloudy ? cloudyHSL[timeOfDay] : undefined,
  };

  // Normalize current time between sunrise and sunset to get `t`
  const getTimeProgress = () => {
    const dayDuration = sunset - sunrise;
    if (dt <= sunrise) return 0;
    if (dt >= sunset) return 1;
    return (dt - sunrise) / dayDuration;
  };

  const t = getTimeProgress();

  // Interpolation
  const hslStart = baseHSL[timeOfDay];
  const hslEnd =
    timeOfDay === "morning"
      ? baseHSL["day"]
      : timeOfDay === "day"
      ? baseHSL["evening"]
      : timeOfDay === "evening"
      ? baseHSL["night"]
      : baseHSL["morning"]; 

  const interpolatedBase = interpolateHSL(hslStart, hslEnd, t);

  const override = weatherOverrides[weather];

 const background = override
  ? `hsl(${override.join(",")}%)`
  : interpolatedBase;

  return {
    background,
    timeOfDay,
    isCloudy,
  };
};




export const isColorDark = (hex: string): boolean => {
  const color = hex.replace("#", "");
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  // Perceived brightness formula
  return (r * 0.299 + g * 0.587 + b * 0.114) < 186;
};

// Glow map
export const glowMap: Record<string, string> = {
  thunderstorm: "shadow-[0_0_10px_2px_rgba(255,255,100,0.7)] border-yellow-300",
  snow: "shadow-[0_0_10px_2px_rgba(200,255,255,0.5)] border-cyan-300",
  clear: "shadow-[0_0_10px_2px_rgba(255,255,255,0.2)] border-white/20",
  rain: "shadow-[0_0_10px_2px_rgba(100,200,255,0.4)] border-blue-300",
  clouds: "shadow-[0_0_8px_2px_rgba(200,200,200,0.3)] border-gray-300",
};

// Icon tint map
export const tintMap: Record<string, string> = {
  thunderstorm: "text-yellow-300",
  rain: "text-blue-400",
  snow: "text-cyan-200",
  clear: "text-yellow-200",
  clouds: "text-gray-300",
  drizzle: "text-sky-300",
  haze: "text-amber-200",
  mist: "text-slate-300",
  smoke: "text-zinc-500",
};

