import { REACTION } from "src/domain/aggregates/reaction.enum";

import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";

import Tip from "../../../domain/aggregates/tip.aggregate";
import { TipRepository } from "../../../infrastructure/repositories/tip.repository";
import { TipDto } from "../../dtos/tip.dto";
import { CreateTipCommand } from "./create.command";

@CommandHandler(CreateTipCommand)
export class CreateTipHandler implements ICommandHandler<CreateTipCommand> {
  constructor(
    private readonly repository: TipRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: CreateTipCommand): Promise<TipDto> {
    const { fromUserId, toUserId, amount, message } = command;

    const tip = new Tip();
    tip.create(fromUserId, toUserId, amount, message);

    const tipContext = this.publisher.mergeObjectContext(tip);

    await this.repository.persist(tipContext);

    // we have peristed our tip so we can dispatch the events
    tipContext.commit();

    return TipDto.FromTip(tipContext);
  }
}
