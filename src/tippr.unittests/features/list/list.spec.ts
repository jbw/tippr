import { It, Mock, Times } from "moq.ts";

import { Test, TestingModule } from "@nestjs/testing";

import { ListTipQueryHandler } from "../../../tippr.api/features/list/list.handler";
import { ListTipsQuery } from "../../../tippr.api/features/list/list.query";
import { Tip } from "../../../tippr.infrastructure/entities/tip.entity";
import { TipRepository } from "../../../tippr.infrastructure/repositories/tip.repository";

describe('Tip List', () => {

  it('should list tips', async() => {

    // given
    const tips: Tip[] = [ It.IsAny<Tip>()];

    const query = new ListTipsQuery();

    const mockTipRepository = new Mock<TipRepository>()
      .setup(instance => instance.getAll())
      .returns(Promise.resolve(tips));

    const handler = new ListTipQueryHandler(mockTipRepository.object());

    // when
    const fetchedTips = await handler.execute(query);

    // then
    expect(fetchedTips).toBe(tips);


  });

});
