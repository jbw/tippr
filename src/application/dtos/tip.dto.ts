import Tip from "../../domain/aggregates/tip.aggregate";

export class TipDto {
  static async FromTip(tip: Tip): Promise<TipDto> {
    const tipDto = new TipDto();

    tipDto.id = tip.id;
    tipDto.amount = tip.amount;
    tipDto.message = tip.message;
    tipDto.reactionCount = await tip.reactions.loadCount();

    return tipDto;
  }

  id: string;
  amount: number;
  message: string;
  reactionCount: number;
}
