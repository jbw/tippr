import { Options } from "@mikro-orm/core";
import { Logger } from "@nestjs/common";

import Tip from "../../../tippr.domain/aggregates/tip.aggregate";
import { DatabaseConfigService } from "../database.config.service";

const logger = new Logger("MikroORM");

export const getMikroOrmOptions = (config: DatabaseConfigService): Options =>
({
  entities: [Tip],
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
  discovery: {
    tsConfigPath: "../tsconfig.json",
  },
  migrations: {
    tableName: "migrations",
    path: "./migrations",
    transactional: true,
    allOrNothing: true,
    emit: 'ts',
    dropTables: true,
    safe: false,
  },
} as Options);
