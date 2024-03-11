import request from 'supertest'
import { prisma } from '../../../src/data/postgres-db'
import { testServer } from '../../test-server'

describe('todos/routes.ts', () => {
  beforeAll(() => {
    testServer.start()
  })

  afterAll(() => {
    testServer.close()
  })

  const todo1 = { text: 'task 1' }
  const todo2 = { text: 'task 2' }

  it('should return TODOs at endpoint api/todos', async () => {
    await prisma.todo.deleteMany()
    await prisma.todo.createMany({ data: [todo1, todo2] })

    const { body } = await request(testServer.app).get('/api/todos').expect(200)

    // console.log({ response: body })

    expect(body).toBeInstanceOf(Array)
    expect(body).toHaveLength(2)
    expect(body[0].text).toBe(todo1.text)
    expect(body[1].text).toBe(todo2.text)
    expect(body[0].completedAt).toBeNull()
  })
})
