import { Request, Response } from 'express'

const todos = [
  { id: 1, text: 'some task todo 1', createdAt: new Date() },
  { id: 2, text: 'some task todo 2', createdAt: null },
  { id: 3, text: 'some task todo 3', createdAt: new Date() },
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
}
