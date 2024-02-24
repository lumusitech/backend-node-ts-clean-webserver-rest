import { Request, Response } from 'express'

const todos = [
  { id: 1, text: 'some task todo 1', completedAt: new Date() },
  { id: 2, text: 'some task todo 2', completedAt: null },
  { id: 3, text: 'some task todo 3', completedAt: new Date() },
]

export class TodosController {
  // DI
  constructor() {}

  public getTodos = (req: Request, res: Response) => res.json(todos)

  public getTodosById = (req: Request, res: Response) => {
    const id = +req.params.id // '+' convert to number

    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID argument is not a number' })
    }

    const todo = todos.find(todo => todo.id === id)

    return todo ? res.json(todo) : res.status(404).json({ error: `Todo with id ${id} not found` })
  }

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body

    if (!text) {
      return res.status(400).json({ error: 'Text argument is required' })
    }

    const todo = {
      id: todos.length + 1,
      text,
      completedAt: null,
    }

    todos.push(todo)
    return res.status(201).json(todo)
  }

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id
    const { text, completedAt } = req.body

    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID argument is not a number' })
    }

    const todo = todos.find(todo => todo.id === id)

    if (!todo) {
      return res.status(404).json({ error: `Todo with id ${id} not found` })
    }

    todo.text = text || todo.text

    completedAt === 'null'
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt || todo.completedAt))

    return res.json(todo)
  }
}
