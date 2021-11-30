import { v4 as uuid } from "uuid";

import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property
} from "@mikro-orm/core";
import { AggregateRoot } from "@nestjs/cqrs";

import { TipCreatedEvent } from "../events/tip-created-event";
import { ReactionAddedEvent } from "../events/tip-reaction-event";
import Reaction from "./reaction.entity";
import { REACTION } from "./reaction.enum";

@Entity()
export default class Tip extends AggregateRoot {
  constructor(userid: string, amount: number, message: string) {
    super();

    this.userid = userid;
    this.amount = amount;
    this.message = message;

    this.apply(new TipCreatedEvent(uuid(), amount, message));
  }

  async addReaction(reaction: REACTION) {
    this.reactions.add(new Reaction(reaction));

    this.apply(new ReactionAddedEvent(this.id, reaction));
  }

  @PrimaryKey()
  id: string = uuid();

  @Property()
  userid: string;

  @Property()
  amount!: number;

  @Property()
  message: string;

  @Property()
  created: Date = new Date();

  @OneToMany(() => Reaction, (reaction) => reaction.tip)
  reactions = new Collection<Reaction>(this);
}
