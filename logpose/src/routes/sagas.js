const express = require('express');
const router = express.Router();
const db = require('../database/config');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, title, description FROM sagas ORDER BY id');
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Erro ao buscar sagas');
  }
});

module.exports = router;
