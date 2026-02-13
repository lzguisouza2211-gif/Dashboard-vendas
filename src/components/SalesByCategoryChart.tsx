import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";

import { vendasPorCategoria } from "../utils/metrics";
import type { Venda } from "../types/Venda";

type Props = {
  dados: Venda[];
};

export function SalesByCategoryChart({ dados }: Props) {
  const data = vendasPorCategoria(dados);

  // paleta de cores do dashboard
  const COLORS = [
    "#3b82f6", // azul
    "#10b981", // verde
    "#f59e0b", // amarelo
    "#8b5cf6", // roxo
    "#ef4444"  // vermelho
  ];

  return (
    <div
      style={{
        background: "#111827",
        padding: "20px",
        borderRadius: "12px",
        width: "100%",
        height: "500px"
      }}
    >
      <h3>Vendas por Categoria</h3>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="categoria"
            outerRadius={120}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              background: "#1f2937",
              border: "none",
              color: "white"
            }}
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
