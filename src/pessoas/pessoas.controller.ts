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
import { PessoasService } from './pessoas.service';
import { CriaPessoaDTO } from './dto/criaPessoaDTO';
import { atualizarPessoaDTO } from './dto/atualizarPessoaDTO';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { HashearSenha } from 'src/filtros/recursos/pipeHashearSenha';
import { AutenticaGuard } from 'src/autenticacao/autentica/autentica.guard';

@Controller('/pessoas')
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService) {}

  @Post(':id')
  @UseInterceptors(CacheInterceptor)
  async criaPessoa(
    @Param('id') id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() { senha, ...dadosPessoa }: CriaPessoaDTO,
    @Body('senha', HashearSenha) senhaHash: string,
  ) {
    const criado = await this.pessoasService.criaPessoa(id, {
      senha: senhaHash,
      ...dadosPessoa,
    });

    return {
      Mensagem: 'pessoa criada com sucesso',
      Pessoa: criado,
    };
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async listarAhPessoas() {
    const achado = await this.pessoasService.listarPessoas();

    return {
      Pessoas: achado,
    };
  }
  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async listarAhPessoa(@Param('id') id: string) {
    const achado = await this.pessoasService.listarPessoa(id);

    return {
      Pessoa: achado,
    };
  }
  @UseGuards(AutenticaGuard)
  @UseInterceptors(CacheInterceptor)
  @Put(':id')
  async atualizarPessoa(
    @Param('id') id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() { senha, ...dados }: atualizarPessoaDTO,
    @Body('senha', HashearSenha) senhaHash: string,
  ) {
    const achado = await this.pessoasService.atualizarPessoa(id, {
      senha: senhaHash,
      ...dados,
    });

    return {
      Mensagem: `Pessoa do id: ${id} foi atualizado`,
      Pessoa: achado,
    };
  }
  @Delete(':id')
  @UseInterceptors(CacheInterceptor)
  async deletarPessoas(@Param('id') id: string) {
    const del = await this.pessoasService.deletarPessoas(id);

    return {
      Delete: del,
    };
  }
}
