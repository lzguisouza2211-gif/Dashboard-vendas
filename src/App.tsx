import { useState } from "react";
import { UploadExcel } from "./components/UploadExcel";

function App() {
  const [dados, setDados] = useState<any[]>([]);

  return (
    <div>
      <h1>Dashboard de Vendas</h1>

      <UploadExcel onDataLoaded={setDados} />

      <pre>{JSON.stringify(dados, null, 2)}</pre>
    </div>
  );
}

export default App;
