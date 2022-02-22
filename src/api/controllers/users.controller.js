const usersService = require('@api/services/users')

const usersController = {
    helloWorld(req, res) {
        res.send('Hello world!')
    },
    
    async getUsers (req, res) { 
        try {
          const users = await usersService.getUsers();

          return res.status(200).json(users);
        } catch (err) {
          return res.status(400).json(err);
        }
    },

    async createUser (req, res) {
        try {
            await usersService.createUser ();

            return res.status(200).send('User created');
        } catch (err) {
          return res.status(400).json(err);
        }
    }
}

module.exports = usersController