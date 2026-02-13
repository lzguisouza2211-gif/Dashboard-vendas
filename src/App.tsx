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
import { TopProductsTable } from "./components/TopProductsTable";

import { formatCurrency } from "./utils/format";

import { Header } from "./components/Header";
import { FilterBar } from "./components/FilterBar";

import { Loading } from "./components/Loading";
import { EmptyState } from "./components/EmptyState";



function App() {
  // dados base
  const [dados, setDados] = useState<Venda[]>([]);

  // estados de filtro
  const [categoriaFiltro, setCategoriaFiltro] = useState("todas");
  const [mesFiltro, setMesFiltro] = useState("todos");
  const [loading, setLoading] = useState(false);


  // dados filtrados
  const dadosFiltrados = dados.filter((item) => {
    const matchCategoria =
      categoriaFiltro === "todas" || item.categoria === categoriaFiltro;

    const matchMes =
      mesFiltro === "todos" || item.mes === mesFiltro;

    return matchCategoria && matchMes;
  });

  // categorias únicas
  const categorias = [...new Set(dados.map((d) => d.categoria))];

  // meses ordenados
  const ordemMeses = [
    "Jan","Fev","Mar","Abr","Mai","Jun",
    "Jul","Ago","Set","Out","Nov","Dez"
  ];

  const meses = [...new Set(dados.map((d) => d.mes))]
    .sort((a, b) => ordemMeses.indexOf(a) - ordemMeses.indexOf(b));

  // métricas
  const receitaTotal = calcularReceitaTotal(dadosFiltrados);
  const totalPedidos = calcularTotalPedidos(dadosFiltrados);
  const ticketMedio = calcularTicketMedio(dadosFiltrados);

return (
  <div
    style={{
      width: "100%",
      padding: "30px",
      display: "flex",
      flexDirection: "column",
      gap: "30px"
    }}
  >
    <Header />

    <UploadExcel
      onDataLoaded={(rows) => {
        setLoading(true);

        setTimeout(() => {
          setDados(cleanData(rows));
          setLoading(false);
        }, 800);
      }}
    />

    {/* estados visuais */}
    {loading && <Loading />}
    {!loading && !dados.length && <EmptyState />}

    {/* dashboard só aparece quando tem dados */}
    {!loading && dados.length > 0 && (
      <>
        <FilterBar
          categorias={categorias}
          meses={meses}
          setCategoriaFiltro={setCategoriaFiltro}
          setMesFiltro={setMesFiltro}
        />

        {/* métricas */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px"
          }}
        >
          <MetricCard
            title="Receita Total"
            value={formatCurrency(receitaTotal)}
          />
          <MetricCard title="Total de Pedidos" value={totalPedidos} />
          <MetricCard
            title="Ticket Médio"
            value={formatCurrency(ticketMedio)}
          />
        </div>

        {/* gráficos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px"
          }}
        >
          <SalesByCategoryChart dados={dadosFiltrados} />
          <SalesByMonthChart dados={dadosFiltrados} />
        </div>

        <TopProductsTable dados={dadosFiltrados} />
      </>
    )}
  </div>
);

}

export default App;
