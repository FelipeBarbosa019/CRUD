const express = require("express")
const { getUser, postUser, putUser, deleteUser } = require ("../controllers")

const router = express()

router.get('/usuarios', getUser)
router.post('/usuarios', postUser)
router.put('/usuarios/:id', putUser)
router.delete('/usuarios/:id', deleteUser)
router.use('/',express.static('C:/Users/tailinha/Desktop/Felps/Alpha/Servidores/P14/public/'))

module.exports = router