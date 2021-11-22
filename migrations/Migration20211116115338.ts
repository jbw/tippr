import { Migration } from '@mikro-orm/migrations';

export class Migration20211116115338 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tip" ("id" varchar(255) not null, "amount" int4 not null, "message" varchar(255) not null, "created" jsonb not null);');
    this.addSql('alter table "tip" add constraint "tip_pkey" primary key ("id");');
  }

}
