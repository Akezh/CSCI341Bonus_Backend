const db = require('../db')

class CountriesController {
    async getPandemicStatusTable(req, res) {
        try {
            const worldPandemicTable = await
                db.query('SELECT rec.cname, ' +
                    'ROUND((SUM(total_deaths) * 1.0)/(SUM(total_patients) * 1.0)*100, 3) AS death_ratio, ' +
                    'SUM(total_deaths) as total_deaths, ' +
                    'SUM(total_patients) as total_patients, cntry.population, ' +
                    'ROUND((SUM(rec.total_deaths) * 1.0)/(SUM(cntry.population) * 1.0)*100, 3) AS population_death_ratio, ' +
                    'ROUND((SUM(rec.total_patients) * 1.0)/(SUM(cntry.population) * 1.0)*100, 3) AS population_infection_ratio ' +
                    'FROM Record rec ' +
                    'INNER JOIN Country cntry ON rec.cname = cntry.cname ' +
                    'GROUP BY rec.cname, cntry.population ' +
                    'ORDER BY rec.cname ASC');

            res.json(worldPandemicTable)
        } catch(error) {
            console.log('error', error);
            res.json({ message: "Error occured" })
        }
    }

    async getFilteredPandemicStatusTable(req, res) {
        const { filter_field } = req.body // salary is int

        try {
            const filterQuery =
                'SELECT rec.cname, ' +
                'ROUND((SUM(total_deaths) * 1.0)/(SUM(total_patients) * 1.0)*100, 3) AS death_ratio, ' +
                'SUM(total_deaths) as total_deaths, ' +
                'SUM(total_patients) as total_patients, cntry.population, ' +
                'ROUND((SUM(rec.total_deaths) * 1.0)/(SUM(cntry.population) * 1.0)*100, 3) AS population_death_ratio, ' +
                'ROUND((SUM(rec.total_patients) * 1.0)/(SUM(cntry.population) * 1.0)*100, 3) AS population_infection_ratio ' +
                'FROM Record rec ' +
                'INNER JOIN Country cntry ON rec.cname = cntry.cname ' +
                'GROUP BY rec.cname, cntry.population ' +
                'ORDER BY $1 DESC;'.replace('$1', filter_field);
            const worldPandemicTable = await db.query(filterQuery);

            res.json(worldPandemicTable)
        } catch(error) {
            console.log('error', error);
            res.json({ message: "Error occured" })
        }
    }

    async getCountryInfo(req, res) {
        const { country } = req.body;

        try {
            const filterQuery =
                'SELECT DISTINCT * ' +
                'FROM ( ' +
                        'SELECT cname, ROUND(AVG(salary)) AS average_salary, COUNT(ps.email) AS public_survants_number, COUNT(d.email) AS doctors_number ' +
                        'FROM Users u ' +
                        'LEFT JOIN PublicServant ps ON u.email = ps.email ' +
                        'LEFT JOIN Doctor d ON u.email = d.email ' +
                        'WHERE u.cname = \'$1\' ' +
                        'GROUP BY cname ORDER BY cname ' +
                ') AS CountrySalaries ' +
                'INNER JOIN ( ' +
                        'SELECT rec.cname, ' +
                                'ROUND((SUM(total_deaths) * 1.0)/(SUM(total_patients) * 1.0)*100, 3) AS death_ratio, ' +
                                'SUM(total_deaths) as total_deaths, ' +
                                'SUM(total_patients) as total_patients, cntry.population, ' +
                                'ROUND((SUM(rec.total_deaths) * 1.0)/(SUM(cntry.population) * 1.0)*100, 3) AS population_death_ratio, ' +
                                'ROUND((SUM(rec.total_patients) * 1.0)/(SUM(cntry.population) * 1.0)*100, 3) AS population_infection_ratio ' +
                        'FROM Record rec ' +
                        'INNER JOIN Country cntry ON rec.cname = cntry.cname ' +
                        'GROUP BY rec.cname, cntry.population ' +
                        'HAVING rec.cname = \'$1\' ' +
                ') AS PandemicData ' +
                'ON CountrySalaries.cname = PandemicData.cname ' +
                'INNER JOIN ( ' +
                        'SELECT cname, COUNT(disease_code) AS discovered_diseases, MIN(first_enc_date) AS first_disease_encounter_date ' +
                        'FROM discover ' +
                        'GROUP BY cname ' +
                ') AS DiseaseInfo ' +
                'ON PandemicData.cname = DiseaseInfo.cname;';
            const result = filterQuery.replace('$1', country).replace('$1', country);
            const countryPandemicStatus = await db.query(result);

            res.json(countryPandemicStatus.rows[0])
        } catch(error) {
            console.log('error', error);
            res.json({ message: "Error occured" })
        }
    }
}

module.exports = new CountriesController()