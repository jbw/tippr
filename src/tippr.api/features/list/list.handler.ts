import { TipRepository } from "src/tippr.infrastructure/repositories/tip.repository";

import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { ListTipsQuery } from "./list.query";

@QueryHandler(ListTipsQuery)
export class ListTipQueryHandler implements IQueryHandler<ListTipsQuery> {
  constructor(private readonly tipRepository: TipRepository) {}

  async execute(query: ListTipsQuery) {
    return await this.tipRepository.getAll();
  }
}
