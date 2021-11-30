import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { TipRepository } from "../../../infrastructure/repositories/tip.repository";
import { TipDto } from "../../dtos/tip.dto";
import { ListTipsQuery } from "./list.query";

@QueryHandler(ListTipsQuery)
export class ListTipQueryHandler implements IQueryHandler<ListTipsQuery> {
  constructor(private readonly tipRepository: TipRepository) {}

  async execute(query: ListTipsQuery): Promise<TipDto[]> {
    var tips = await this.tipRepository.getAll();

    var tipDtos =  Promise.all(tips.map(async (tip) => TipDto.FromTip(tip)));
    return  tipDtos;
  }
}
