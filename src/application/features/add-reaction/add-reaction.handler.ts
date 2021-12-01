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
    const { id, fromUserId, reaction } = command;

    const tip = this.publisher.mergeObjectContext(
      await this.repository.getById(id),
    );

    tip.addReaction(fromUserId, reaction);

    await this.repository.update();

    tip.commit();

    return TipDto.FromTip(tip);
  }
}
