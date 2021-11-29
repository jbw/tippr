import tipAggregate from "src/tippr.domain/aggregates/tip.aggregate";

import Tip from "../../../tippr.domain/aggregates/tip.aggregate";

export class TipDto {
  static FromTip(tip: Tip): TipDto {
    const tipDto = new TipDto();

    tipDto.id = tip.id;
    tipDto.amount = tip.amount;
    tipDto.message = tip.message;

    return tipDto;
  }

  id: string;
  amount: number;
  message: string;
}
