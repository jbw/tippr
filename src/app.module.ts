import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigModule } from './tippr.infrastructure/data/database.module';
import { TipsController } from './tippr.api/controllers/tips.controller';
import { LoggerModule } from './tippr.infrastructure/logger/logger.module';
import { MikroModule } from './tippr.infrastructure/data/mikro-orm/mikro-orm.module';
import { CqrsModule } from "@nestjs/cqrs";
import { CreateTipHandler } from './tippr.api/features/create/create.handler';
import { ListTipQueryHandler } from './tippr.api/features/list/list.handler';
import { IdentityConfigModule } from './tippr.infrastructure/identity/identity.module';

export const Handlers = [CreateTipHandler, ListTipQueryHandler];

@Module({
  imports: [
    CqrsModule,
    LoggerModule,
    ConfigModule,
    DatabaseConfigModule,
    MikroModule,
    IdentityConfigModule
  ],
  controllers: [TipsController],
  providers: [
    ...Handlers
  ],
})
export class AppModule { }
