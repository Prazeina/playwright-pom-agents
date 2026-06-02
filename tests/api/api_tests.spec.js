import { test, expect } from '../../fixtures/test.js'


test.only('chained: request', async({ apiContext}) => {
    // Get the list
    const listRes = await apiContext.get('/posts')
    const list = await listRes.json()

    // extract value from response
    const firstId = list[0].id

    //use it in next request
    const itemRes = await apiContext.get(`/posts/${firstId}`)
    // assert
    expect(itemRes.status()).toBe(200)
    
    const item = await itemRes.json()
    expect(item.id).toBe(firstId)
})


test('Get API test', async({ apiContext }) => {
    const res = await apiContext.get('/posts/1')

    expect(res.status()).toBe(200)

    const body = await res.json()

    expect(body.id).toBe(1)
    expect(body.title).toEqual(expect.any(String))

    expect(body).toMatchObject({
        id: 1,
        userId: 1
    })
})

test('Post', async({ apiContext }) => {
    const newPost = {
        title: 'oa prep',
        body: 'hello world',
        userId: 1
    }

    const res = await apiContext.post('/posts', {
        data: newPost
    })

    expect(res.status()).toBe(201)
    
    const body = await res.json()

    expect(body.title).toEqual('oa prep')
    expect(body.userId).toBe(1)
})