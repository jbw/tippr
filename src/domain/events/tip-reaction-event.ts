import { v4 as uuid } from "uuid";

import { Logger } from "@nestjs/common";
import { IEvent } from "@nestjs/cqrs";

import { REACTION } from "../aggregates/reaction.enum";
import { IDomainEvent } from "./domain-event";

export class ReactionAddedEvent implements IEvent {
  public readonly aggregateRoodId: uuid;
  public readonly created: Date;

  // constructor(tipId: uuid, reaction: REACTION) {
  //   this.aggregateRoodId = tipId;

  //   Logger.log(`TipReactionEvent was called ${reaction}`);
  // }
}
