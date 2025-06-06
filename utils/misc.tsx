import moment from "moment";

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
