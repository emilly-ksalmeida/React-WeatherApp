import { fetchWeatherApi } from "openmeteo";

function formatToUrlParameter(cityName: string): string {
  const encodedCityName = encodeURIComponent(cityName);
  return encodedCityName;
}

async function getGeocoding(cityName: string) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json&countryCode=BR`
  );
  const data = await response.json();

  const dataGeo = {
    latitude: data.results[0].latitude,
    longitude: data.results[0].longitude,
  };
  return dataGeo;
}

export async function getCurrentWeather(nomeDacidade: string) {
  const cityName = formatToUrlParameter(nomeDacidade);
  const dataGeocoding = await getGeocoding(cityName);
  const { latitude, longitude } = dataGeocoding;

  const params = {
    latitude: latitude,
    longitude: longitude,
    current: ["temperature_2m", "relative_humidity_2m", "rain"],
  };

  const url = "https://api.open-meteo.com/v1/forecast";

  const responses = await fetchWeatherApi(url, params);

  const resDataCity = responses[0];
  const utcOffsetSeconds = resDataCity.utcOffsetSeconds();
  const current = resDataCity.current()!;
  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature_2m: current.variables(0)!.value(),
      relative_humidity_2m: current.variables(1)!.value(),
      rain: current.variables(2)!.value(),
    },
  };

  const weatherDataFormated = {
    currentTime: weatherData.current.time,
    temperature: Math.round(weatherData.current.temperature_2m),
    relativeHumidity: weatherData.current.relative_humidity_2m,
    rain: weatherData.current.rain
  }
  console.log(weatherDataFormated);

  return weatherDataFormated;
}
