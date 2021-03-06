import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";

import { TipsController } from "./api/controllers/tips.controller";
import { ReactionAddedHandler } from "./application/domain-event-handlers/reaction-added.handler";
import { TipTotalsHandler } from "./application/domain-event-handlers/tip-totals.handler";
import { AddReactionHandler } from "./application/features/add-reaction/add-reaction.handler";
import { CreateTipHandler } from "./application/features/create/create.handler";
import { GetByIdQueryHandler } from "./application/features/getById/getById.handler";
import { ListTipQueryHandler } from "./application/features/list/list.handler";
import { DatabaseConfigModule } from "./infrastructure/data/database.module";
import { MikroModule } from "./infrastructure/data/mikro-orm/mikro-orm.module";
import { IdentityConfigModule } from "./infrastructure/identity/identity.module";
import { LoggerModule } from "./infrastructure/logger/logger.module";
import { TipRepository } from "./infrastructure/repositories/tip.repository";
import { TipRepositoryModule } from "./infrastructure/repositories/tips.repository.module";

const CommandHandlers = [CreateTipHandler, AddReactionHandler];
const QueryHandlers = [ListTipQueryHandler, GetByIdQueryHandler];
const EventHandlers = [TipTotalsHandler, ReactionAddedHandler];

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
  providers: [
    TipRepository,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
})
export class AppModule {}
