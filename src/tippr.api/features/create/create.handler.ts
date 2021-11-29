import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import Tip from "../../../tippr.domain/aggregates/tip.aggregate";
import { TipRepository } from "../../../tippr.infrastructure/repositories/tip.repository";
import { CreateTipCommand } from "./create.command";
import { TipDto } from "./tip.dto";

@CommandHandler(CreateTipCommand)
export class CreateTipHandler implements ICommandHandler<CreateTipCommand> {


    constructor(private readonly tipRepository: TipRepository) {}


    async execute(command: CreateTipCommand): Promise<TipDto> {

        var tip = new Tip(command.amount, command.message);

        await this.tipRepository.addAndSave(tip);

        return TipDto.FromTip(tip);
    }
}
