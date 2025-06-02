const express = require('express');
const router = express.Router();
const db = require('../database/config');

router.get('/questions', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, question, options_json AS options, answer_index FROM quiz_questions');
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Erro ao buscar perguntas');
  }
});

router.post('/submit', async (req, res) => {
  const { userId, score, total } = req.body;
  try {
    await db.query(
      'INSERT INTO quiz_results (user_id, score, total_questions) VALUES (?, ?, ?)',
      [userId, score, total]
    );
    return res.status(201).send('Resultado salvo');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Erro ao salvar resultado');
  }
});

router.get('/general', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        ROUND(AVG(score / total_questions * 100), 2) AS avg_pct 
      FROM quiz_results
    `);
    const avg = rows.length ? rows[0].avg_pct : 0;
    return res.json({
      quizzes: ['Geral'],
      avgCorrect: [avg]
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Erro ao buscar estatísticas');
  }
});

module.exports = router;
