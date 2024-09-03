type RepositoryInterface<T> = {
  create(entity: T): Promise<void>

  update(entity: T): Promise<void>

  delete(id: string): void

  find(id: string): Promise<T>

  findAll(): Promise<T[]>
}
export default RepositoryInterface
