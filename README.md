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

O projeto foi desenvolvido seguindo as etapas abaixo, conforme ordem dos commits:

1. Setup inicial do projeto React com Vite
2. Implementação do upload e leitura de arquivo Excel
3. Tipagem e limpeza dos dados do Excel
4. Implementação dos cards de métricas do dashboard
5. Implementação dos gráficos de vendas por categoria e por mês
6. Implementação de filtros reativos e filtros automáticos com ordenação de meses
7. Implementação da tabela de produtos mais vendidos com ranking
8. Implementação do layout, header, upload section e filter bar
9. Padronização dos nomes para português sem acento, melhorias de responsividade, UX, mensagens de erro, gráficos e persistência dos dados no dashboard
10. Correção da sincronização dos selects de filtro
11. Adiciona animação sequencial nos cards e tabela de produtos mais vendidos
12. Ajustes e correções no README

Cada etapa foi registrada em commits para facilitar o acompanhamento do desenvolvimento e garantir transparência na evolução do projeto.

---

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

## 👨‍💻 Autor

Projeto desenvolvido por Guilherme como avaliação técnica para vaga de desenvolvedor front-end.
