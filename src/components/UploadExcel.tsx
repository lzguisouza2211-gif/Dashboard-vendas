import React from 'react';
import * as XLSX from 'xlsx';

// Props agora aceita setLoading e retorna erro opcional
type Props = {
  onDataLoaded: (data: any[] | null, error?: string) => void;
  setLoading?: (v: boolean) => void;
};

export function UploadExcel({ onDataLoaded, setLoading }: Props) {
  // Mensagem de erro local para UX
  const [localError, setLocalError] = React.useState<string | null>(null);

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalError(null);
    const file = event.target.files?.[0];
    if (!file) return;

    // Verifica extensão
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      setLocalError('Por favor, envie um arquivo Excel (.xlsx ou .xls)');
      onDataLoaded(null, '');
      return;
    }

    if (setLoading) setLoading(true);

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        if (!sheetName) {
          setLocalError('Arquivo Excel vazio ou sem planilha.');
          onDataLoaded(null, 'Arquivo Excel vazio ou sem planilha.');
          if (setLoading) setLoading(false);
          return;
        }
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        if (!jsonData.length) {
          setLocalError('O arquivo Excel está vazio.');
          onDataLoaded(null, 'O arquivo Excel está vazio.');
          if (setLoading) setLoading(false);
          return;
        }
        onDataLoaded(jsonData);
        if (setLoading) setLoading(false);
      } catch (err) {
        setLocalError('Erro ao ler o arquivo. Tente novamente.');
        onDataLoaded(null, 'Erro ao ler o arquivo. Tente novamente.');
        if (setLoading) setLoading(false);
      }
    };

    reader.onerror = () => {
      setLocalError('Erro ao ler o arquivo.');
      onDataLoaded(null, 'Erro ao ler o arquivo.');
      if (setLoading) setLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div
      style={{
        background: "#111827",
        padding: "30px",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        border: "1px solid #1f2937",
        width: "100%",
        boxSizing: "border-box"
      }}
    >
      <h2 style={{ margin: 0 }}>Envie um arquivo Excel</h2>

      <p style={{ margin: 0, color: "#9ca3af" }}>
        Carregue dados para visualizar o dashboard
      </p>

      <label
        style={{
          background: "#2563eb",
          padding: "12px 24px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: 600,
          width: "fit-content"
        }}
      >
        Escolher arquivo
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFile}
          style={{ display: "none" }}
        />
      </label>

      {/* Mensagem de erro local (UX) */}
      {localError && (
        <div style={{
          background: "#fee2e2",
          color: "#991b1b",
          border: "1px solid #fca5a5",
          borderRadius: 8,
          padding: 12,
          textAlign: "center",
          fontWeight: 500,
          width: "100%"
        }}>
          {localError}
        </div>
      )}
    </div>
  );
}