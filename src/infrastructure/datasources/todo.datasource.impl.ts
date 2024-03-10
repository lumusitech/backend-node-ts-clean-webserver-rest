import { prisma } from '../../data/postgres-db'
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from '../../domain'

export class TodoDatasourceImpl implements TodoDatasource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({ data: createTodoDto! })
    return TodoEntity.fromObject(todo)
  }

  async deleteById(id: number): Promise<TodoEntity> {
    await this.findById(id)
    const deleted = await prisma.todo.delete({ where: { id } })
    return TodoEntity.fromObject(deleted)
  }

  async findById(id: number): Promise<TodoEntity> {
    const todoFromDb = await prisma.todo.findUnique({ where: { id } })
    if (!todoFromDb) throw `todo with id ${id} not found`
    return TodoEntity.fromObject(todoFromDb)
  }

  async getAll(): Promise<TodoEntity[]> {
    const todosFromDb = await prisma.todo.findMany()
    return todosFromDb.map(TodoEntity.fromObject)
  }

  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.findById(updateTodoDto.id)

    const updatedTodo = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data: updateTodoDto!.values,
    })

    return TodoEntity.fromObject(updatedTodo)
  }
}
