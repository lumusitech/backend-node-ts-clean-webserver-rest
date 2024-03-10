import type { CreateTodoDto } from '../../dtos'
import type { TodoEntity } from '../../entities'
import type { TodoRepository } from '../../repositories'

export interface CreateTodoUseCase {
  execute(dto: CreateTodoDto): Promise<TodoEntity>
}

export class CreateTodo implements CreateTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  execute(dto: CreateTodoDto): Promise<TodoEntity> {
    return this.todoRepository.create(dto)
  }
}
