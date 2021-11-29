import Tip from "../aggregates/tip.aggregate";

export interface ITipRepository  {
  getAll(): Promise<Tip[]>;
  addAndSave(tip: Tip);
}
