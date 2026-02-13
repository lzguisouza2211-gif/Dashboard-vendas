import type { Venda } from "../types/Venda";

// converte "R$ 79.431,44" → 79431.44
function parseCurrency(value: any): number {
  if (!value) return 0;

  if (typeof value === "number") return value;

  return Number(
    String(value)
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim()
  ) || 0;
}

// converte " 71 " → 71
function parseNumber(value: any): number {
  if (!value) return 0;
  return Number(String(value).trim()) || 0;
}

// normaliza texto → remove espaços, acentos e capitaliza
function normalizeText(value: any): string {
  if (!value) return "";

  let text = String(value).trim().toLowerCase();
  // Remove acentos
  text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// função principal
export function cleanData(rows: any[]): Venda[] {
  return rows.map((row) => ({
    produto: String(row.Produto ?? "").trim(),

    categoria: normalizeText(row.Categoria) || "Outros",

    valor: parseCurrency(row.Receita),

    qtd: parseNumber(row.Quantidade),

    mes: String(row.Mes ?? "").trim(),
  }));
}
