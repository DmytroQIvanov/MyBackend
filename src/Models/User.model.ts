import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class CustomerModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 500, nullable: false })
  name: string;
  @Column('text', { nullable: false })
  email: string;
  // @Field()
  // @Column('varchar', { length: 15 })
  // phone: string;
  // @Field()
  // @Column('text')
  // address: string;
  // @Field((type) => [InvoiceModel], { nullable: true })
  // @OneToMany((type) => InvoiceModel, (invoice) => invoice.customer)
  // invoices: InvoiceModel[];
  @Column()
  @CreateDateColumn()
  created_at: Date;
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
