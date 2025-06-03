// app.js

const express = require("express");
const cors    = require("cors");
const path    = require("path");
const dotenv  = require("dotenv");

// 1) Defina o ambiente (pode ser "producao" ou "desenvolvimento")
const ambiente_processo = "desenvolvimento";

// 2) Se for produção, carrega .env; se for desenvolvimento, carrega .env.dev
const arquivo_env = ambiente_processo === "producao" ? ".env" : ".env.dev";

// 3) Usa path.resolve para apontar ao arquivo .env.dev que está UM NÍVEL acima deste app.js
dotenv.config({
  path: path.resolve(__dirname, "..", arquivo_env)
});

const PORTA_APP = process.env.APP_PORT || 3333;
const HOST_APP  = process.env.APP_HOST || "localhost";

const app = express();

// Importa a rota de usuários (login / cadastro)
const usuarioRouter = require("./src/routes/usuarios");

// Importa a rota de frutas (catálogo)
const frutasRouter  = require("./src/routes/frutas");

// (As demais rotas ficaram comentadas até você implementar os modelos correspondentes)
// const indexRouter     = require("./src/routes/index");
// const avisosRouter    = require("./src/routes/avisos");
// const medidasRouter   = require("./src/routes/medidas");
// const aquariosRouter  = require("./src/routes/aquarios");
// const empresasRouter  = require("./src/routes/empresas");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Serve tudo que estiver em /public como estático
app.use(express.static(path.join(__dirname, "public")));

// Monta as rotas que já existem
app.use("/usuarios",          usuarioRouter);
app.use("/api/frutas",        frutasRouter);

// (Rotas comentadas porque os modelos correspondentes ainda não foram implementados)
// app.use("/",                 indexRouter);
// app.use("/avisos",           avisosRouter);
// app.use("/medidas",          medidasRouter);
// app.use("/aquarios",         aquariosRouter);
// app.use("/empresas",         empresasRouter);

app.listen(PORTA_APP, function () {
  console.log(`
    Servidor do seu site já está rodando! Acesse: http://${HOST_APP}:${PORTA_APP}

    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO || ambiente_processo}:.
    Se for “desenvolvimento”, conecta ao banco local; se for “producao”, conecta ao banco remoto.

    Para alterar o ambiente, comente ou descomente a linha 1 (“const ambiente_processo”) neste arquivo.
  `);
});
