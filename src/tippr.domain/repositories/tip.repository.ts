import { Tip } from "../../tippr.infrastructure/entities/tip.entity";

export interface ITipRepository  {
  getAll(): Promise<Tip[]>;
  addAndSave(tip: Tip);
}
