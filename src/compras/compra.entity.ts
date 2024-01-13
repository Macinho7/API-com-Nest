import { PessoasEntity } from '../pessoas/pessoa.entity';
import { produtosPedidoEntity } from '../produtos/produto.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'compras' })
export class CompraEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'compra', nullable: false })
  compra: string;

  @Column({
    name: 'valorTotal',
    precision: 10,
    type: 'decimal',
    scale: 2,
    nullable: false,
  })
  valorTotal: number;

  @Column({
    name: 'taxa',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  taxa: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToMany(() => produtosPedidoEntity, (produtos) => produtos.compra, {
    eager: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  produtos: produtosPedidoEntity[];
  @OneToMany(() => PessoasEntity, (pessoas) => pessoas.compras, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  pessoa: PessoasEntity;
}
