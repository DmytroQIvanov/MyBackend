import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User {
  // @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  // @Field()
  @Column({ length: 500, nullable: false })
  username: string;
  // @Field()

  @Column('text', { nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, default: 15 })
  maxGB: number;

  @Column({ nullable: false, default: 0 })
  takenGB: number;

  @Column('text', { nullable: false })
  password: string;
  // @Field()
  // @Column('varchar', { length: 15 })
  // phone: string;
  // @Field()
  // @Column('text')
  // address: string;
  // @Field((type) => [InvoiceModel], { nullable: true })
  // @OneToMany((type) => InvoiceModel, (invoice) => invoice.customer)
  // invoices: InvoiceModel[];
  // @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;
  // @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
