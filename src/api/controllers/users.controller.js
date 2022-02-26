const usersService = require('@api/services/users')

const usersController = {
    helloWorld(req, res) {
        res.send('Hello world!')
    },

    async getUser(req, res) {
        const userId = req.params.id
        
        try {
            const data = await usersService.getUser(userId)

            res.status(200).json(data)
        } catch (err) {
            res.status(400).json(sendError)
        }
    },

    async createUser(req, res) {
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }

        try {
            await usersService.createUser(newUser)

            res.send('User created')
        } catch (err) {
            res.status(400).json(err)
        }
    }
}

module.exports = usersController