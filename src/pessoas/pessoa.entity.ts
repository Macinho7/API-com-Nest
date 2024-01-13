import { Exclude } from 'class-transformer';
import { AvaliacaoEntity } from '../avaliacao/avaliacao.entity';
import { CompraEntity } from '../compras/compra.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'pessoas' })
export class PessoasEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 80, nullable: false })
  nome: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'cidade', length: 80, nullable: false })
  cidade: string;

  @Column({ name: 'nacimento', nullable: false })
  nascimento: string;
  @Exclude()
  @Column({ name: 'senha', nullable: false })
  senha: string;

  @Column({ name: 'idade', nullable: false })
  idade: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @ManyToOne(() => CompraEntity, (compra) => compra.pessoa, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  compras: CompraEntity;

  @OneToMany(() => AvaliacaoEntity, (pessoa) => pessoa.pessoa, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  avaliacao: AvaliacaoEntity;
}
