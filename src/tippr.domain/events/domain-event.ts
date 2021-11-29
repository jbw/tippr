import { v4 as uuid } from "uuid";

export interface IDomainEvent {
  aggregateRoodId: uuid;
  created: Date;
}
