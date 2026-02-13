import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { vendasPorCategoria } from "../utils/metrics";
import type { Venda } from "../types/Venda";

type Props = {
  dados: Venda[];
};

export function SalesByCategoryChart({ dados }: Props) {
  const data = vendasPorCategoria(dados);

  return (
    <div style={{ width: "400px", height: "300px" }}>
      <h3>Vendas por Categoria</h3>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="categoria"
            outerRadius={100}
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
