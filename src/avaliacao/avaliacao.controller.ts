import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { criaAvaliacaoDTO } from './dto/criaAvaliacaoDTO';
import { atualizaProdutoDTo } from 'src/produtos/dto/atualizarprodutoDTO';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AutenticaGuard } from 'src/autenticacao/autentica/autentica.guard';

@Controller('/avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @UseGuards(AutenticaGuard)
  @Post(':id')
  @UseInterceptors(CacheInterceptor)
  async criaAvaliacao(
    @Param('id') id: string,
    @Body() dados: criaAvaliacaoDTO,
  ) {
    const criado = await this.avaliacaoService.criaAvaliacao(id, dados);

    return {
      Mensagem: 'sua avaliacao foi compartilhada',
      Avaliacao: criado,
    };
  }
  @UseGuards(AutenticaGuard)
  @Get()
  @UseInterceptors(CacheInterceptor)
  async listarAvaliacoes() {
    const achado = await this.avaliacaoService.listarAvaliacoes();

    return {
      Avaliacoes: achado,
    };
  }
  @UseGuards(AutenticaGuard)
  @Put(':id')
  @UseInterceptors(CacheInterceptor)
  async atualizarAvalicao(
    @Param('id') id: string,
    //@Param('id') pes: string,
    @Body() dados: atualizaProdutoDTo,
  ) {
    const atu = await this.avaliacaoService.atualizarAvaliacao(id, dados);

    return {
      Mensagem: `Review do id: ${id} foi atualizado com sucesso`,
      Review: atu,
    };
  }
  @UseGuards(AutenticaGuard)
  @Delete(':id')
  @UseInterceptors(CacheInterceptor)
  async deletarReview(@Param('id') id: string) {
    const achado = await this.avaliacaoService.deletarAvaliacoes(id);

    return {
      Delete: achado,
    };
  }
}
