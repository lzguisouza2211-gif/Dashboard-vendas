type Props = {
  categorias: string[];
  meses: string[];
  categoriaFiltro: string;
  mesFiltro: string;
  setCategoriaFiltro: (v: string) => void;
  setMesFiltro: (v: string) => void;
};

export function FilterBar({
  categorias,
  meses,
  categoriaFiltro,
  mesFiltro,
  setCategoriaFiltro,
  setMesFiltro
}: Props) {
  // Responsividade: media query inline para flexDirection e gap
  // Adiciona overflowX: auto para evitar overflow horizontal
  // Adiciona width: 100% para ocupar toda a largura
  // Adiciona minWidth: 0 para evitar overflow de filhos
  // Adiciona style para select e button para responsividade
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
        flexWrap: "wrap",
        width: "100%",
        minWidth: 0,
        overflowX: "auto"
      }}
    >
      <strong style={{ minWidth: 90 }}>Filtros</strong>

      <select
        value={categoriaFiltro}
        onChange={(e) => setCategoriaFiltro(e.target.value)}
        style={{
          background: "#1f2937",
          border: "1px solid #374151",
          color: "white",
          padding: "10px 14px",
          borderRadius: "8px",
          minWidth: 140,
          flex: "1 1 160px",
          maxWidth: "100%"
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
        value={mesFiltro}
        onChange={(e) => setMesFiltro(e.target.value)}
        style={{
          background: "#1f2937",
          border: "1px solid #374151",
          color: "white",
          padding: "10px 14px",
          borderRadius: "8px",
          minWidth: 120,
          flex: "1 1 120px",
          maxWidth: "100%"
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
          cursor: "pointer",
          minWidth: 120,
          flex: "1 1 120px",
          maxWidth: "100%"
        }}
        type="button"
        tabIndex={0}
        aria-label="Limpar filtros"
        title="Limpar filtros"
        onClick={() => {
          setCategoriaFiltro("todas");
          setMesFiltro("todos");
        }}
      >
        Limpar filtros
      </button>

      {/* Responsividade extra: media query inline para telas < 768px */}
      <style>{`
        @media (max-width: 768px) {
          .filterbar-responsive {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
