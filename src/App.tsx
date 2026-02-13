import { useState } from "react";
import { UploadExcel } from "./components/UploadExcel";
import type { Venda } from "./types/Venda";
import { cleanData } from "./utils/cleanData";

function App() {
  const [dados, setDados] = useState<Venda[]>([]);

  return (
    <div>
      <h1>Dashboard de Vendas</h1>

      <UploadExcel onDataLoaded={(rows) => setDados(cleanData(rows))} />

      <pre>{JSON.stringify(dados, null, 2)}</pre>
    </div>
  );
}

export default App;
