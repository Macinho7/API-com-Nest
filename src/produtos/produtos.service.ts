import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { produtosPedidoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { CompraEntity } from 'src/compras/compra.entity';
import { criaProdutoDTO } from './dto/criaProdutoDTO';
import { ListaProdutoDTO } from './dto/listarProdutoDTO';
import { atualizaProdutoDTo } from './dto/atualizarprodutoDTO';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(produtosPedidoEntity)
    private readonly produtoRepository: Repository<produtosPedidoEntity>,
    @InjectRepository(CompraEntity)
    private readonly compraRepository: Repository<CompraEntity>,
  ) {}

  private async acharCompra(id: string) {
    const achado = await this.compraRepository.findOneBy({ id });
    if (achado === null) {
      throw new NotFoundException('compra nao achada');
    }
    return achado;
  }
  private async verificarId(id: string) {
    const compra = await this.compraRepository.findOneBy({ id });
    if (compra === null) {
      throw new NotFoundException('tabela compra nao achada');
    }
    return compra;
  }
  async criaProduto(id: string, dados: criaProdutoDTO) {
    const compraId = await this.verificarId(id);

    const produtoEntity = new produtosPedidoEntity();
    produtoEntity.id = dados.id;
    produtoEntity.categoria = dados.categoria;
    produtoEntity.preco = dados.preco;
    produtoEntity.tipo = dados.tipo;
    produtoEntity.encomendado = dados.encomendado;
    produtoEntity.compra = compraId;
    compraId.valorTotal = produtoEntity.preco;
    const taxa = 0.02;
    const taxado = compraId.valorTotal * taxa;
    compraId.valorTotal = compraId.valorTotal + taxado;
    compraId.taxa = taxa;

    const trs = await this.produtoRepository.save(produtoEntity);
    return trs;
  }

  async listarProdutos() {
    const achar = await this.produtoRepository.find();

    const filtrado = achar.map(
      (filtrar) =>
        new ListaProdutoDTO(
          filtrar.id,
          filtrar.categoria,
          filtrar.preco,
          filtrar.tipo,
          filtrar.encomendado,
        ),
    );
    return filtrado;
  }

  async listarProduto(id: string) {
    const achado = await this.produtoRepository.findOneBy({ id });
    if (achado === null) {
      throw new NotFoundException('Id produto nao achado');
    }

    return achado;
  }
  async atualizarProduto(id: string, dados: atualizaProdutoDTo) {
    const achar = await this.produtoRepository.findOneBy({ id });
    if (achar === null) {
      throw new NotFoundException('Id produto nao achado');
    }
    achar.categoria = dados.categoria;
    achar.encomendado = dados.encomendado;

    return await this.produtoRepository.save(achar);
  }
  async deletarProduto(id: string) {
    return await this.produtoRepository.delete({ id });
  }
}
