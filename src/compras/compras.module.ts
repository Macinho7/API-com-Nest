import { Module, forwardRef } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { ComprasController } from './compras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompraEntity } from './compra.entity';
import { produtosPedidoEntity } from 'src/produtos/produto.entity';
import { ProdutosModule } from 'src/produtos/produtos.module';
import { PessoasEntity } from 'src/pessoas/pessoa.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompraEntity,
      produtosPedidoEntity,
      PessoasEntity,
    ]),
    forwardRef(() => ProdutosModule),
    forwardRef(() => ComprasModule),
  ],
  controllers: [ComprasController],
  providers: [ComprasService],
  exports: [ComprasService],
})
export class ComprasModule {}
