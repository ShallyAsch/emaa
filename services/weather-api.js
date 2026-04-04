import { HOTEL_LOCATION } from '../config.js';

/**
 * _translateWeatherCode - Maps WMO codes to human-readable strings
 * @code: The integer code from Open-Meteo
 *
 * Return: A string describing the weather condition
 */
const _translateWeatherCode = (code) => {
    const mapping = {
        0: "Clear sky",
        1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
        45: "Foggy", 48: "Rime fog",
        51: "Light drizzle", 53: "Moderate drizzle", 55: "Dense drizzle",
        61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
        80: "Slight showers", 81: "Moderate showers", 82: "Violent showers",
        95: "Thunderstorm"
    };
    return mapping[code] || "Unknown";
};

/**
 * getWeatherData - Fetches and processes weather data from Open-Meteo
 * @address: Object containing lat and long
 *
 * Return: Object with temp, condition, and solar event data, or null on fail
 */
async function getWeatherData(address) {
    const { lat, long } = address;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,weather_code&daily=sunrise,sunset&timezone=auto`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const temp = data.current.temperature_2m;
        const condition = _translateWeatherCode(data.current.weather_code);
        const now = new Date();
        
        const sunriseToday = new Date(data.daily.sunrise[0]);
        const sunsetToday = new Date(data.daily.sunset[0]);
        const sunriseTomorrow = new Date(data.daily.sunrise[1]);

        let targetTime;
        let eventLabel;

        if (now < sunriseToday) {
            targetTime = sunriseToday;
            eventLabel = "sunrise";
        } else if (now < sunsetToday) {
            targetTime = sunsetToday;
            eventLabel = "sunset";
        } else {
            targetTime = sunriseTomorrow;
            eventLabel = "sunrise";
        }

        return {
            temp: temp,
            condition: condition,
            unit: "celsius",
            timestamp: Math.floor(now.getTime() / 1000),
            next_event: {
                label: eventLabel,
                time: Math.floor(targetTime.getTime() / 1000)
            }
        };
    } catch (error) {
        return null;
    }
}

/**
 * createWeatherService - Closure factory for location-specific weather
 * @location: The coordinates to lock in
 *
 * Return: An async function that returns processed weather data
 */
const createWeatherService = (location) => {
    return async () => {
        return await getWeatherData(location);
    };
};

const getKuriftuWeatherData = createWeatherService(HOTEL_LOCATION);

export { getWeatherData, getKuriftuWeatherData };