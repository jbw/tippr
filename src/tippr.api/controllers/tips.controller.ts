import { Controller, Post, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Permission } from '../../tippr.domain/permissions/permissions.enum';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Authorize } from '../../tippr.infrastructure/identity/authorization/authorize.decorator';
import { Tip } from 'src/tippr.infrastructure/entities/tip.entity';
import { CreateTipCommand } from '../features/create/create.command';
import { ListTipsQuery } from '../features/list/list.query';

@ApiBearerAuth()
@Controller()
export class TipsController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  @Authorize(Permission.TIPS_WRITE)
  async create(): Promise<Tip> {
    const tip = await this.commandBus.execute(new CreateTipCommand(1.0, "test"));
    return tip;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Authorize(Permission.TIPS_READ)
  async list(): Promise<Tip[]> {
    const tips = await this.queryBus.execute(new ListTipsQuery());
    return tips;
  }
}


