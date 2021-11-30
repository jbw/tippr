import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";

import Tip from "../../../domain/aggregates/tip.aggregate";
import { TipRepository } from "../../../infrastructure/repositories/tip.repository";
import { TipDto } from "../../dtos/tip.dto";
import { CreateTipCommand } from "./create.command";

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
