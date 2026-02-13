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
    <div style={{ width: "500px", height: "300px" }}>
      <h3>Vendas por Mês</h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
