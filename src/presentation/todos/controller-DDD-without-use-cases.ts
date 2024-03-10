import { Request, Response } from 'express'
import type { TodoRepository } from '../../domain'
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos'

export class TodosController {
  // DI
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    return res.json(await this.todoRepository.getAll())
  }

  public getTodosById = async (req: Request, res: Response) => {
    const id = +req.params.id // '+' convert to number

    try {
      const todo = await this.todoRepository.findById(id)
      return res.json(todo)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body)
    if (error) return res.status(400).json({ error })

    const todo = await this.todoRepository.create(createTodoDto!)

    return res.json(todo)
  }

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id })
    if (error) return res.status(400).json({ error })

    const updatedTodo = await this.todoRepository.updateById(updateTodoDto!)
    return res.json(updatedTodo)
  }

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id
    const deleted = await this.todoRepository.deleteById(id)
    return res.json(deleted)
  }
}
