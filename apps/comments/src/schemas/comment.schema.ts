import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class CommentSchema {
  @ObjectIdColumn()
  _id: string;

  @Column()
  product_id: string;

  @Column()
  text: string;

  @Column()
  rating: number;

  @Column()
  author?: string;

  @Column({ default: new Date() })
  date: Date;
}
