import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { TipRepository } from "../../../infrastructure/repositories/tip.repository";
import { TipDto } from "../../dtos/tip.dto";
import { GetTipByIdQuery } from "./getById.query";

@QueryHandler(GetTipByIdQuery)
export class GetByIdQueryHandler implements IQueryHandler<GetTipByIdQuery> {
  constructor(private readonly tipRepository: TipRepository) {}

  async execute(query: GetTipByIdQuery): Promise<TipDto> {
    const { id } = query;
    var tip = await this.tipRepository.getById(id);
    return TipDto.FromTip(tip);
  }
}
