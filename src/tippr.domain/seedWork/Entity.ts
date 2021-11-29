import { v4 as uuid } from "uuid";

import { Entity as MikroEntity, PrimaryKey } from "@mikro-orm/core";

@MikroEntity()
export abstract class Entity {

  @PrimaryKey()
  id: string = uuid();

}
