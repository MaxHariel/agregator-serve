const { test, trait } = use('Test/Suite')('User Registration')

trait('Test/ApiClient')

test('create user', async ({ client }) => {
    const response = await client.post('/register').send({
        username: "maxiii233",
        email: "maxhariell23@gmail.com",
        password: "123456"
    }).end()

    response.assertStatus(200)
    response.assertJSONSubset({
        status: "200"
    })
})

test("don't create empty user", async ({ client, assert }) => {
    const response = await client.post('/register').end()
    response.assertStatus(500)
})

test("don't create a user if contain e-mail or username already resisted", async ({ client, assert }) => {
    const response = await client.post('/register').send({
        username: "maxiii233",
        email: "maxhariell23@gmail.com",
        password: "123456"
    }).end()

    response.assertStatus(500)
})