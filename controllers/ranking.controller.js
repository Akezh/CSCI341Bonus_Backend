const db = require('../db')

class RankingController {
    async getTopCountriesByDeath(req, res) {
        try {
            const topDeathsCountries = await db.query(
                'SELECT r.cname, SUM(r.total_deaths) AS total_deaths ' +
                'FROM record r ' +
                'GROUP BY r.cname ' +
                'ORDER BY total_deaths DESC ' +
                'LIMIT 12;')

            res.json(topDeathsCountries)
        } catch(error) {
            console.log('error', error);
            res.json({ message: 'The error occured in create user method' })
        }
    }

    async getTopCountriesByPatients(req, res) {
        try {
            const topDiseasedCountries = await db.query(
                'SELECT r.cname, SUM(r.total_patients) AS total_patients ' +
                'FROM record r ' +
                'GROUP BY r.cname ' +
                'ORDER BY total_patients DESC ' +
                'LIMIT 12;')

            res.json(topDiseasedCountries)
        } catch(error) {
            console.log('error', error);
            res.json({ message: 'The error occured in create user method' })
        }
    }

    async getTopDiseasesBySpreading(req, res) {
        try {
            const topDiseases = await db.query(
                'SELECT rec.disease_code, SUM(rec.total_patients) AS infected_people, dis.pathogen, dis.description ' +
                'FROM Record rec ' +
                'INNER JOIN Disease dis ON dis.disease_code = rec.disease_code ' +
                'GROUP BY dis.pathogen, rec.disease_code, dis.description ' +
                'ORDER BY infected_people DESC ' +
                'LIMIT 7')

            res.json(topDiseases)
        } catch(error) {
            console.log('error', error);
            res.json({ message: 'The error occured in create user method' })
        }
    }

    async getTopDiseasesByDeath(req, res) {
        try {
            const topDiseaseByDeath = await db.query(
                'SELECT rec.disease_code, SUM(rec.total_deaths) AS died_people, dis.pathogen, dis.description ' +
                'FROM Record rec ' +
                'INNER JOIN Disease dis ON dis.disease_code = rec.disease_code ' +
                'GROUP BY dis.pathogen, rec.disease_code, dis.description ' +
                'ORDER BY died_people DESC ' +
                'LIMIT 7');

            res.json(topDiseaseByDeath)
        } catch(error) {
            console.log('error', error);
            res.json({ message: 'The error occured in create user method' })
        }
    }
}

module.exports = new RankingController()