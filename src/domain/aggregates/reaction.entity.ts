import { Property } from "mikro-orm";
import { v4 as uuid } from "uuid";

import { Entity, ManyToOne, PrimaryKey } from "@mikro-orm/core";

import { REACTION } from "./reaction.enum";
import Tip from "./tip.aggregate";

@Entity()
export default class Reaction {
  constructor(fromUserId: string, value: REACTION) {
    this.fromUserId = fromUserId;
    this.value = value;
  }

  @Property()
  fromUserId!: string;

  @Property()
  createdAt: Date = new Date();

  @PrimaryKey()
  id: string = uuid();

  @ManyToOne({ entity: () => Tip })
  tip!: Tip;

  @Property()
  value!: string;
}
