import { NotFoundException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { TipRepository } from '../../../infrastructure/repositories/tip.repository';
import { TipDto } from '../../dtos/tip.dto';
import { AddReactionCommand } from './add-reaction.command';

@CommandHandler(AddReactionCommand)
export class AddReactionHandler implements ICommandHandler<AddReactionCommand> {
  constructor(
    private readonly repository: TipRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: AddReactionCommand): Promise<TipDto> {
    const { id, fromUserId, reaction } = command;

    const fetchedTip = await this.repository.getById(id);
    if (!fetchedTip) {
      throw new NotFoundException('Tip not found');
    }

    const tip = this.publisher.mergeObjectContext(fetchedTip);

    tip.addReaction(fromUserId, reaction);

    await this.repository.update();

    tip.commit();

    return TipDto.FromTip(tip);
  }
}
