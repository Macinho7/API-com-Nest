import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ComprasService } from './compras.service';
import { criaComprasDTO } from './dto/criarComprasDTO';
import { atualizarComprasDTO } from './dto/atualizarComprasDTO';
//import { CacheInterceptor } from '@nestjs/cache-manager';
//import { atualizarComprasDTO } from './dto/atualizarComprasDTO';

@Controller('/compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Post()
  async criarCompras(@Body() dadosCompra: criaComprasDTO) {
    const criado = await this.comprasService.criarCompras(dadosCompra);

    return {
      Mensagem: 'Compra estabelecida',
      Compras: criado,
    };
  }
  @Get()
  async listarCompras() {
    const achar = await this.comprasService.listarAsCompras();

    return {
      Compras: achar,
    };
  }
  @Get(':id')
  async listarCompra(@Param('id') id: string) {
    const achado = await this.comprasService.listarAhCompra(id);

    return {
      Compra: achado,
    };
  }
  @Patch(':id')
  async atualizacaoParcial(
    @Param('id') id: string,
    @Body() dados: atualizarComprasDTO,
  ) {
    const atu = await this.comprasService.atualizarParcial(id, dados);

    return {
      Messagem: `id: ${id} foi parcialmente atualizado`,
      Propiedades: `A propiedade ${atu.compra} foi definida`,
    };
  }

  @Delete(':id')
  async deletarCompra(@Param('id') id: string) {
    const del = await this.comprasService.deletarCompra(id);
    return {
      Deletado: del,
    };
  }
}
