# Hípica Alameda App 🐎

Este repositório contém o código-fonte do aplicativo **Hípica Alameda**, desenvolvido para facilitar a gestão de usuários, cavalos, aulas e competições para uma hípica. A aplicação foi construída com **React Native** e integra-se ao **Supabase** como backend.

## ✨ Funcionalidades

- Cadastro de usuários com diferentes papéis (administradores, professores, alunos, etc.).
- Gerenciamento de aulas e competições.
- Upload de imagens e arquivos.
- Integração com o banco de dados **Supabase**.
- Autenticação com e-mail e senha.

---

## 🚀 Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento mobile.
- **Supabase**: Backend para autenticação, banco de dados e armazenamento de arquivos.
- **Expo**: Ferramenta para desenvolvimento e build do aplicativo.
- **TypeScript**: Superset do JavaScript para melhor tipagem e confiabilidade.

---

## 📋 Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas no seu ambiente de desenvolvimento:

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/)
- [Git](https://git-scm.com/)
- Editor de código, como [VS Code](https://code.visualstudio.com/).

---

## ⚙️ Configuração do Projeto

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/MIEsoftwares/Hipica-Alameda-App.git
   cd Hipica-Alameda-App
Instale as dependências:

bash
Copy code
npm install
Configurar o Supabase:

Crie um projeto no Supabase.

Adicione as tabelas e funções necessárias (consulte o arquivo schema.sql se disponível).

Configure as variáveis de ambiente no arquivo .env:

```

SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-key
```
Inicie o projeto:

```
npm start
```
```
🛠 Estrutura do Projeto
plaintext

src/
├── components/       # Componentes reutilizáveis
├── screens/          # Telas do aplicativo
├── services/         # Configuração do Supabase e outros serviços
├── utils/            # Funções auxiliares
└── App.jsx           # Ponto de entrada do aplicativo
```
📖 Contribuindo
Contribuições são bem-vindas! Para contribuir:

Faça um fork do repositório.
Crie uma nova branch com sua feature ou correção de bug:
```

git checkout -b minha-feature
```
Faça commit das alterações:
```
git commit -m "Minha nova feature"
```
Faça o push para a branch:
```

git push origin minha-feature
```
Abra um Pull Request.
