export class TodoEntity {
  constructor(
    public readonly id: string,
    public readonly text: string,
    public readonly completedAt?: Date | null,
  ) {}

  get isCompleted() {
    return !!this.completedAt
  }

  public static fromObject(object: { [key: string]: any }): TodoEntity {
    const { id, text, completedAt } = object

    if (!id || isNaN(Number(id))) throw new Error('ID number is required')

    if (!text) throw new Error('Text is required')

    let newCompletedAt

    if (completedAt) {
      newCompletedAt = new Date(completedAt)

      if (isNaN(newCompletedAt.getTime())) {
        throw new Error('Invalid Date')
      }

      // Or Better:
      // if (newCompletedAt.toString() === 'Invalid Date') {
      //   throw 'Invalid Date'
      // }
    }

    return new TodoEntity(id, text, completedAt)
  }
}
