import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { Tip } from "../../../tippr.infrastructure/entities/tip.entity";
import { TipRepository } from "../../../tippr.infrastructure/repositories/tip.repository";
import { CreateTipCommand } from "./create.command";

@CommandHandler(CreateTipCommand)
export class CreateTipHandler implements ICommandHandler<CreateTipCommand> {


    constructor(private readonly tipRepository: TipRepository) {}


    async execute(command: CreateTipCommand) {

        var tip = new Tip();
        tip.amount = command.amount;
        tip.message = command.message;

        await this.tipRepository.addAndSave(tip);

        return tip;
    }
}
