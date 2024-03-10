import type { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from '../../domain'
import { TodoRepository } from '../../domain/repositories/todo.repository'

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private readonly dataSource: TodoDatasource) {}

  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.dataSource.create(createTodoDto)
  }

  deleteById(id: number): Promise<TodoEntity> {
    return this.dataSource.deleteById(id)
  }

  findById(id: number): Promise<TodoEntity> {
    return this.dataSource.findById(id)
  }

  getAll(): Promise<TodoEntity[]> {
    return this.dataSource.getAll()
  }

  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.dataSource.updateById(updateTodoDto)
  }
}
