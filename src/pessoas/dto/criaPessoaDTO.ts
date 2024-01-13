import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';
import { nomeEhUnico } from '../validacoes/nomeEunico';
import { emailEhUnico } from '../validacoes/emailEhUnico';
import { Exclude } from 'class-transformer';

export class CriaPessoaDTO {
  @IsUUID()
  id: string;

  @IsNotEmpty({ message: 'nome nao pode estar vazio' })
  @nomeEhUnico({ message: 'uma pessoa ja possui este nome' })
  nome: string;

  @IsNotEmpty({ message: 'email nao pode estar vazio' })
  @IsEmail(undefined, { message: 'email deve ser no formato email' })
  @emailEhUnico({ message: 'email ja existe' })
  email: string;

  @IsNotEmpty({ message: 'cidade nao pode estar vazia' })
  cidade: string;

  @IsNotEmpty({ message: 'nascimento nao pode estar vazia' })
  nascimento: string;
  @Exclude()
  @IsNotEmpty({ message: 'senha nao pode estar vazia' })
  senha: string;

  @IsNotEmpty({ message: 'idade nao pode estar vazia' })
  idade: number;
}
