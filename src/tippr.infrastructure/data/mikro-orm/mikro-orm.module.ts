import { Module } from "@nestjs/common";
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { getMikroOrmOptions } from "./mikro-orm.config";
import { DatabaseConfigModule } from "../database.module";
import { DatabaseConfigService } from "../database.config.service";

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