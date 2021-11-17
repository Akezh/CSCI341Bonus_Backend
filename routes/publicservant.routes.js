const Router = require('express')
const router = new Router()

const publicServantController = require('../controllers/publicservant.controller')

router.post('/records/add', publicServantController.addRecord)
router.put('/records/update', publicServantController.updateRecord)
router.delete('/records/delete', publicServantController.deleteRecord)
router.get('/records/servants', publicServantController.getPublicServantsContributions)

module.exports = router