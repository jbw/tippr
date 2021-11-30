import { REACTION } from "src/domain/aggregates/reaction.enum";
import Tip from "src/domain/aggregates/tip.aggregate";

import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";

import { TipRepository } from "../../../infrastructure/repositories/tip.repository";
import { TipDto } from "../../dtos/tip.dto";
import { AddReactionCommand } from "./add-reaction.command";

@CommandHandler(AddReactionCommand)
export class AddReactionHandler implements ICommandHandler<AddReactionCommand> {
  constructor(
    private readonly repository: TipRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: AddReactionCommand): Promise<TipDto> {
    const { id, reaction } = command;

    const tip = this.publisher.mergeObjectContext(
      await this.repository.getById(id),
    );

    tip.addReaction(REACTION.PARTY);

    await this.repository.persist(tip);

    // we have peristed our tip so we can dispatch the events
    tip.commit();

    return TipDto.FromTip(tip);
  }
}
