import { Options } from "@mikro-orm/core";
import { Logger } from "@nestjs/common";

import Reaction from "../../../domain/aggregates/reaction.entity";
import Tip from "../../../domain/aggregates/tip.aggregate";
import { DatabaseConfigService } from "../database.config.service";

const logger = new Logger("MikroORM");

export const getMikroOrmOptions = (config: DatabaseConfigService): Options =>
({
  entities: [Tip, Reaction],
  host: config.getDatabaseHost(),
  dbName: config.getDatabaseName(),
  user: config.getDatabaseUser(),
  password: config.getDatabasePassword(),
  port: config.getDatabasePort(),
  type: "postgresql",
  debug: process.env.NODE_ENV === "development",
  logger: logger.log.bind(logger),
  forceUtcTimezone: true,
  strict: true,

} as Options);
