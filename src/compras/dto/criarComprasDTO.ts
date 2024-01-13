import { IsNotEmpty, IsUUID } from 'class-validator';

export class criaComprasDTO {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  compra: string;

  @IsNotEmpty()
  valorTotal: number;

  @IsNotEmpty()
  taxa: number;
}
