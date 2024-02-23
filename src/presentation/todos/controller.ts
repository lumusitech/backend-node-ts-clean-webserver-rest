import { Request, Response } from 'express'

export class TodosController {
  // DI
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json({
      ok: true,
      todos: [
        { id: 1, text: 'some task todo 1', createdAt: new Date() },
        { id: 2, text: 'some task todo 2', createdAt: null },
        { id: 3, text: 'some task todo 3', createdAt: new Date() },
      ],
    })
  }
}
