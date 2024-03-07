import type { CreateTodoDto, UpdateTodoDto } from '../dtos'
import type { TodoEntity } from '../entities/todo.entity'

export abstract class TodoRepository {
  abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>
  abstract deleteById(id: number): Promise<TodoEntity>
  abstract findById(id: number): Promise<TodoEntity>
  abstract getAll(): Promise<TodoEntity[]> // todo: add pagination and others by props
  abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>
}
