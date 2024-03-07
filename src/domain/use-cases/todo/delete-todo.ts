import type { TodoEntity } from '../../entities'
import type { TodoRepository } from '../../repositories'

export interface DeleteTodoUseCase {
  execute(id: number): Promise<TodoEntity>
}

export class DeleteTodo implements DeleteTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  execute(id: number): Promise<TodoEntity> {
    return this.todoRepository.deleteById(id)
  }
}
