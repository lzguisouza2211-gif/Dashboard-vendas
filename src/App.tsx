import { useState, useMemo, useEffect } from "react";
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
  // loading real
  const [loading, setLoading] = useState(false);
  // mensagem de erro upload
  const [uploadError, setUploadError] = useState<string | null>(null);



  // Carrega dados do localStorage ao iniciar
  useEffect(() => {
    const salvo = localStorage.getItem("dashboard-vendas-dados");
    if (salvo) {
      try {
        setDados(JSON.parse(salvo));
      } catch {}
    }
  }, []);

  // Salva dados no localStorage sempre que mudar
  useEffect(() => {
    if (dados && dados.length) {
      localStorage.setItem("dashboard-vendas-dados", JSON.stringify(dados));
    }
  }, [dados]);

  // useMemo para performance: evita recálculo desnecessário
  const dadosFiltrados = useMemo(() => {
    return dados.filter((item) => {
      const matchCategoria =
        categoriaFiltro === "todas" || item.categoria === categoriaFiltro;
      const matchMes =
        mesFiltro === "todos" || item.mes === mesFiltro;
      return matchCategoria && matchMes;
    });
  }, [dados, categoriaFiltro, mesFiltro]);

  // categorias unicas
  const categorias = useMemo(() => [...new Set(dados.map((d) => d.categoria))], [dados]);

  // meses ordenados
  const ordemMeses = [
    "Jan","Fev","Mar","Abr","Mai","Jun",
    "Jul","Ago","Set","Out","Nov","Dez"
  ];
  const meses = useMemo(() =>
    [...new Set(dados.map((d) => d.mes))]
      .sort((a, b) => ordemMeses.indexOf(a) - ordemMeses.indexOf(b)),
    [dados]
  );

  // métricas
  const receitaTotal = useMemo(() => calcularReceitaTotal(dadosFiltrados), [dadosFiltrados]);
  const totalPedidos = useMemo(() => calcularTotalPedidos(dadosFiltrados), [dadosFiltrados]);
  const ticketMedio = useMemo(() => calcularTicketMedio(dadosFiltrados), [dadosFiltrados]);


  return (
    <div
      style={{
        width: "100%",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        boxSizing: "border-box",
        minHeight: "100vh",
        overflowX: "hidden"
      }}
    >
      <Header />

      {/* UploadExcel agora recebe setLoading e setUploadError para loading real e erros */}
      <UploadExcel
        onDataLoaded={(rows, error) => {
          setUploadError(error || null);
          if (error || !rows) {
            setDados([]);
            setLoading(false);
            localStorage.removeItem("dashboard-vendas-dados");
            return;
          }
          setLoading(true);
          try {
            const cleaned = cleanData(rows);
            setDados(cleaned);
            setLoading(false);
            localStorage.setItem("dashboard-vendas-dados", JSON.stringify(cleaned));
          } catch (e) {
            setUploadError("Erro ao processar o arquivo. Tente novamente.");
            setDados([]);
            setLoading(false);
            localStorage.removeItem("dashboard-vendas-dados");
          }
        }}
        setLoading={setLoading}
      />

      {/* Mensagem de erro amigável para upload (apenas uma vez) */}
      {uploadError && (
        <div style={{
          background: "#fee2e2",
          color: "#991b1b",
          border: "1px solid #fca5a5",
          borderRadius: 8,
          padding: 16,
          textAlign: "center",
          fontWeight: 500,
          margin: "16px 0"
        }}>
          {uploadError}
        </div>
      )}

      {/* estados visuais */}
      {loading && <Loading />}
      {!loading && !dados.length && <EmptyState />}

      {/* dashboard só aparece quando tem dados */}
      {!loading && dados.length > 0 && (
        <>
          <FilterBar
            categorias={categorias}
            meses={meses}
            categoriaFiltro={categoriaFiltro}
            mesFiltro={mesFiltro}
            setCategoriaFiltro={setCategoriaFiltro}
            setMesFiltro={setMesFiltro}
          />

          {/* Fallback se filtros não retornam dados */}
          {dadosFiltrados.length === 0 ? (
            <div style={{
              background: "#1e293b",
              color: "#fbbf24",
              border: "1px solid #fbbf24",
              borderRadius: 8,
              padding: 24,
              textAlign: "center",
              fontWeight: 500
            }}>
              Nenhum dado encontrado para os filtros selecionados
            </div>
          ) : null}

          {dadosFiltrados.length > 0 && (
            <>
              {/* métricas responsivas */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "20px",
                  width: "100%"
                }}
              >
                <MetricCard
                  title="Receita Total"
                  value={formatCurrency(receitaTotal)}
                  delay={0.20}
                />
                <MetricCard
                  title="Total de Pedidos"
                  value={totalPedidos}
                  delay={0.60}
                />
                <MetricCard
                  title="Ticket Médio"
                  value={formatCurrency(ticketMedio)}
                  delay={1.00}
                />
              </div>

              {/* gráficos responsivos */}
              <div
                className="dashboard-charts"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "30px",
                  width: "100%"
                }}
              >
                <SalesByCategoryChart dados={dadosFiltrados} />
                <SalesByMonthChart dados={dadosFiltrados} />
              </div>

              {/* Responsividade extra para gráficos e cards em telas pequenas */}
              <style>{`
                @media (max-width: 768px) {
                  .dashboard-charts {
                    grid-template-columns: 1fr !important;
                  }
                  .dashboard-metrics {
                    grid-template-columns: 1fr !important;
                  }
                  .dashboard-root {
                    padding: 8px !important;
                    gap: 16px !important;
                  }
                }
              `}</style>

              <TopProductsTable dados={dadosFiltrados} />
            </>
          )}
        </>
      )}
    </div>
  );

}

export default App;
