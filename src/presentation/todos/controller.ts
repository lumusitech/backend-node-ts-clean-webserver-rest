import { Request, Response } from 'express'
import { prisma } from '../../data/postgres-db'

export class TodosController {
  // DI
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany()
    return res.json(todos)
  }

  public getTodosById = async (req: Request, res: Response) => {
    const id = +req.params.id // '+' convert to number

    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID argument is not a number' })
    }

    const todo = await prisma.todo.findUnique({ where: { id } })

    return todo ? res.json(todo) : res.status(404).json({ error: `Todo with id ${id} not found` })
  }

  public createTodo = async (req: Request, res: Response) => {
    const { text } = req.body

    if (!text) {
      return res.status(400).json({ error: 'Text argument is required' })
    }

    const todo = await prisma.todo.create({
      data: {
        text,
      },
    })

    return res.json(todo)
  }

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id
    const { text, completedAt } = req.body

    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID argument is not a number' })
    }

    const todo = await prisma.todo.findUnique({ where: { id } })

    if (!todo) {
      return res.status(404).json({ error: `Todo with id ${id} not found` })
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        text,
        completedAt: completedAt ? new Date(completedAt) : null,
      },
    })

    return res.json(updatedTodo)
  }

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id

    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID argument is not a number' })
    }

    const todo = await prisma.todo.findUnique({ where: { id } })

    if (!todo) {
      return res.status(404).json({ error: `Todo with id ${id} not found` })
    }

    const deleted = await prisma.todo.delete({ where: { id } })

    return deleted
      ? res.json(deleted)
      : res.status(400).json({ error: `Failed to delete todo with id ${id}` })
  }
}
