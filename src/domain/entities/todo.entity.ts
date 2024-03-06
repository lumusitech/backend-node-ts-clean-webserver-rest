export class TodoEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly completedAt?: Date | null,
  ) {}

  get isCompleted() {
    return !!this.completedAt
  }
}
