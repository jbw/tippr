import { MikroORM } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";

import Tip from "../../domain/aggregates/tip.aggregate";
import { IRepository } from "../../domain/seedWork/repository.interface";

@Injectable()
export class TipRepository implements IRepository<Tip> {
  private readonly repository: EntityRepository<Tip>;

  constructor(private readonly orm: MikroORM) {
    this.repository = this.orm.em.getRepository(Tip);
  }
  async getById(rootId: string): Promise<Tip> {
    return await this.repository.findOne({ id: rootId });
  }

  async getAll(): Promise<Tip[]> {
    return await this.repository.findAll();
  }

  async persist(tip: Tip) {
    await this.repository.persistAndFlush(tip);
  }

  async update() {
    await this.repository.flush();
  }
}
