'use strict'

const User = use('App/Models/User')

class AuthController {

    async register({ request, response }) {
        const data = request.only(['username', 'email', 'password'])
        const user = await User.create(data);
        let status = {status : "200"};
        return status;
    }

    async authenticate({request, response, auth}) {
       const {email, password} = request.all()
       const token = await auth.attempt(email, password)
       return token;
    }

    async app() {
        return 'Hello meu chapa';
    }
}

module.exports = AuthController
