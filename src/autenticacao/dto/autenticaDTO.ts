import { IsEmail, IsNotEmpty } from 'class-validator';

export class autenticaDTO {
  @IsEmail(undefined, { message: 'esse campo nao pode estar vazio' })
  email: string;

  @IsNotEmpty({ message: 'esse campo nao pode estar vazio' })
  senha: string;
}
