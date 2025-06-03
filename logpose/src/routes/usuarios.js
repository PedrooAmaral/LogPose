// src/routes/usuarios.js

const express = require("express");
const router  = express.Router();
const db      = require("../database/config");

// POST /usuarios/cadastrar
router.post("/cadastrar", async (req, res) => {
  const { nomeServer: nome, emailServer: email, senhaServer: senha } = req.body;

  try {
    await db.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senha]
    );
    return res.status(201).send("cadastro realizado");
  } catch (err) {
    console.error("ERRO AO CADASTRAR:", err);
    return res.status(500).send("erro no servidor");
  }
});

// POST /usuarios/autenticar
router.post("/autenticar", async (req, res) => {
  const { emailServer: email, senhaServer: senha } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT id, nome, email FROM usuarios WHERE email = ? AND senha = ?",
      [email, senha]
    );
    if (rows.length === 0) {
      return res.status(401).send("credenciais incorretas");
    }
    const user = rows[0];
    return res.json({ id: user.id, nome: user.nome, email: user.email });
  } catch (err) {
    console.error("ERRO AO AUTENTICAR:", err);
    return res.status(500).send("erro no servidor");
  }
});

// GET /usuarios/count
router.get("/count", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT COUNT(*) AS total FROM usuarios");
    const total = rows[0].total || 0;
    return res.json({ total });
  } catch (err) {
    console.error("ERRO AO CONTAR USUÁRIOS:", err);
    return res.status(500).send("erro no servidor");
  }
});

module.exports = router;
