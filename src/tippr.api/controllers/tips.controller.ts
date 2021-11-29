import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiBody } from "@nestjs/swagger";

import Tip from "../../tippr.domain/aggregates/tip.aggregate";
import { Permission } from "../../tippr.domain/permissions/permissions.enum";
import { Authorize } from "../../tippr.infrastructure/identity/authorization/authorize.decorator";
import { CreateTipCommand } from "../features/create/create.command";
import { TipDto } from "../features/create/tip.dto";
import { ListTipsQuery } from "../features/list/list.query";
import { CreateTipDto } from "./create-tip.dto";

@ApiBearerAuth()
@Controller({
  path: 'api/tips',
})
export class TipsController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @Authorize(Permission.TIPS_WRITE)
  @ApiBody({ type: CreateTipDto })
  async create(@Body() createTipDto: CreateTipDto): Promise<TipDto> {
    const tip = await this.commandBus.execute(
      new CreateTipCommand(createTipDto.amount, createTipDto.message),
    );
    return tip;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Authorize(Permission.TIPS_READ)
  async list(): Promise<TipDto[]>{
    const tips = await this.queryBus.execute(new ListTipsQuery());
    return tips;
  }
}
