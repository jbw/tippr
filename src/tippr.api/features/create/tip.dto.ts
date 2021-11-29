import tipAggregate from "src/tippr.domain/aggregates/tip.aggregate";

import Tip from "../../../tippr.domain/aggregates/tip.aggregate";

export class TipDto {
  static FromTip(tip: Tip): TipDto {

    const tipDto = new TipDto();

    tipDto.amount = tip.amount;
    tipDto.message = tip.message;

    return tipDto;

  }
  amount: number;
  message: string;
}
