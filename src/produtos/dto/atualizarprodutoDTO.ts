import { PartialType } from '@nestjs/mapped-types';
import { criaProdutoDTO } from './criaProdutoDTO';

export class atualizaProdutoDTo extends PartialType(criaProdutoDTO) {}
