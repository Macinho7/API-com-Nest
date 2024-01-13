import { PessoasEntity } from '../pessoas/pessoa.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'avaliacao' })
export class AvaliacaoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'avaliador', nullable: false })
  avaliador: string;

  @Column({ name: 'avaliacao', nullable: false })
  avaliacao: string;

  @Column({ name: 'opniao', nullable: false })
  opniao: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @ManyToOne(() => PessoasEntity, (avaliacao) => avaliacao.avaliacao, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  pessoa: PessoasEntity;
}
