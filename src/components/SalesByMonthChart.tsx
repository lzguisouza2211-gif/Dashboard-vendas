import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import { vendasPorMes } from "../utils/metrics";
import type { Venda } from "../types/Venda";

type Props = {
  dados: Venda[];
};

export function SalesByMonthChart({ dados }: Props) {
  const data = vendasPorMes(dados);

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
      <h3>Vendas por Mês</h3>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} style={{ outline: "none", border: "none" }}>
          <XAxis dataKey="mes" />
          <YAxis />

          <Tooltip
            cursor={{ fill: "transparent" }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const item = payload[0];
                const formatCurrency = (valor) => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                return (
                  <div style={{
                    background: "#1f2937",
                    color: item.color || "#3b82f6",
                    borderRadius: 8,
                    padding: "10px 16px",
                    fontWeight: 500,
                    border: "1px solid #374151",
                    minWidth: 120
                  }}>
                    <div style={{ color: "#f3f4f6", fontWeight: 600 }}>{label}</div>
                    <div style={{ color: item.color || "#3b82f6", fontWeight: 700, fontSize: 18 }}>{formatCurrency(item.value)}</div>
                  </div>
                );
              }
              return null;
            }}
          />

          <Legend />

          <Bar
            dataKey="total"
            fill="#3b82f6"
            radius={[6, 6, 0, 0]}
            animationBegin={0}
            animationDuration={1200}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
      <style>{`
        .recharts-surface:focus, .recharts-surface:active {
          outline: none !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
}
