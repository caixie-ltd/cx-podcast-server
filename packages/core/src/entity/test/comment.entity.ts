import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { CommentMeta, PostEntity, User } from '..';
import { DeepPartial } from '../../common/shared-types';
import { BaseEntity } from '../base.entity';

@Entity('comments')
export class Comment extends BaseEntity {
  constructor(input?: DeepPartial<Comment>) {
    super(input);
  }

  @Column({
    type: 'varchar',
    length: 20,
    default: 'approved',
    comment: '内容状态',
  })
  approved: string;

  @Column('text', {
    comment: '留言内容',
  })
  content: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: 'IP 地址',
  })
  ip: string;

  @Column({
    type: 'int',
  })
  commentCount: number;

  @Column({
    comment: '父级内容',
    unsigned: true,
    type: 'int',
    default: 0,
  })
  parent: number;

  // @OneToMany(type => CommentMeta, commentMeta => commentMeta.comment, {
  //   cascade: true,
  // })
  // metas?: CommentMeta[];

  @OneToMany(type => Comment, comment => comment.relay)
  reference?: Comment;

  @ManyToOne(type => Comment, comment => comment.reference)
  relay?: Comment;

  @ManyToOne(type => PostEntity, post => post.comments, {})
  post: PostEntity;

  @ManyToOne(type => User, user => user.comments, {
    onDelete: 'CASCADE',
  })
  author: User;
}
