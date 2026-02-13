import { calcularTopProdutos } from "../utils/productRanking";
import type { Venda } from "../types/Venda";
import { formatCurrency } from "../utils/format";

type Props = {
  dados: Venda[];
};

export function TopProductsTable({ dados }: Props) {
  const produtos = calcularTopProdutos(dados);

  return (
    <div
      style={{
        marginTop: "40px",
        background: "#111827",
        padding: "20px",
        borderRadius: "12px"
      }}
    >
      <h3>Produtos Mais Vendidos</h3>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px"
        }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid #374151" }}>
            <th style={{ textAlign: "left", padding: "10px" }}>Produto</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Quantidade</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Receita</th>
          </tr>
        </thead>

        <tbody>
          {produtos.map((p) => (
            <tr key={p.produto} style={{ borderBottom: "1px solid #374151" }}>
              <td style={{ padding: "10px" }}>{p.produto}</td>
              <td style={{ padding: "10px" }}>{p.quantidade}</td>
              <td style={{ padding: "10px" }}>
                {formatCurrency(p.receita)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
