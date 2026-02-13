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
        height: "500px"
      }}
    >
      <h3>Vendas por Mês</h3>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <XAxis dataKey="mes" />
          <YAxis />

          <Tooltip
            contentStyle={{
              background: "#1f2937",
              border: "none",
              color: "white"
            }}
          />

          <Legend />

          <Bar
            dataKey="total"
            fill="#3b82f6"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
