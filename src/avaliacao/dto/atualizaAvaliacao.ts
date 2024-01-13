import { PartialType } from '@nestjs/mapped-types';
import { criaAvaliacaoDTO } from './criaAvaliacaoDTO';

export class atualizarAvalicaoDTO extends PartialType(criaAvaliacaoDTO) {}
