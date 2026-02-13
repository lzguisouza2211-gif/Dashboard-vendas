import type React from 'react';
import * as XLSX from 'xlsx';

type Props = {
  onDataLoaded: (data: any[]) => void;
};

export function UploadExcel({ onDataLoaded }: Props) {
    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const jsonData = XLSX.utils.sheet_to_json(sheet);
            
            console.log("Dados do Excel:", jsonData);

            onDataLoaded(jsonData);
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
        border: "1px solid #1f2937"
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
          fontWeight: 600
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
    </div>
  );
}