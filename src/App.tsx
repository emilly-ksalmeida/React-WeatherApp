import { useQuery } from "@tanstack/react-query";
import { getCurrentWeather } from "./api/openmeteo";
import Card from "./components/cards/Card";


function App() {

const { data, isLoading, error} = useQuery({
  queryKey: ["cityName"],
  queryFn: ()=> getCurrentWeather("Goiania")
})

console.log(data)
  return (
    <div>
      {
        isLoading && (
          <p>Estou carregando</p>
        )
      }

      {
        error && (
          <p>{JSON.stringify(error)}</p>
        )
      }
      <h1>Teste</h1>
      <Card>
        {JSON.stringify(data)}
       </Card>
    </div>
  );
}

export default App;
