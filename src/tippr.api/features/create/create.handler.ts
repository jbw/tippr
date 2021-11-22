import { EntityRepository, MikroORM } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import { Tip } from "src/tippr.infrastructure/entities/tip.entity";
import { CreateTipCommand } from "./create.command";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

@CommandHandler(CreateTipCommand)
export class CreateTipHandler implements ICommandHandler<CreateTipCommand> {

    private readonly repository: EntityRepository<Tip>;

    constructor(private readonly orm: MikroORM) {
        this.repository = this.orm.em.getRepository(Tip);
    }

    async execute(command: CreateTipCommand) {

        var tip = new Tip();
        tip.amount = command.amount;
        tip.message = command.message;

        await this.repository.persistAndFlush(tip);

        return tip;
    }
}