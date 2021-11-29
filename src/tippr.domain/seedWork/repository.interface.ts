import { v4 as uuid } from "uuid";

export interface IRepository<IAggregateRoot> {
  getAll(): Promise<IAggregateRoot[]>;
  getById(rootId: uuid): Promise<IAggregateRoot>;
  persist(root: IAggregateRoot);
}
