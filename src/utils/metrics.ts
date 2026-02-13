import type { Venda } from "../types/Venda";

// receita total
export function calcularReceitaTotal(dados: Venda[]): number {
  return dados.reduce((acc, item) => acc + item.valor, 0);
}

// total de pedidos (linhas)
export function calcularTotalPedidos(dados: Venda[]): number {
  return dados.length;
}

// ticket médio
export function calcularTicketMedio(dados: Venda[]): number {
  if (!dados.length) return 0;

  const receita = calcularReceitaTotal(dados);
  return receita / dados.length;
}

// vendas por categoria (para gráfico pizza)
export function vendasPorCategoria(dados: Venda[]) {
  const agrupado: Record<string, number> = {};

  dados.forEach((item) => {
    if (!agrupado[item.categoria]) {
      agrupado[item.categoria] = 0;
    }

    agrupado[item.categoria] += item.valor;
  });

  return Object.entries(agrupado).map(([categoria, total]) => ({
    categoria,
    total,
  }));
}

// vendas por mês (para gráfico barra)
export function vendasPorMes(dados: Venda[]) {
  const agrupado: Record<string, number> = {};

  dados.forEach((item) => {
    if (!agrupado[item.mes]) {
      agrupado[item.mes] = 0;
    }

    agrupado[item.mes] += item.valor;
  });

  return Object.entries(agrupado).map(([mes, total]) => ({
    mes,
    total,
  }));
}
