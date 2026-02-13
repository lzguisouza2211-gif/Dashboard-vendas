import { calcularTopProdutos } from "../utils/productRanking";
import type { Venda } from "../types/Venda";

type Props = {
  dados: Venda[];
};

export function TopProductsTable({ dados }: Props) {
  const produtos = calcularTopProdutos(dados);

  return (
    <div style={{ marginTop: "40px" }}>
      <h3>Produtos Mais Vendidos</h3>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Receita</th>
          </tr>
        </thead>

        <tbody>
          {produtos.map((p) => (
            <tr key={p.produto}>
              <td>{p.produto}</td>
              <td>{p.quantidade}</td>
              <td>R$ {p.receita.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
