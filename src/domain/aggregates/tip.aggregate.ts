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

    // add domain event
    this.apply(new TipCreatedEvent(uuid(), amount, message));
  }

  async addReaction(reaction: REACTION) {
    //this.reactions.init();
    this.reactions.add(new Reaction(reaction));
    //this.apply(new ReactionAddedEvent());
  }

  @PrimaryKey()
  id: string = uuid();

  @Property()
  userid: string;

  // TODO: Can we pull out of the properties into it's own configuration?
  @Property()
  amount!: number;

  @Property()
  message: string;

  @Property()
  created: Date = new Date();

  @OneToMany(() => Reaction, (reaction) => reaction.tip)
  reactions = new Collection<Reaction>(this);
}
