import { It, Mock, Times } from "moq.ts";

import { Test, TestingModule } from "@nestjs/testing";

import { ListTipQueryHandler } from "../../../application/features/list/list.handler";
import { ListTipsQuery } from "../../../application/features/list/list.query";
import Tip from "../../../domain/aggregates/tip.aggregate";
import { TipRepository } from "../../../infrastructure/repositories/tip.repository";

describe('Tip List', () => {
  it('should list tips', async () => {
    // given
    const tips: Tip[] = [new Tip(1, 'message')];

    const query = new ListTipsQuery();

    const mockTipRepository = new Mock<TipRepository>()
      .setup((instance) => instance.getAll())
      .returns(Promise.resolve(tips));

    const handler = new ListTipQueryHandler(mockTipRepository.object());

    // when
    const fetchedTips = await handler.execute(query);

    // then
    expect(fetchedTips[0].amount).toBe(1);
    expect(fetchedTips[0].message).toBe("message");

  });
});
