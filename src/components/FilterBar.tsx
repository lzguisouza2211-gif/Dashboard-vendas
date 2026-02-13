type Props = {
  categorias: string[];
  meses: string[];
  setCategoriaFiltro: (v: string) => void;
  setMesFiltro: (v: string) => void;
};

export function FilterBar({
  categorias,
  meses,
  setCategoriaFiltro,
  setMesFiltro
}: Props) {
  return (
    <div
      style={{
        background: "#111827",
        padding: "20px",
        borderRadius: "16px",
        border: "1px solid #1f2937",
        display: "flex",
        alignItems: "center",
        gap: "20px",
        flexWrap: "wrap"
      }}
    >
      <strong>Filtros</strong>

      <select
        onChange={(e) => setCategoriaFiltro(e.target.value)}
        style={{
          background: "#1f2937",
          border: "1px solid #374151",
          color: "white",
          padding: "10px 14px",
          borderRadius: "8px"
        }}
      >
        <option value="todas">Todas categorias</option>
        {categorias.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => setMesFiltro(e.target.value)}
        style={{
          background: "#1f2937",
          border: "1px solid #374151",
          color: "white",
          padding: "10px 14px",
          borderRadius: "8px"
        }}
      >
        <option value="todos">Todos meses</option>
        {meses.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <button
        style={{
          marginLeft: "auto",
          background: "#374151",
          border: "none",
          color: "white",
          padding: "10px 16px",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Limpar filtros
      </button>
    </div>
  );
}
