import request from 'supertest'
import { prisma } from '../../../src/data/postgres-db'
import { testServer } from '../../test-server'

describe('todos/routes.ts', () => {
  beforeAll(() => {
    testServer.start()
  })

  beforeEach(async () => {
    await prisma.todo.deleteMany()
  })

  afterAll(() => {
    testServer.close()
  })

  const todo1 = { text: 'task 1' }
  const todo2 = { text: 'task 2' }

  it('should return TODOs at endpoint api/todos', async () => {
    await prisma.todo.createMany({ data: [todo1, todo2] })

    const { body } = await request(testServer.app).get('/api/todos').expect(200)

    // console.log({ response: body })

    expect(body).toBeInstanceOf(Array)
    expect(body).toHaveLength(2)
    expect(body[0].text).toBe(todo1.text)
    expect(body[1].text).toBe(todo2.text)
    expect(body[0].completedAt).toBeNull()
  })

  it('should return a TODO at endpoint api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: todo1 })

    const { body } = await request(testServer.app).get(`/api/todos/${todo.id}`).expect(200)

    expect(body).toEqual({
      id: todo.id,
      text: todo.text,
      completedAt: todo.completedAt,
    })
  })

  it('should return a 404 Not Found at endpoint api/todos/:id', async () => {
    // Remember: before each test --> await prisma.todo.deleteMany()
    const id = 1
    const { body } = await request(testServer.app).get(`/api/todos/${id}`).expect(404)

    // console.log({ body })
    expect(body).toEqual({ error: `todo with id ${id} not found` })
  })

  it('should create a TODO with the given body at endpoint POST api/todos', async () => {
    const { body } = await request(testServer.app).post('/api/todos').send(todo1).expect(201)

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: null,
    })
  })

  it('should not create a TODO at endpoint POST api/todos if text is not present', async () => {
    const { body } = await request(testServer.app).post('/api/todos').send({}).expect(400)

    // console.log({ body })
    expect(body).toEqual({ error: 'text is required' })
  })

  it('should not create a TODO at endpoint POST api/todos if text is empty', async () => {
    const { body } = await request(testServer.app).post('/api/todos').send({ text: '' }).expect(400)

    // console.log({ body })
    expect(body).toEqual({ error: 'text is required' })
  })

  it('should update a TODO with the given TODO at endpoint PUT api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: todo1 })

    const textToUpdate = 'updated text'
    const dateToUpdate = '2024-03-11'

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({ text: textToUpdate, completedAt: dateToUpdate })
      .expect(200)

    // console.log({ body })

    expect(body).toEqual({
      id: todo.id,
      text: textToUpdate,
      completedAt: new Date(dateToUpdate).toISOString(),
    })
  })

  it('should update a TODO with only the given text at endpoint PUT api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: todo1 })

    const textToUpdate = 'updated text'

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({ text: textToUpdate })
      .expect(200)

    // console.log({ body })

    expect(body).toEqual({
      id: todo.id,
      text: textToUpdate,
      completedAt: todo.completedAt,
    })
  })

  it('should update a TODO with only the given date at endpoint PUT api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: todo1 })

    const dateToUpdate = '2024-03-11'

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({ completedAt: dateToUpdate })
      .expect(200)

    // console.log({ body })

    expect(body).toEqual({
      id: todo.id,
      text: todo.text,
      completedAt: new Date(dateToUpdate).toISOString(),
    })
  })

  it('should not update a TODO with an invalid id at endpoint PUT api/todos/:id', async () => {
    const { body } = await request(testServer.app).put(`/api/todos/1`).send({}).expect(404)

    // console.log({ body })
    expect(body).toEqual({ error: 'todo with id 1 not found' })
  })

  it('should not update a TODO with an invalid date at endpoint PUT api/todos/:id', async () => {
    const { id } = await prisma.todo.create({ data: todo1 })

    const invalidDate = 'invalid date'

    const { body } = await request(testServer.app)
      .put(`/api/todos/${id}`)
      .send({ completedAt: invalidDate })
      .expect(400)

    // console.log({ body })
    expect(body).toEqual({ error: 'completedAt must be a valid date' })
  })

  it('should delete a TODO with the given id at endpoint DELETE api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: todo1 })

    const { body } = await request(testServer.app).delete(`/api/todos/${todo.id}`).expect(200)

    // console.log({ body })
    expect(body).toEqual(todo)
  })

  it('should not delete a TODO with an invalid id at endpoint DELETE api/todos/:id', async () => {
    const id = 1

    const { body } = await request(testServer.app).delete(`/api/todos/${id}`).expect(404)

    // console.log({ body })
    expect(body).toEqual({ error: `todo with id ${id} not found` })
  })
})
