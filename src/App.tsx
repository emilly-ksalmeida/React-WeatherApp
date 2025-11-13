import { getGeocoding } from "./api/openmeteo.ts";

function App() {

  getGeocoding("goi%C3%A2nia");

  return (
    <div>
      <p>teste</p>
    </div>
  );
}

export default App;
