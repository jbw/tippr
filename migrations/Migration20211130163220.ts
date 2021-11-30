import { Migration } from '@mikro-orm/migrations';

export class Migration20211130163220 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tip" ("id" varchar(255) not null, "userid" varchar(255) not null, "amount" int4 not null, "message" varchar(255) not null, "created" timestamptz(0) not null);');
    this.addSql('alter table "tip" add constraint "tip_pkey" primary key ("id");');

    this.addSql('create table "reaction" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "tip_id" varchar(255) not null, "value" varchar(255) not null);');
    this.addSql('alter table "reaction" add constraint "reaction_pkey" primary key ("id");');

    this.addSql('alter table "reaction" add constraint "reaction_tip_id_foreign" foreign key ("tip_id") references "tip" ("id") on update cascade;');
  }

}
