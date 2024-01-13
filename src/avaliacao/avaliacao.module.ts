import { Module, forwardRef } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoController } from './avaliacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasEntity } from 'src/pessoas/pessoa.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { AvaliacaoEntity } from './avaliacao.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PessoasEntity, AvaliacaoEntity]),
    forwardRef(() => PessoasModule),
  ],
  controllers: [AvaliacaoController],
  providers: [AvaliacaoService],
  exports: [AvaliacaoService],
})
export class AvaliacaoModule {}
