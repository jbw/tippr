import { v4 as uuid } from 'uuid';
import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Tip  {

  @PrimaryKey()
  id: string = uuid();

  @Property()
  amount!: number;

  @Property()
  message: string;

  @Property()
  created: Date  = new Date();
}