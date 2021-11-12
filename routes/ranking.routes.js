const Router = require('express')
const router = new Router()

const rankingController = require('../controllers/ranking.controller')

router.get('/ranking/deaths', rankingController.getTopCountriesByDeath)
router.get('/ranking/patients', rankingController.getTopCountriesByPatients)
router.get('/ranking/diseaseSpreading', rankingController.getTopDiseasesBySpreading)
router.get('/ranking/diseaseDeaths', rankingController.getTopDiseasesByDeath)

module.exports = router