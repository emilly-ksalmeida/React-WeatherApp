import { useEffect } from "react";
import { fetchWeatherApi } from "openmeteo";

function App() {

  async function usarOpenmeteo() {
    //Parametros de pesquisa- cidade Goiânia-GO Brasil
    const params = {
      latitude: -16.6786,
      longitude: -49.2539,
      hourly: ["temperature_2m", "uv_index", "is_day"],
    };
    //URL base:
    const url = "https://api.open-meteo.com/v1/forecast";

    //Função fetch indicada na página do openmeteo do NPM:
    const responses = await fetchWeatherApi(url, params);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const latitude = response.latitude();
    const longitude = response.longitude();
    const elevation = response.elevation();
    const utcOffsetSeconds = response.utcOffsetSeconds();
    
    //Log de teste
    console.log(
      `\nCoordinates: ${latitude}°N ${longitude}°E`,
      `\nElevation: ${elevation}m asl`,
      `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`
    );

    const hourly = response.hourly()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
      hourly: {
        time: Array.from(
          {
            length:
              (Number(hourly.timeEnd()) - Number(hourly.time())) /
              hourly.interval(),
          },
          (_, i) =>
            new Date(
              (Number(hourly.time()) +
                i * hourly.interval() +
                utcOffsetSeconds) *
                1000
            )
        ),
        temperature_2m: Array.from(hourly.variables(0)?.valuesArray() ?? []),
        uv_index: Array.from(hourly.variables(1)?.valuesArray() ?? []),
        is_day: Array.from(hourly.variables(2)?.valuesArray() ?? []),
      },
    };

    // The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
    console.log("\nHourly data (Primeiros 9 pontos):\n", {
      time: weatherData.hourly.time.slice(0, 10),
      temperature_2m: weatherData.hourly.temperature_2m.slice(0, 10),
      uv_index: weatherData.hourly.uv_index.slice(0, 10),
      is_day: weatherData.hourly.is_day.slice(0, 10),
    });
  }

  useEffect(() => {
    usarOpenmeteo();
  }, []);

  return (
    <div>
      <p>teste</p>
    </div>
  );
}

export default App;
