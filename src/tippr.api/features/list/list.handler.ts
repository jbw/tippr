import { TipsController } from "src/tippr.api/controllers/tips.controller";

import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { TipRepository } from "../../../tippr.infrastructure/repositories/tip.repository";
import { TipDto } from "../create/tip.dto";
import { ListTipsQuery } from "./list.query";

@QueryHandler(ListTipsQuery)
export class ListTipQueryHandler implements IQueryHandler<ListTipsQuery> {
  constructor(private readonly tipRepository: TipRepository) {}

  async execute(query: ListTipsQuery): Promise<TipDto[]> {
    var tips = await this.tipRepository.getAll();

    var tipDtos: TipDto[] = tips.map(tip =>  TipDto.FromTip(tip));
    return tipDtos;

  }
}
