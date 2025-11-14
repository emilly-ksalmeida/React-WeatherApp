import { useQuery } from "@tanstack/react-query";
import { getCurrentWeather } from "./api/openmeteo";


function App() {

const { data } = useQuery({
  queryKey: ["cityName"],
  queryFn: ()=> getCurrentWeather("Goiânia")
})

  return (
    <div>
      <h1>Teste</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

export default App;
