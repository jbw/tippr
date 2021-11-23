import { Tip } from "src/tippr.infrastructure/entities/tip.entity";

import { EntityRepository, MikroORM } from "@mikro-orm/core";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { ListTipsQuery } from "./list.query";

@QueryHandler(ListTipsQuery)
export class ListTipQueryHandler implements IQueryHandler<ListTipsQuery> {

    private readonly repository: EntityRepository<Tip>;

    constructor(private readonly orm: MikroORM) {
        this.repository = this.orm.em.getRepository(Tip);
    }

    async execute(query: ListTipsQuery) {
        return await this.repository.findAll();
    }
}