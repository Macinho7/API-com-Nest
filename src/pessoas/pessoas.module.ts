import { Module, forwardRef } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { PessoasController } from './pessoas.controller';
import { nomeEhUnicoValidator } from './validacoes/nomeEunico';
import { PessoasEntity } from './pessoa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompraEntity } from 'src/compras/compra.entity';
import { ComprasModule } from 'src/compras/compras.module';
import { AvaliacaoEntity } from 'src/avaliacao/avaliacao.entity';
import { AvaliacaoModule } from 'src/avaliacao/avaliacao.module';
import { emailEhUnicoValidador } from './validacoes/emailEhUnico';

@Module({
  imports: [
    TypeOrmModule.forFeature([PessoasEntity, CompraEntity, AvaliacaoEntity]),
    forwardRef(() => ComprasModule),
    forwardRef(() => AvaliacaoModule),
  ],
  controllers: [PessoasController],
  providers: [PessoasService, nomeEhUnicoValidator, emailEhUnicoValidador],
  exports: [PessoasService],
})
export class PessoasModule {}
