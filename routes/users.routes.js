const Router = require('express')
const router = new Router()

const userController = require('../controllers/users.controller')

router.post('/users', userController.createUser)
router.get('/users', userController.getUsers)
router.get('/users/:id', userController.getOneUser)
router.put('/users', userController.updateUser)
router.delete('/users/:id', userController.deleteUser)

module.exports = router