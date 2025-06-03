// app.js

const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

const ambiente_processo = "desenvolvimento";
const arquivo_env = ambiente_processo === "producao" ? ".env" : ".env.dev";

dotenv.config({
  path: path.resolve(__dirname, "..", arquivo_env)
});

const PORTA_APP = process.env.APP_PORT || 3334;
const HOST_APP = process.env.APP_HOST || "localhost";

const app = express();

const usuarioRouter = require("./src/routes/usuarios");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use("/usuarios", usuarioRouter);

app.listen(PORTA_APP, function () {
  console.log(`Servidor rodando em http://${HOST_APP}:${PORTA_APP}`);
});
