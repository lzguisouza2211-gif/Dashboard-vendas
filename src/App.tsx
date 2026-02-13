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
import { SalesByCategoryChart } from "./components/SalesByCategoryChart";
import { SalesByMonthChart } from "./components/SalesByMonthChart";

function App() {
  const [dados, setDados] = useState<Venda[]>([]);
  const receitaTotal = calcularReceitaTotal(dados);
  const totalPedidos = calcularTotalPedidos(dados);
  const ticketMedio = calcularTicketMedio(dados);
  

  return (
    <div>
  <h1>Dashboard de Vendas</h1>

  <UploadExcel onDataLoaded={(rows) => setDados(cleanData(rows))} />

  {/* seção métricas */}
    
  <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
    <MetricCard title="Receita Total" value={`R$ ${receitaTotal.toFixed(2)}`} />
    <MetricCard title="Total de Pedidos" value={totalPedidos} />
    <MetricCard title="Ticket Médio" value={`R$ ${ticketMedio.toFixed(2)}`} />
  </div>

  {/* seção gráficos */}
  <div style={{ display: "flex", gap: "40px", marginTop: "40px" }}>
    <SalesByCategoryChart dados={dados} />
    <SalesByMonthChart dados={dados} />
  </div>

</div>



  );
}

export default App;
