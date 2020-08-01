const { test, trait } = use('Test/Suite')('User Registration')

trait('Test/ApiClient')

test('create user', async ({ client }) => {
    const response = await client.post('/register').send({
        username: "maxiii233",
        email: "maxhariell23@gmail.com",
        password: "123456"
    }).end()

    response.assertStatus(201)
    response.assertJSONSubset({
        message: "Usuário cadastrado com sucesso"
    })
})

test("don't create empty user", async ({ client, assert }) => {
    const response = await client.post('/register').end()
    response.assertStatus(204)
})

test("don't create a user if contain e-mail already registered", async ({ client, assert }) => {
    const response = await client.post('/register').send({
        username: "maxi",
        email: "maxhariell23@gmail.com",
        password: "123456"
    }).end()

    response.assertStatus(409)
    response.assertJSONSubset({
        message: "E-mail já cadastrado"
    })
})

test("don't create a user if contain username already registered", async ({ client, assert }) => {
    const response = await client.post('/register').send({
        username: "maxiii233",
        email: "maxhariell238@gmail.com",
        password: "123456"
    }).end()

    response.assertStatus(409)
    response.assertJSONSubset({
        message: "Username já cadastrado"
    })
})