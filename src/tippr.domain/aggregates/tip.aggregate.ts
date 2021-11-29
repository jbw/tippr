import { v4 as uuid } from "uuid";

import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { AggregateRoot } from "@nestjs/cqrs";

import { TipCreatedEvent } from "../events/tip-created-event";

@Entity()
export default class Tip extends AggregateRoot {
  constructor( amount: number, message: string) {
    super();

    this.amount = amount;
    this.message = message;

    // add domain event
    this.apply(new TipCreatedEvent(uuid(), amount, message));
  }

  @PrimaryKey()
  id: string = uuid();

  // TODO: Can we pull out of the properties into it's own configuration?
  @Property()
  amount!: number;

  @Property()
  message: string;

  @Property()
  created: Date = new Date();
}
