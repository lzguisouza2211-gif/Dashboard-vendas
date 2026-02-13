# 📊 Dashboard de Vendas — Avaliação Técnica

Aplicação web desenvolvida para upload de arquivos Excel e geração de um dashboard interativo de vendas, com análise, limpeza e visualização de dados.

O sistema permite importar dados de vendas, processar informações automaticamente e apresentar métricas e gráficos com filtros dinâmicos.

Este projeto foi desenvolvido como solução para uma avaliação técnica de desenvolvedor front-end.

---

## 🚀 Demonstração do Projeto

A aplicação permite:

- Upload de arquivos Excel (.xlsx, .xls)
- Processamento e limpeza automática dos dados
- Visualização de métricas de vendas
- Gráficos interativos
- Filtros dinâmicos
- Ranking de produtos mais vendidos
- Persistência dos dados no navegador

---

## 🎯 Funcionalidades

### 📂 Upload de Excel
- Leitura de arquivos `.xlsx` e `.xls`
- Validação do tipo de arquivo
- Tratamento de erro de leitura
- Processamento automático dos dados
- Limpeza e normalização das informações

### 📊 Dashboard de Vendas
- Receita total
- Total de pedidos
- Ticket médio
- Ranking de produtos mais vendidos

### 📈 Visualização de Dados
- Gráfico de vendas por categoria
- Gráfico de vendas por mês
- Tabela com ranking de produtos
- Percentuais e valores formatados em Real (R$)

### 🎛 Filtros Dinâmicos
- Filtro por categoria
- Filtro por mês
- Atualização automática das métricas e gráficos

### ⚡ Experiência do Usuário
- Loading durante processamento do arquivo
- Tratamento de erros de upload
- Estado vazio quando não há dados
- Mensagem quando filtros não retornam resultados
- Persistência de dados com LocalStorage
- Interface responsiva

---

## 🧠 Etapas do Desenvolvimento

O projeto foi desenvolvido de forma incremental, seguindo uma evolução lógica desde a leitura dos dados até a construção completa do dashboard.

### 1. Configuração do projeto
- Setup inicial com Vite + React + TypeScript
- Estruturação das pastas e organização base do projeto

### 2. Leitura e processamento do Excel
- Implementação do upload de arquivos `.xlsx` e `.xls`
- Leitura do arquivo com SheetJS (XLSX)
- Conversão dos dados para JSON
- Tipagem dos dados com TypeScript
- Limpeza e normalização das informações

### 3. Modelagem e tratamento dos dados
- Padronização dos dados importados
- Normalização de categorias e valores
- Organização da estrutura de dados para análise
- Criação das funções de agregação e cálculo

### 4. Implementação das métricas do dashboard
- Receita total
- Total de pedidos
- Ticket médio
- Componentização dos cards de métricas

### 5. Visualização de dados
- Gráfico de vendas por categoria
- Gráfico de vendas por mês
- Formatação de valores e percentuais
- Padronização visual dos gráficos

### 6. Filtros e interatividade
- Implementação de filtros reativos por categoria e mês
- Atualização dinâmica das métricas e gráficos
- Ordenação correta dos meses
- Sincronização dos estados de filtro

### 7. Análise avançada dos dados
- Implementação do ranking de produtos mais vendidos
- Tabela dinâmica com agregação de dados
- Cálculo de quantidade e receita por produto

### 8. Estrutura e layout da interface
- Criação do layout principal do dashboard
- Implementação do header e organização das seções
- Criação da área de upload e barra de filtros
- Organização visual dos componentes

### 9. Experiência do usuário (UX)
- Implementação de estados de loading e empty state
- Tratamento de erros de upload e leitura
- Mensagens amigáveis ao usuário
- Persistência dos dados no navegador
- Melhorias de responsividade

### 10. Otimizações e melhorias
- Padronização de nomenclatura do código
- Melhorias de performance com useMemo
- Ajustes de comportamento e estabilidade
- Refinamentos visuais e ajustes finais

----

## 🏗 Arquitetura e Organização

O projeto foi estruturado utilizando componentização e separação de responsabilidades.

```
src/
  components/
    Header.tsx
    UploadExcel.tsx
    FilterBar.tsx
    MetricCard.tsx
    SalesByCategoryChart.tsx
    SalesByMonthChart.tsx
    TopProductsTable.tsx
    Loading.tsx
    EmptyState.tsx

  utils/
    cleanData.ts
    metrics.ts
    format.ts
    productRanking.ts

  types/
    Venda.ts
```

---

## 🛠 Tecnologias Utilizadas

- React
- TypeScript
- Vite
- Recharts — gráficos
- SheetJS / XLSX — leitura de Excel
- CSS Flexbox e Grid
- LocalStorage — persistência de dados

---

## ▶️ Como Executar o Projeto

### 1. Clonar repositório

```bash
git clone <url-do-repositorio>
```

### 2. Acessar pasta

```bash
cd dashboard-vendas
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Executar aplicação

```bash
npm run dev
```

Acesse:

```
http://localhost:5173
```

---

## 📌 Decisões Técnicas

- Uso de TypeScript para maior segurança e previsibilidade
- Componentização para melhor organização do código
- Separação da lógica de negócio em utilitários
- Normalização de dados para evitar inconsistências
- Uso de useMemo para otimização de performance
- Persistência de dados com LocalStorage
- Interface responsiva com Flexbox e Grid

---

## 📱 Responsividade

A interface foi construída para funcionar em diferentes tamanhos de tela:

- Layout adaptável
- Gráficos reorganizados em telas menores
- Cards reorganizados automaticamente
- Evita overflow horizontal

---

## 📁 Arquivo de Exemplo

Veja abaixo um exemplo de arquivo para testar o dashboard:

[![Baixar arquivo de exemplo](https://img.shields.io/badge/Download%20Excel-%F0%9F%93%84%20dados--exemplo.xlsx-blue?style=for-the-badge)](./example/dados_vendas_teste.xlsx)

Arquivo sugerido para simular o upload e visualizar as funcionalidades do sistema.

---

## 👨‍💻 Autor

Projeto desenvolvido por Guilherme como avaliação técnica para vaga de desenvolvedor front-end.
