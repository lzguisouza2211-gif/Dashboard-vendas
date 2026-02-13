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
        <div style={{ marginBottom: '20px' }}>
            <input type="file" accept=".xlsx, .xls" onChange={handleFile} />
        </div>
    );
}