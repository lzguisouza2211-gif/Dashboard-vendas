import { useState } from "react";
import { calcularTopProdutos } from "../utils/productRanking";
import type { Venda } from "../types/Venda";
import { formatCurrency } from "../utils/format";

type Props = {
  dados: Venda[];
};

export function TopProductsTable({ dados }: Props) {
  // Paginação simples
  const LIMITE_LINHAS = 10;
  const [pagina, setPagina] = useState(1);
  const produtos = calcularTopProdutos(dados);
  const totalPaginas = Math.ceil(produtos.length / LIMITE_LINHAS);
  const produtosPagina = produtos.slice((pagina - 1) * LIMITE_LINHAS, pagina * LIMITE_LINHAS);
  // Se todos os produtos têm receita zero, não exibe a tabela
  const todosReceitaZero = produtos.length > 0 && produtos.every((p) => p.receita === 0);
  if (produtos.length === 0 || todosReceitaZero) return null;

  return (
    <div
      style={{
        marginTop: "40px",
        background: "#111827",
        padding: "20px",
        borderRadius: "12px",
        width: "100%",
        overflowX: "auto"
      }}
    >
      <h3>Produtos Mais Vendidos</h3>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          minWidth: 320,
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
          {produtosPagina.map((p, idx) => (
            <tr
              key={p.produto}
              className="produto-row-anim"
              style={{
                borderBottom: "1px solid #374151",
                animationDelay: `${0.5 + idx * 0.5}s`
              }}
            >
              <td style={{ padding: "10px" }}>{p.produto}</td>
              <td style={{ padding: "10px" }}>{p.quantidade}</td>
              <td style={{ padding: "10px" }}>{formatCurrency(p.receita)}</td>
            </tr>
          ))}
        </tbody>
        <style>{`
          .produto-row-anim {
            opacity: 0;
            transform: translateY(20px);
            animation: produtoFadeIn 0.7s cubic-bezier(.23,1.02,.32,1) forwards;
          }
          @keyframes produtoFadeIn {
            to {
              opacity: 1;
              transform: none;
            }
          }
        `}</style>
      </table>
      {/* Paginação */}
      {totalPaginas > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
          <button
            style={{
              background: "#374151",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "6px 14px",
              cursor: pagina === 1 ? "not-allowed" : "pointer",
              opacity: pagina === 1 ? 0.5 : 1
            }}
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
            disabled={pagina === 1}
          >
            Anterior
          </button>
          <span style={{ color: "#fff", alignSelf: "center" }}>
            Página {pagina} de {totalPaginas}
          </span>
          <button
            style={{
              background: "#374151",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "6px 14px",
              cursor: pagina === totalPaginas ? "not-allowed" : "pointer",
              opacity: pagina === totalPaginas ? 0.5 : 1
            }}
            onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
            disabled={pagina === totalPaginas}
          >
            Próxima
          </button>
        </div>
      )}
      {/* Responsividade extra para tabela em mobile */}
      <style>{`
        @media (max-width: 600px) {
          table, thead, tbody, th, td, tr {
            display: block !important;
          }
          thead tr {
            display: none !important;
          }
          td {
            text-align: left !important;
            padding: 8px 0 !important;
            border: none !important;
          }
          tr {
            margin-bottom: 16px !important;
            background: none !important;
          }
        }
      `}</style>
    </div>
  );
}
