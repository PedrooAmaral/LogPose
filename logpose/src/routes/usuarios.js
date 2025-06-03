const express = require('express')
const router = express.Router()
const db = require('../database/config')

router.post('/cadastrar', async (req, res) => {
  const { nomeServer: nome, emailServer: email, senhaServer: senha } = req.body
  try {
    await db.query(
      'insert into usuarios (nome, email, senha) values (?, ?, ?)',
      [nome, email, senha]
    )
    return res.status(201).send('cadastro realizado')
  } catch (err) {
    console.error(err)
    return res.status(500).send('erro no servidor')
  }
})

router.post('/autenticar', async (req, res) => {
  const { emailServer: email, senhaServer: senha } = req.body
  try {
    const [rows] = await db.query(
      'select id, nome, email from usuarios where email = ? and senha = ?',
      [email, senha]
    )
    if (rows.length === 0) {
      return res.status(401).send('credenciais incorretas')
    }
    const user = rows[0]
    return res.json({ id: user.id, nome: user.nome, email: user.email })
  } catch (err) {
    console.error(err)
    return res.status(500).send('erro no servidor')
  }
})


router.get('/count', async (req, res) => {
  try {
    const [rows] = await db.query(
      'select count(*) as total from usuarios'
    )
    const total = rows[0].total || 0
    return res.json({ total })
  } catch (err) {
    console.error(err)
    return res.status(500).send('erro no servidor')
  }
})

module.exports = router
