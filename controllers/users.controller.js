const db = require('../db')

class UsersController {
    async createUser(req, res) {
        const { email, name, surname, salary, phone, cname: country, isDoctor, field } = req.body // salary is int

        try {
            const newPerson = await db.query('INSERT INTO Users VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [email, name, surname, salary, phone, country]);

            if (isDoctor) {
                await db.query('INSERT INTO Doctor VALUES ($1, $2) RETURNING *', [email, field]);
            } else {
                await db.query('INSERT INTO PublicServant VALUES ($1, $2) RETURNING *', [email, field]);
            }

            res.json({ message: 'The registration went successful' })
        } catch(error) {
            console.log('error', error);
            res.json({ message: 'The error occured in create user method' })
        }
    }
}

module.exports = new UsersController()