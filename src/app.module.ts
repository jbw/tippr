import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";

import { TipsController } from "./tippr.api/controllers/tips.controller";
import { CreateTipHandler } from "./tippr.api/features/create/create.handler";
import { GetByIdQueryHandler } from "./tippr.api/features/getById/getById.handler";
import { ListTipQueryHandler } from "./tippr.api/features/list/list.handler";
import { TipTotalsQueryHandler } from "./tippr.api/features/tip-totals/tip-totals.handler";
import { DatabaseConfigModule } from "./tippr.infrastructure/data/database.module";
import { MikroModule } from "./tippr.infrastructure/data/mikro-orm/mikro-orm.module";
import { IdentityConfigModule } from "./tippr.infrastructure/identity/identity.module";
import { LoggerModule } from "./tippr.infrastructure/logger/logger.module";
import { TipRepository } from "./tippr.infrastructure/repositories/tip.repository";
import { TipRepositoryModule } from "./tippr.infrastructure/repositories/tips.repository.module";

export const Handlers = [
  CreateTipHandler,
  ListTipQueryHandler,
  TipTotalsQueryHandler,
  GetByIdQueryHandler,
];

@Module({
  imports: [
    CqrsModule,
    LoggerModule,
    ConfigModule,
    DatabaseConfigModule,
    MikroModule,
    IdentityConfigModule,
    TipRepositoryModule,
  ],
  controllers: [TipsController],
  providers: [TipRepository, ...Handlers],
})
export class AppModule {}
