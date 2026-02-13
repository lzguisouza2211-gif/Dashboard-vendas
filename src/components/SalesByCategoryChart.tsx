import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Sector
} from "recharts";

import { vendasPorCategoria } from "../utils/metrics";
import type { Venda } from "../types/Venda";

type Props = {
  dados: Venda[];
};

export function SalesByCategoryChart({ dados }: Props) {
  const data = vendasPorCategoria(dados);

  // Mapa de cores fixo por categoria
  const COR_CATEGORIA: Record<string, string> = {
    "Assinaturas": "#3b82f6", // azul
    "Outros": "#8b5cf6",      // roxo
    "Produtos": "#f59e0b",    // amarelo
    "Servicos": "#10b981",    // verde
    "Serviços": "#10b981",    // verde (garantia)
  };
  // Cor padrão se não encontrar
  const COR_PADRAO = "#ef4444"; // vermelho


  // Mostra porcentagem DENTRO, centralizado
  // Exibe porcentagem FORA do pedaço, com linha guia
  const renderLabel = ({ cx, cy, midAngle, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 24; // distância para fora
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return percent > 0 ? (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={16}
        fontWeight={600}
        style={{ pointerEvents: "none" }}
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    ) : null;
  };

  // Função para formatar moeda Real
  const formatCurrency = (valor: number) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // Corrige acentuacao e padroniza nomes das categorias
  const padronizarCategoria = (nome: string) => {
    if (!nome) return nome;
    // Remove acentos e padroniza para evitar duplicidade
    const normalizado = nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const mapa: Record<string, string> = {
      "Assinaturas": "Assinaturas",
      "Outros": "Outros",
      "Produtos": "Produtos",
      "Servicos": "Serviços"
    };
    // Busca por nome normalizado
    return mapa[normalizado] || nome;
  };

  // Tooltip customizada igual ao gráfico de barras, valor em Real
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      return (
        <div style={{
          background: "#1f2937",
          color: item.color,
          borderRadius: 8,
          padding: "10px 16px",
          fontWeight: 500,
          border: "1px solid #374151",
          minWidth: 120
        }}>
          <div style={{ color: "#f3f4f6", fontWeight: 600 }}>{padronizarCategoria(item.name)}</div>
          <div style={{ color: item.color, fontWeight: 700, fontSize: 18 }}>{formatCurrency(item.value)}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        background: "#111827",
        padding: "20px",
        borderRadius: "12px",
        width: "100%",
        height: "500px",
        border: "none",
        outline: "none"
      }}
    >
      <h3>Vendas por Categoria</h3>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart style={{ outline: "none", border: "none" }}>
          <Pie
            data={data.map((d) => ({ ...d, categoria: padronizarCategoria(d.categoria) }))}
            dataKey="total"
            nameKey="categoria"
            outerRadius={120}
            label={renderLabel}
            labelLine={true}
            animationBegin={0}
            animationDuration={2500}
            animationEasing="ease-out"
          >
            {data.map((d, index) => {
              const cat = padronizarCategoria(d.categoria);
              return (
                <Cell
                  key={index}
                  fill={COR_CATEGORIA[cat] || COR_PADRAO}
                />
              );
            })}
          </Pie>

          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(59,130,246,0.08)" }} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      {/* Remove outline ao focar/clicar no gráfico */}
      <style>{`
        .recharts-pie-sector:focus, .recharts-pie-sector:active, .recharts-surface:focus, .recharts-surface:active {
          outline: none !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
}
