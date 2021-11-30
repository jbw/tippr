import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiBody, ApiParam } from "@nestjs/swagger";

import { TipDto } from "../../application/dtos/tip.dto";
import { CreateTipCommand } from "../../application/features/create/create.command";
import { GetTipByIdQuery } from "../../application/features/getById/getById.query";
import { ListTipsQuery } from "../../application/features/list/list.query";
import Tip from "../../domain/aggregates/tip.aggregate";
import { Permission } from "../../domain/permissions/permissions.enum";
import { Authorize } from "../../infrastructure/identity/authorization/authorize.decorator";
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
  async list(): Promise<TipDto[]> {
    const tips = await this.queryBus.execute(new ListTipsQuery());
    return tips;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Authorize(Permission.TIPS_READ)
  @ApiParam({ name: 'id', required: true})
  async getById(@Param() params): Promise<TipDto> {
    const tips = await this.queryBus.execute(new GetTipByIdQuery(params.id));
    return tips;
  }
}
