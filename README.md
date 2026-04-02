# 🚀 Task Flow - Full Stack Task Manager

Um gerenciador de tarefas robusto e moderno, construído para organizar a rotina de desenvolvedores e entusiastas de alta performance. O projeto utiliza uma arquitetura desacoplada com foco em performance e separação de responsabilidades.

## 🛠️ Tecnologias Utilizadas

### Backend
- **PHP 8.x (Puro):** Arquitetura **MVC** (Model-View-Controller) customizada.
- **MySQL:** Persistência de dados gerenciada via **DBngin**.
- **PDO:** Conexões seguras com *Prepared Statements* para evitar SQL Injection.
- **Laravel Herd:** Ambiente de desenvolvimento de alta performance para macOS.

### Frontend
- **React 19 + TypeScript:** Interface reativa e tipagem estrita para maior segurança.
- **Vite:** Build tool ultrarrápida.
- **Tailwind CSS:** Estilização baseada em utilitários para um design moderno e responsivo.
- **Service Pattern:** Camada de API isolada para melhor manutenção.

---

## 🏛️ Arquitetura do Projeto

O projeto segue o padrão de separação entre **API (Backend)** e **SPA (Frontend)**:

```text
/backend-mvc
  ├── /config        # Conexão com Banco de Dados (Singleton)
  ├── /controllers   # Lógica de negócio e respostas JSON
  ├── /models        # Abstração das entidades e queries SQL
  └── /src           # Entry point (index.php) e Router
/frontend-react
  ├── /src/services  # Integração com API (fetch)
  ├── /src/types     # Definições de interfaces TS
  └── /src/components # Componentes reutilizáveis
  ```
---

## 🚀 Como Rodar o Projeto
### Pré-requisitos

* Laravel Herd (ou PHP 8.2+)
* DBngin (MySQL rodando na porta 3306)
* Node.js (v18+)

### Configuração do Backend
* Clone o repositório.
* No DBngin, crie um banco de dados chamado fabrica_tarefas.
* Configure o arquivo env.ini (ou equivalente no /config) com suas credenciais do MySQL.
* "Estacione" a pasta do backend no Herd para gerar o domínio http://backend-tarefas.test.

### Configuração do Frontend
* Acesse a pasta /frontend.
* Instale as dependências:
```bash
npm install
```

* Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

### 📈 Funcionalidades
[x] CRUD completo de tarefas.

[x] Categorização inteligente (Trabalho, Estudos, Musculação, Bateria).

[x] Filtros por status de conclusão.

[x] Design totalmente responsivo.

## 🧑‍💻 Desenvolvido por
**Hudson Gustavo** - Desenvolvedor Full Stack

Transformando café em código e treinos em disciplina!

---