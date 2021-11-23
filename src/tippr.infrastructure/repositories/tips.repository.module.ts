import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { Tip } from "../entities/tip.entity";
import { TipRepository } from "./tip.repository";

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Tip] })],

  providers: [TipRepository],
  exports: [TipRepository],
})
export class TipRepositoryModule {}
