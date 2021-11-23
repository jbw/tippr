import { DatabaseConfig } from "src/tippr.domain/database.interface";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DatabaseConfigService implements DatabaseConfig {

  constructor(private configService: ConfigService) { }

  getDatabaseHost(): string {
    return this.configService.get<string>('DB_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DB_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DB_USERNAME');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DB_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DB_NAME');
  }
}
