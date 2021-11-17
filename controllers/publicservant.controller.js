const db = require('../db')

class PublicServantController {
    async addRecord(req, res) {
        const { email, cname, disease_code, total_deaths, total_patients } = req.body // salary is int
        try {
            await db.query('INSERT INTO Record VALUES ($1, $2, $3, $4, $5);', [email, cname, disease_code, total_deaths, total_patients]);

            res.json({ message: "Successfully added the tuple" })
        } catch (error) {
            console.log('error', error)

            res.json({ message: "Some of the fields were invalid" })
        }
    }

    async updateRecord(req, res) {
        const { email, cname, disease_code, total_deaths, total_patients} = req.body // salary is int

        try {
            await db.query(
                'UPDATE Record ' +
                'SET total_deaths = $4, total_patients = $5 ' +
                'WHERE email = $1 AND cname = $2 AND disease_code = $3;', [email, cname, disease_code, total_deaths, total_patients]);


            res.json({ message: "Successfully updated the tuple" })
        } catch (error) {
            console.log('error', error)

            res.json({ message: "Some of the fields were invalid" })
        }
    }

    async deleteRecord(req, res) {
        const { email, cname, disease_code } = req.body // salary is int

        try {
            await
                db.query('DELETE FROM Record WHERE email = $1 AND cname = $2 AND disease_code = $3', [email, cname, disease_code]);

            res.json({ message: 'The Record is Successfully Deleted' })
        } catch (error) {
            console.log('error', error)

            res.json({ message: "Some of the fields were invalid" })
        }
    }

    async getPublicServantsContributions(req, res) {
        try {
            console.log('top public servant');
            const topPublicServantContributions = await db.query(
                'SELECT name, surname, num_contributed_records, num_recorded_countries, recorded_total_patients ' +
                'FROM ( ' +
                    'SELECT rec.email, ' +
                            'COUNT(*) AS num_contributed_records, ' +
                            'COUNT(DISTINCT rec.cname) AS num_recorded_countries, ' +
                            'SUM(total_patients) AS recorded_total_patients ' +
                    'FROM Record rec GROUP BY rec.email) AS HeroesRecords ' +
                'INNER JOIN Users u ON u.email = HeroesRecords.email ' +
                'ORDER BY num_contributed_records DESC;')

            console.log('top public servant contributors', topPublicServantContributions);
            res.json(topPublicServantContributions)
        } catch(error) {
            console.log('error', error);
            res.json({ message: 'The error occured in create user method' })
        }

    }
}

module.exports = new PublicServantController()