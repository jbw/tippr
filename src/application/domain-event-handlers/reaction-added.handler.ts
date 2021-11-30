import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { ReactionAddedEvent } from "../../domain/events/tip-reaction-event";
import { TipRepository } from "../../infrastructure/repositories/tip.repository";

@EventsHandler(ReactionAddedEvent)
export class ReactionAddedHandler implements IEventHandler<ReactionAddedEvent> {
  constructor(private repository: TipRepository) { }

  handle(event: ReactionAddedEvent) {
    Logger.log('ReactionAddedHandler was called');
  }
}
