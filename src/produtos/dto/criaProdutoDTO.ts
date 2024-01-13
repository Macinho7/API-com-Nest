import { IsNotEmpty, IsUUID } from 'class-validator';

export class criaProdutoDTO {
  @IsUUID()
  id: string;
  @IsNotEmpty()
  categoria: string;
  @IsNotEmpty()
  preco: number;
  @IsNotEmpty()
  tipo: string;
  @IsNotEmpty()
  encomendado: string;
}
