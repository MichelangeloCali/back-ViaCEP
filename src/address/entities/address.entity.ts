import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  postalCode: string;

  @Column()
  street: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;
}
