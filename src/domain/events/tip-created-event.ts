import { v4 as uuid } from "uuid";

import { Logger } from "@nestjs/common";

import { IDomainEvent } from "./domain-event";

export class TipCreatedEvent implements IDomainEvent {
  public readonly aggregateRoodId: uuid;
  public readonly created: Date;

  constructor(tipId: uuid, amount: number, message: string) {
    this.aggregateRoodId = tipId;

    Logger.log(`TipCreatedEvent was created`);
  }
}
