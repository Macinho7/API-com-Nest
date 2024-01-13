import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { criaProdutoDTO } from './dto/criaProdutoDTO';
import { atualizaProdutoDTo } from './dto/atualizarprodutoDTO';
//import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('/produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post(':id')
  async criaProduto(@Param('id') id: string, @Body() dados: criaProdutoDTO) {
    const criado = await this.produtosService.criaProduto(id, dados);

    return {
      messagem: 'produto criado com sucesso',
      Produto: criado,
    };
  }
  @Get()
  async listarProdutos() {
    const achar = await this.produtosService.listarProdutos();

    return {
      Produtos: achar,
    };
  }
  @Get(':id')
  async listarProduto(@Param('id') id: string) {
    const achar = await this.produtosService.listarProduto(id);

    return {
      Produto: achar,
    };
  }
  @Patch(':id')
  async atualizarProduto(
    @Param('id') id: string,
    @Body() dados: atualizaProdutoDTo,
  ) {
    const atualizar = await this.produtosService.atualizarProduto(id, dados);

    return {
      Mensagem: `produto do id: ${atualizar.id} atualizado`,
      Produto: atualizar,
    };
  }
  @Delete(':id')
  async deleteProduto(@Param('id') id: string) {
    const achar = await this.produtosService.deletarProduto(id);

    return {
      Delete: achar,
    };
  }
}
