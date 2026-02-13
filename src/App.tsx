import { useState } from "react";
import { UploadExcel } from "./components/UploadExcel";
import type { Venda } from "./types/Venda";
import { cleanData } from "./utils/cleanData";
import {
  calcularReceitaTotal,
  calcularTotalPedidos,
  calcularTicketMedio
} from "./utils/metrics";
import { MetricCard } from "./components/MetricCard";

function App() {
  const [dados, setDados] = useState<Venda[]>([]);
  const receitaTotal = calcularReceitaTotal(dados);
  const totalPedidos = calcularTotalPedidos(dados);
  const ticketMedio = calcularTicketMedio(dados);

  return (
    <div>
      <h1>Dashboard de Vendas</h1>

      <UploadExcel onDataLoaded={(rows) => setDados(cleanData(rows))} />
      <h2>Métricas</h2>
    <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
      <MetricCard
        title="Receita Total"
        value={`R$ ${receitaTotal.toFixed(2)}`}
      />

      <MetricCard
        title="Total de Pedidos"
        value={totalPedidos}
      />

      <MetricCard
        title="Ticket Médio"
        value={`R$ ${ticketMedio.toFixed(2)}`}
      />
    </div>
      <h2>Dados Brutos</h2>

      <pre>{JSON.stringify(dados, null, 2)}</pre>
    </div>
  );
}

export default App;
