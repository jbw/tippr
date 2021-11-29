import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";

import Tip from "../../../tippr.domain/aggregates/tip.aggregate";
import { TipRepository } from "../../../tippr.infrastructure/repositories/tip.repository";
import { CreateTipCommand } from "./create.command";
import { TipDto } from "./tip.dto";

@CommandHandler(CreateTipCommand)
export class CreateTipHandler implements ICommandHandler<CreateTipCommand> {
  constructor(
    private readonly repository: TipRepository,private publisher: EventPublisher
  ) {}

  async execute(command: CreateTipCommand): Promise<TipDto> {
    const { amount, message } = command;

    const tip = this.publisher.mergeObjectContext(
      new Tip(amount, message)
    );

    await this.repository.persist(tip);

    // we have peristed our tip so we can dispatch the events
    tip.commit();

    return TipDto.FromTip(tip);
  }
}
