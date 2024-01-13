import { IsNotEmpty, IsUUID } from 'class-validator';

export class criaAvaliacaoDTO {
  @IsUUID()
  id: string;

  avaliador: string;

  @IsNotEmpty({ message: 'esse campo nao pode estar vazio' })
  avaliacao: string;

  @IsNotEmpty({ message: 'esse campo nao pode estar vazio' })
  opniao: string;
}
