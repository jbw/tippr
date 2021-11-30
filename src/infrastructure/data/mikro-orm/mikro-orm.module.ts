import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { DatabaseConfigService } from "../database.config.service";
import { DatabaseConfigModule } from "../database.module";
import { getMikroOrmOptions } from "./mikro-orm.config";

@Module({
    imports: [
        MikroOrmModule.forRootAsync({
            imports: [DatabaseConfigModule],
            inject: [DatabaseConfigService],
            useFactory: getMikroOrmOptions,
        }),
    ],
  })
  export class MikroModule {}
