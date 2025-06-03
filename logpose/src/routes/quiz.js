const express = require("express");
const router = express.Router();
const pool = require("../database/config");

router.post("/registrar", async (req, res) => {
  const { fk_usuario, acertos, erros } = req.body;

  try {
    await pool.query(
      `INSERT INTO pontuacao (fk_usuario, acertos, erros) VALUES (?, ?, ?)`,
      [fk_usuario, acertos, erros]
    );
    res.status(200).json({ mensagem: "Pontuação registrada com sucesso!" });
  } catch (erro) {
    console.error("Erro ao registrar pontuação:", erro);
    res.status(500).json({ erro: "Erro ao registrar pontuação." });
  }
});

router.get("/dificuldade", async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        questao,
        SUM(acertou = 1) AS total_acertos,
        SUM(acertou = 0) AS total_erros,
        COUNT(*) AS total_respostas,
        ROUND(SUM(acertou = 1) / COUNT(*) * 100, 2) AS taxa_acerto
      FROM resposta
      GROUP BY questao
      ORDER BY taxa_acerto ASC
    `);

    if (result.length === 0) {
      return res.status(200).json({ mensagem: "Nenhuma resposta registrada ainda." });
    }

    const maisDificil = result[0];
    const maisFacil = result[result.length - 1];

    res.status(200).json({
      maisDificil,
      maisFacil
    });
  } catch (erro) {
    console.error("Erro ao buscar dados de dificuldade:", erro);
    res.status(500).json({ erro: "Erro ao buscar dados de dificuldade." });
  }
});

router.post("/responder", async (req, res) => {
  const { fk_usuario, questao, acertou } = req.body;

  try {
    await pool.query(
      `INSERT INTO resposta (fk_usuario, questao, acertou) VALUES (?, ?, ?)`,
      [fk_usuario, questao, acertou]
    );
    res.status(200).json({ mensagem: "Resposta registrada com sucesso!" });
  } catch (erro) {
    console.error("Erro ao registrar resposta:", erro);
    res.status(500).json({ erro: "Erro ao registrar resposta." });
  }
});

module.exports = router;
