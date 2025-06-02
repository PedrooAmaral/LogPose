var ambiente_processo = 'desenvolvimento';
var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
require('dotenv').config({ path: caminho_env });

var express = require('express');
var cors = require('cors');
var path = require('path');

var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var usuariosRouter = require('./routes/usuarios');
var frutasRouter   = require('./routes/frutas');
var sagasRouter    = require('./routes/sagas');
var quizRouter     = require('./routes/quiz');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

app.use('/api/usuarios', usuariosRouter);
app.use('/api/fruits',   frutasRouter);
app.use('/api/sagas',    sagasRouter);
app.use('/api/quiz',     quizRouter);

app.listen(PORTA_APP, function () {
  console.log(`
    Servidor LogPose rodando em http://${HOST_APP}:${PORTA_APP}
    Ambiente de execução: ${process.env.AMBIENTE_PROCESSO}
  `);
});
