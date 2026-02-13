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
  // dados base
  const [dados, setDados] = useState<Venda[]>([]);

  // estados de filtro
  const [categoriaFiltro, setCategoriaFiltro] = useState("todas");
  const [mesFiltro, setMesFiltro] = useState("todos");

  // dados filtrados
  const dadosFiltrados = dados.filter((item) => {
    const matchCategoria =
      categoriaFiltro === "todas" || item.categoria === categoriaFiltro;

    const matchMes =
      mesFiltro === "todos" || item.mes === mesFiltro;

    return matchCategoria && matchMes;
  });

  // categorias e meses únicos (automáticos)
  const categorias = [...new Set(dados.map((d) => d.categoria))];
  const ordemMeses = [
  "Jan","Fev","Mar","Abr","Mai","Jun",
  "Jul","Ago","Set","Out","Nov","Dez"
  ];

  const meses = [...new Set(dados.map((d) => d.mes))]
    .sort((a, b) => ordemMeses.indexOf(a) - ordemMeses.indexOf(b));


  // métricas baseadas nos dados filtrados
  const receitaTotal = calcularReceitaTotal(dadosFiltrados);
  const totalPedidos = calcularTotalPedidos(dadosFiltrados);
  const ticketMedio = calcularTicketMedio(dadosFiltrados);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard de Vendas</h1>

      {/* upload */}
      <UploadExcel onDataLoaded={(rows) => setDados(cleanData(rows))} />

      {/* filtros */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {/* filtro categoria */}
        <select onChange={(e) => setCategoriaFiltro(e.target.value)}>
          <option value="todas">Todas categorias</option>

          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>

        {/* filtro mês */}
        <select onChange={(e) => setMesFiltro(e.target.value)}>
          <option value="todos">Todos meses</option>

          {meses.map((mes) => (
            <option key={mes} value={mes}>
              {mes}
            </option>
          ))}
        </select>
      </div>

      {/* métricas */}
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

      {/* gráficos */}
      <div style={{ display: "flex", gap: "40px", marginTop: "40px" }}>
        <SalesByCategoryChart dados={dadosFiltrados} />
        <SalesByMonthChart dados={dadosFiltrados} />
      </div>
    </div>
  );
}

export default App;
