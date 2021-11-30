import { v4 as uuid } from "uuid";

import { IEvent } from "@nestjs/cqrs";

export interface IDomainEvent extends IEvent {
  aggregateRoodId: uuid;
  created: Date;
}
