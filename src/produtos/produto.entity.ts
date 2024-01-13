/* eslint-disable prettier/prettier */
import { CompraEntity } from '../compras/compra.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'produtos' })
export class produtosPedidoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'categoria', nullable: false})
    categoria: string

  @Column({ name: 'preco', nullable: false})
    preco: number

  @Column({ name: 'tipo', nullable: false})
    tipo: string

  @Column({ name: 'encomendado', nullable: false})
    encomendado: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @ManyToOne(() => CompraEntity, (compras) => compras.produtos, { cascade: true,  orphanedRowAction: 'delete', onDelete: 'CASCADE', onUpdate: 'CASCADE'})

  compra: CompraEntity

}

