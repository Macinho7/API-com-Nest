import { Injectable, NotFoundException } from '@nestjs/common';
import { criaComprasDTO } from './dto/criarComprasDTO';
//import { UpdateCompraDto } from './dto/atualizarComprasDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { CompraEntity } from './compra.entity';
import { Repository } from 'typeorm';
import { ListarComprasDTO } from './dto/listarComprasDTO';
import { atualizarComprasDTO } from './dto/atualizarComprasDTO';

@Injectable()
export class ComprasService {
  constructor(
    @InjectRepository(CompraEntity)
    private readonly comprasRepository: Repository<CompraEntity>,
  ) {}

  async criarCompras(dados: criaComprasDTO) {
    const compras = new CompraEntity();

    compras.id = dados.id;
    compras.compra = dados.compra;
    compras.valorTotal = dados.valorTotal;
    compras.taxa = dados.taxa;

    return await this.comprasRepository.save(compras);
  }
  async listarAsCompras() {
    const achar = await this.comprasRepository.find();

    const filtrado = achar.map(
      (listar) =>
        new ListarComprasDTO(
          listar.id,
          listar.compra,
          listar.valorTotal,
          listar.taxa,
          listar.pessoa,
          listar.produtos,
        ),
    );
    return filtrado;
  }
  async listarAhCompra(id: string) {
    const achado = await this.comprasRepository.findOneBy({ id });
    if (achado === null) {
      throw new NotFoundException(`id descrito ${id} nao existe`);
    }
    return achado;
  }
  async atualizarParcial(id: string, dados: atualizarComprasDTO) {
    const achar = await this.comprasRepository.findOneBy({ id });

    achar.compra = dados.compra;

    const obj = await this.comprasRepository.save(achar);
    return obj;
  }
  async deletarCompra(id: string) {
    return await this.comprasRepository.delete(id);
  }
  public async buscarCompra(compra: string) {
    const compraAchado = await this.comprasRepository.findOne({
      where: { compra },
    });
    if (compraAchado === null) {
      throw new NotFoundException('compra nao achada');
    }
    return compraAchado;
  }
}
