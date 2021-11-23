import { ITipRepository } from "src/tippr.domain/repositories/tip.repository";

import { MikroORM } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";

import { Tip } from "../entities/tip.entity";

@Injectable()
export class TipRepository implements ITipRepository {
  private readonly repository: EntityRepository<Tip>;

  constructor(private readonly orm: MikroORM) {
    this.repository = this.orm.em.getRepository(Tip);
  }

  async getAll(): Promise<Tip[]> {
    return await this.repository.findAll();
  }

  async addAndSave(tip: Tip){
    await this.repository.persistAndFlush(tip);

  }
}
