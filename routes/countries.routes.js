const Router = require('express')
const router = new Router()

const countriesController = require('../controllers/countries.controller')

router.get('/countries/pandemicStatus', countriesController.getPandemicStatusTable)
router.post('/countries/pandemicStatus', countriesController.getFilteredPandemicStatusTable)
router.post('/countries/country', countriesController.getCountryInfo)

module.exports = router