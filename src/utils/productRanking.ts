import type { Venda } from "../types/Venda";

type ProdutoRanking = {
  produto: string;
  quantidade: number;
  receita: number;
};

export function calcularTopProdutos(dados: Venda[]): ProdutoRanking[] {
  const mapa: Record<string, ProdutoRanking> = {};

  dados.forEach((item) => {
    if (!mapa[item.produto]) {
      mapa[item.produto] = {
        produto: item.produto,
        quantidade: 0,
        receita: 0,
      };
    }

    mapa[item.produto].quantidade += item.qtd;
    mapa[item.produto].receita += item.valor;
  });

  return Object.values(mapa).sort(
    (a, b) => b.quantidade - a.quantidade
  );
}
