import { PartialType } from '@nestjs/mapped-types';
import { criaComprasDTO } from './criarComprasDTO';

export class atualizarComprasDTO extends PartialType(criaComprasDTO) {}
