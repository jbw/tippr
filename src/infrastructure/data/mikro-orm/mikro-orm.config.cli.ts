import { Options } from "@mikro-orm/core";
import { Logger } from "@nestjs/common";

import Reaction from "../../../domain/aggregates/reaction.entity";
import Tip from "../../../domain/aggregates/tip.aggregate";

const logger = new Logger('MikroORM');

const options:  Options  = {
  entities: [Tip, Reaction],
  host: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  type: 'postgresql',
  debug: process.env.NODE_ENV === 'development',
  logger: logger.log.bind(logger),
  forceUtcTimezone: true,
  strict: true,
  discovery: {
    tsConfigPath: '../tsconfig.json',
  },
  migrations: {
    tableName: 'migrations',
    path: './migrations',
    transactional: true,
    allOrNothing: true,
    emit: 'ts',
    dropTables: true,

    safe: false,
  },
} as Options;

export default options;
