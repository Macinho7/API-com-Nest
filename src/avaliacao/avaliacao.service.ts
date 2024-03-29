import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AvaliacaoEntity } from './avaliacao.entity';
import { Repository } from 'typeorm';
import { criaAvaliacaoDTO } from './dto/criaAvaliacaoDTO';
import { PessoasEntity } from 'src/pessoas/pessoa.entity';
import { atualizarAvalicaoDTO } from './dto/atualizaAvaliacao';

@Injectable()
export class AvaliacaoService {
  constructor(
    @InjectRepository(AvaliacaoEntity)
    private readonly avaliacaoRepository: Repository<AvaliacaoEntity>,
    @InjectRepository(PessoasEntity)
    private readonly pessoaRepository: Repository<PessoasEntity>,
  ) {}
  private async acharPessoa(id: string) {
    const pessoa = await this.pessoaRepository.findOneBy({ id });
    if (pessoa === null) {
      throw new NotFoundException('pessoa procurada nao achada');
    }
    return pessoa;
  }
  private async verificarAvalicaoExistente(id: string) {
    const pessoaid = await this.pessoaRepository.findOneBy({ id });
    if (pessoaid?.avaliacao && pessoaid.avaliacao.length > 0) {
      throw new NotFoundException('ja existe uma avaliacao para essa pessoa');
    }
    return pessoaid;
  }
  async criaAvaliacao(id: string, dados: criaAvaliacaoDTO) {
    const pessoaID = await this.acharPessoa(id);
    const ver = await this.verificarAvalicaoExistente(id);
    if (!ver) {
      throw new NotFoundException('ja existe uma avaliacao para essa pessoa');
    }

    const avaliacaoEntity = new AvaliacaoEntity();
    avaliacaoEntity.id = dados.id;
    avaliacaoEntity.avaliador = dados.avaliador;
    avaliacaoEntity.avaliacao = dados.avaliacao;
    avaliacaoEntity.opniao = dados.opniao;
    avaliacaoEntity.pessoa = pessoaID;
    pessoaID.nome = avaliacaoEntity.avaliador;

    const criado = await this.avaliacaoRepository.save(avaliacaoEntity);
    return criado;
  }


  async listarAvaliacoes() {
    const achado = await this.avaliacaoRepository.find();

    return achado;
  }
  async deletarAvaliacoes(id: string) {
    return await this.avaliacaoRepository.delete({ id });
  }
  async atualizarAvaliacao(id: string, dados: atualizarAvalicaoDTO) {
    const achado = await this.avaliacaoRepository.findOneBy({ id });
    if (achado === null) {
      throw new NotFoundException('id avaliacao nao achado');
    }
    Object.assign(achado, dados as AvaliacaoEntity);
    const salvar = await this.avaliacaoRepository.save(achado);
    return salvar;
  }
}
