
<img width="1455" height="258" alt="json (1)" src="https://github.com/user-attachments/assets/087e80af-4533-477c-92e2-79c1b07b8d04" />



## 📌 Sobre o Projeto

Este projeto foi desenvolvido para **processar arquivos CSV de forma eficiente**, utilizando **streams**, **Node.js** e **Server-Sent Events (SSE)** para enviar dados ao cliente em blocos — ideal para arquivos grandes e operações de longa duração.

O sistema suporta:

* Upload de arquivos CSV
* Leitura em stream (linha a linha)
* Envio de dados ao cliente em blocos otimizados
* Tratamento de erros
* Exclusão automática do arquivo após o processamento

---

## 🚀 Tecnologias Utilizadas

* **Node.js**
* **Express**
* **Multer**
* **csv-parser**
* **Server-Sent Events (SSE)**
* **TypeScript**
* **React**
* **Axios**
*  **React-virtuoso**

---

## 📁 Estrutura Simplificada (backend)

Neste trabalho optei por usar a arquitetura de software monolitica, dado que uma de suas caracteristicas é a facilidade de implementação e baixa latência.

```
/src
 ├── data/
 ├── uploads/
 └── server.ts/
```

---
## 📁 Estrutura Simplificada (Frontend)
```
/src
 ├── components(global)/
 ├── pages/
 ├── utils/
 ├── App.css/
 ├── App.tsx/
 ├── index.css/
 └── index.tsx/
```

---

## 🧪 Resultados testes automatizados com jest
<img width="937" height="363" alt="image" src="https://github.com/user-attachments/assets/88b9897c-e213-4bde-b587-604e4322ba0e" />

---

## 🔄 Fluxo do Sistema

1. O usuário envia o CSV
2. O backend salva o arquivo temporariamente
3. O arquivo é lido com stream (sem carregar tudo na memória)
4. Os dados são enviados ao cliente em blocos
5. Ao finalizar, o arquivo é excluído automaticamente
6. O cliente recebe o evento `done`

---

## ⚠️ Validação do Arquivo

O servidor aceita **somente arquivos .csv**.

Se outro formato for enviado, o backend responde com:

```
400 – Formato de arquivo inválido. Envie um arquivo CSV.
```

---

## 🛠️ Scripts

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start
```

---

## 🧪 Melhorias Futuras (Roadmap)

* Testes automatizados (Jest + Supertest)
* Dashboard para visualizar o progresso em tempo real
* Suporte a múltiplos formatos de entrada
* Log de processamento

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**.

---

Se quiser, posso **formar um README ainda mais completo**, incluir **badges**, **GIFs**, **instruções detalhadas de API**, ou criar uma **versão para portfólio ainda mais forte**.

Quer que eu melhore ou estilize mais alguma parte?
