# Verificador de Certificações Google - Leonardo da Vinci

Este projeto é uma ferramenta web para que professores e colaboradores consultem o status de suas certificações Google (Nível 1, 2 e Instrutor) de forma rápida e segura.

## 🚀 Como funciona

A página consome dados diretamente de uma planilha Google publicada como CSV. Ela realiza buscas em todas as abas simultaneamente (Nível 1, Nível 2 e Instrutor) e exibe os resultados encontrados para o e-mail informado.

## 🛠️ Tecnologias utilizadas

- **HTML5/CSS3**: Estrutura e design premium com foco em experiência do usuário.
- **JavaScript (Vanilla)**: Lógica de busca e manipulação do DOM.
- **PapaParse**: Biblioteca robusta para processamento de arquivos CSV via URL.
- **Google Sheets API (via Publish to Web)**: Fonte de dados dinâmica.

## 📦 Como hospedar no GitHub Pages

1. Crie um novo repositório no seu GitHub.
2. Faça o upload ou "push" de todos os arquivos deste projeto para o repositório.
3. No GitHub, vá em **Settings** > **Pages**.
4. Em **Build and deployment**, selecione a branch `main` e a pasta `/ (root)`.
5. Clique em **Save**. Em alguns minutos, sua página estará disponível no link fornecido pelo GitHub.

## 📝 Manutenção da Planilha

Para que novos usuários apareçam na busca:
1. Certifique-se de que o e-mail institucional esteja na **Coluna B** da planilha.
2. A validade deve estar na **Coluna D** e o status na **Coluna E**.
3. Se você adicionar novas abas ou mudar os IDs (`gid`), atualize a constante `CONFIG` no arquivo `app.js`.

---
Desenvolvido com ❤️ para a equipe Leonardo da Vinci.
