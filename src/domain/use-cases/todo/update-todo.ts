import type { UpdateTodoDto } from '../../dtos'
import type { TodoEntity } from '../../entities'
import type { TodoRepository } from '../../repositories'

export interface UpdateTodoUseCase {
  execute(dto: UpdateTodoDto): Promise<TodoEntity>
}

export class UpdateTodo implements UpdateTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  execute(dto: UpdateTodoDto): Promise<TodoEntity> {
    return this.todoRepository.updateById(dto)
  }
}
