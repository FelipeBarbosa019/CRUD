const express = require("express")
const { getUser, postUser, putUser, deleteUser } = require ("../controllers")

const router = express()

router.get('/usuarios', getUser)
router.post('/usuarios', postUser)
router.put('/usuarios/:id', putUser)
router.delete('/usuarios/:id', deleteUser)

module.exports = router