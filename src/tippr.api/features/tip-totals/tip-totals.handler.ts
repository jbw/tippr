import { TipCreatedEvent } from "src/tippr.domain/events/tip-created-event";
import { TipRepository } from "src/tippr.infrastructure/repositories/tip.repository";

import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

@EventsHandler(TipCreatedEvent)
export class TipTotalsQueryHandler implements IEventHandler<TipCreatedEvent> {
  constructor(private repository: TipRepository ) {}

  handle(event: TipCreatedEvent) {

    Logger.log("TipCreatedEventHandler was called");
  }
}
