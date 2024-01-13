import { Module, forwardRef } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { produtosPedidoEntity } from './produto.entity';
import { CompraEntity } from 'src/compras/compra.entity';
import { ComprasModule } from 'src/compras/compras.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([produtosPedidoEntity, CompraEntity]),
    forwardRef(() => ComprasModule),
  ],
  controllers: [ProdutosController],
  providers: [ProdutosService],
  exports: [ProdutosService],
})
export class ProdutosModule {}
