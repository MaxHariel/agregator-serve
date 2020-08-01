'use strict'

const User = use('App/Models/User')

class AuthController {
    async register({ request, response }) {
        try {
            const data = request.only(['username', 'email', 'password']);
            let user = await User.findBy("email", data.email);
            if (user) response.status(409).json({ message: "E-mail já cadastrado" });
            user = await User.findBy("username", data.username);
            if (user) response.status(409).json({ message: "Username já cadastrado" });

            user = await User.create(data);
            response.status(201).json({ message: "Usuário cadastrado com sucesso" })

        } catch (error) {
            //console.error(error);
        }
    }

    async authenticate({ request, response, auth }) {
        const { email, password } = request.all()
        const token = await auth.attempt(email, password)
        return token;
    }

    async app() {
        return 'Hello meu chapa';
    }
}

module.exports = AuthController
