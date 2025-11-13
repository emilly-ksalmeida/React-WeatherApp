import { getCurrentWeather } from "./api/openmeteo.ts";

function App() {

  //Teste
  const city = "Goiânia";
  const currentWeather = getCurrentWeather(city);
  console.log(currentWeather);

  return (
    <div>
      <h1>Teste Console</h1>
    </div>
  );
}

export default App;
