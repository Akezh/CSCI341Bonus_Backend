const db = require('../db')

class UsersController {
    async createUser(req, res) {
        const { email, name, surname, salary, phone, cname: country, isDoctor, field } = req.body // salary is int
        const newPerson = await db.query('INSERT INTO Users VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [email, name, surname, salary, phone, country]);

        if (isDoctor) {
            await db.query('INSERT INTO Doctor VALUES ($1, $2) RETURNING *', [email, field]);
        } else {
            await db.query('INSERT INTO PublicServant VALUES ($1, $2) RETURNING *', [email, field]);
        }

        res.json(newPerson.rows[0])
    }

    async getUsers(req, res) {
        const users = await db.query('SELECT * FROM Users')

        res.json(users)
    }

    async getOneUser(req, res) {

    }

    async updateUser(req, res) {
        //TODO: Update by email, name and surname. User should fill the form to update it
    }

    async deleteUser(req, res) {

    }
}

module.exports = new UsersController()