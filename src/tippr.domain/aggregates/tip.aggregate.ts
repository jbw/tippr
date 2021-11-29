import { Entity as MikroEntity, PrimaryKey, Property } from "@mikro-orm/core";

import { Entity } from "../seedWork/Entity";

@MikroEntity()
export default class Tip extends Entity {

  constructor(amount: number, message: string) {

    super();

    this.amount = amount;
    this.message = message;
  }

  // TODO: add domain behaviour code

  // TODO: Can we pull out of the properties into it's own configuration?
  @Property()
  amount!: number;

  @Property()
  message: string;

  @Property()
  created: Date  = new Date();
}
