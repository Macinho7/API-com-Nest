/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { PessoasEntity } from './pessoa.entity';
import { Repository } from 'typeorm';
import { CriaPessoaDTO } from './dto/criaPessoaDTO';
import { CompraEntity } from 'src/compras/compra.entity';
import { ListarPessoasDTO } from './dto/listarPessoasDTO';
import { atualizarPessoaDTO } from './dto/atualizarPessoaDTO';
import { AvaliacaoEntity } from 'src/avaliacao/avaliacao.entity';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(PessoasEntity)
    private readonly pessoasRepository: Repository<PessoasEntity>,
    @InjectRepository(CompraEntity)
    private readonly comprasRepository: Repository<CompraEntity>,
    @InjectRepository(AvaliacaoEntity)
    private readonly avaliacaoRepository: Repository<AvaliacaoEntity>
  ) {}

  private async verificarId(id: string) {
    const compra = await this.comprasRepository.findOneBy({ id });
    if (compra === null) {
      throw new NotFoundException('tabela compra nao achada');
    }
    return compra;
  }
  async criaPessoa(id: string, dados: CriaPessoaDTO){
    const compraId = await this.verificarId(id)
    if(compraId === null){
      throw new NotFoundException('tabela compra nao achada')
    }
    const pessoaEntity = new PessoasEntity();
    pessoaEntity.id = dados.id
    pessoaEntity.nome = dados.nome
    pessoaEntity.email = dados.email
    pessoaEntity.cidade = dados.cidade
    pessoaEntity.nascimento = dados.nascimento
    pessoaEntity.senha = dados.senha
    pessoaEntity.idade = dados.idade
    pessoaEntity.compras = compraId
    const pessoa = await this.pessoasRepository.save(pessoaEntity)
    return pessoa
  }

  async listarPessoas(){
    const achar = await this.pessoasRepository.find()
    const filtrar = achar.map((filt) =>
    new ListarPessoasDTO(filt.id, filt.nome, filt.email, filt.cidade, filt.nascimento, filt.idade, filt.avaliacao))


    return filtrar
  }
  async listarPessoa(id: string){
    const listar = await this.pessoasRepository.findOneBy({id})
    if(listar === null){
      throw new NotFoundException('Id da pessoa nao achada')
    }
    return listar
  }
  async atualizarPessoa(id: string, dados: atualizarPessoaDTO){
    const achado = await this.pessoasRepository.findOneBy({id})
    if(achado === null){
      throw new NotFoundException('id de pessoas procurado nao achado')
    }

    Object.assign(achado , dados as PessoasEntity)
    const atu = await this.pessoasRepository.save(achado)
    return atu
  }
  async deletarPessoas(id: string){
    return await this.pessoasRepository.delete(id)
  }

  async buscarEmail(email: string){
    const emailAchado = await this.pessoasRepository.findOne({where: {email}});
    if(emailAchado === null){
      throw new NotFoundException('email procurado nao achado');
    }
    return emailAchado
  }
  async buscaNome(nome: string) {
    const nomeAchado = await this.pessoasRepository.findOne({ where: { nome } });
    if (nome === null) {
      throw new NotFoundException('nome procurado nao achado');
    }
    return nomeAchado;
  }
}
