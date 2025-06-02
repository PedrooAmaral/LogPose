const express = require('express');
const router = express.Router();
const db = require('../database/config');
const bcrypt = require('bcrypt');

router.post('/cadastrar', async (req, res) => {
  const { nomeServer: nome, emailServer: email, senhaServer: senha } = req.body;
  try {
    const [rows] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).send('E-mail já cadastrado');
    }
    const hash = await bcrypt.hash(senha, 10);
    await db.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, hash]
    );
    return res.status(201).send('Cadastro realizado');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Erro no servidor');
  }
});

router.post('/autenticar', async (req, res) => {
  const { emailServer: email, senhaServer: senha } = req.body;
  try {
    const [rows] = await db.query('SELECT id, nome, email, senha FROM usuarios WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).send('Credenciais incorretas');
    }
    const user = rows[0];
    const ok = await bcrypt.compare(senha, user.senha);
    if (!ok) {
      return res.status(401).send('Credenciais incorretas');
    }
    return res.json({ id: user.id, nome: user.nome, email: user.email });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Erro no servidor');
  }
});

module.exports = router;
