
export interface IRepository<IAggregatRoot> {
  getAll(): Promise<IAggregatRoot[]>;
  persist(root: IAggregatRoot);
}
