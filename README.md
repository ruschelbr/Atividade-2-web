# Poções & Soluções

Atividade Prática 2 de SCC0219 (Introdução ao Desenvolvimento Web). É o site da
loja de poções da Annabelle Merigold: backend em Node/Express/Sequelize e
frontend em HTML/CSS/JS puro, sem framework.

O projeto tem duas partes:

- `backend/` — API que cadastra, lista e remove poções. Banco SQLite em
  memória (exigência do enunciado), então o catálogo volta ao estado inicial
  toda vez que o servidor é reiniciado.
- `frontend/` — `index.html` é a página da loja (descrição, história desde
  1867, catálogo e contato); `admin.html` é o painel pra cadastrar e remover
  poções. Comunicação com a API via fetch (AJAX).

## Rodando o backend

```bash
cd backend
npm install
npm start
```

Sobe em `http://localhost:3000` já com as poções de exemplo do enunciado
cadastradas no banco.

Rotas:
- `GET /api/potions` — lista as poções
- `GET /api/potions/:id` — busca uma poção
- `POST /api/potions` — cadastra
- `DELETE /api/potions/:id` — remove

Corpo esperado no POST:

```json
{
  "name": "Poção da Sorte",
  "description": "Garante um dia inteiro de sorte.",
  "image": "https://exemplo.com/pocao-sorte.png",
  "price": 250
}
```

## Rodando o frontend

Com o backend rodando, é só abrir `frontend/index.html` no navegador. Se der
algum problema com `file://`, sirva a pasta com `npx serve` ou a extensão
Live Server do VS Code.

- Loja: `index.html`
- Admin: `admin.html`

Se trocar a porta do backend, atualiza a constante `API_BASE_URL` em
`frontend/js/api.js`.

## Estrutura

```
pocoes-e-solucoes/
├── backend/
│   ├── config/
│   │   └── database.js          # conexão Sequelize + SQLite (:memory:)
│   ├── controllers/
│   │   └── potionController.js  # lógica de cadastrar/listar/remover
│   ├── database/
│   │   └── seedPotions.js       # poções de exemplo do enunciado
│   ├── middlewares/
│   │   └── requestLogger.js     # log simples de requisições
│   ├── models/
│   │   └── Potion.js            # model Sequelize (nome, descrição, imagem, preço)
│   ├── routes/
│   │   └── potionRoutes.js      # rotas /api/potions
│   ├── server.js                # ponto de entrada do backend
│   └── package.json
│
├── frontend/
│   ├── index.html               # página pública da loja
│   ├── admin.html               # painel administrativo
│   ├── css/
│   │   ├── variables.css        # cores, fonte (Gill Sans) e espaçamentos
│   │   ├── style.css            # estilos gerais / loja
│   │   └── admin.css            # estilos do painel administrativo
│   └── js/
│       ├── api.js               # camada de chamadas AJAX (fetch) ao backend
│       ├── main.js              # lógica da página pública
│       └── admin.js             # lógica do painel administrativo
│
└── README.md

```

## Observações

Sem React no frontend — era opcional no enunciado, então optei por JS puro
mesmo. A fonte usada é Gill Sans (pedido da cliente no enunciado), e as
imagens das poções de exemplo são os links originais do PDF da atividade.

Fiz tudo conforme o enunciado pedia, simples por questão do fim do semestre 
ser mais puxado, mas ainda cumprindo tudo pedido no enunciado da atividade.
