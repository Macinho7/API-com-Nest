import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PessoasService } from '../pessoas/pessoas.service';
import * as bcrypt from 'bcrypt';

export interface ServicoPayload {
  sub: string;
  nomeUsuario: string;
}
@Injectable()
export class AutenticacaoService {
  constructor(
    private pessoaService: PessoasService,
    private jwtService: JwtService,
  ) {}

  async verificar(email, senha) {
    const pessoa = await this.pessoaService.buscarEmail(email);

    const pessoaAutenticada = await bcrypt.compare(senha, pessoa.senha);
    if (!pessoaAutenticada) {
      throw new UnauthorizedException(
        `Email: ${email} ou senha: ${senha} invalidos`,
      );
    }
    const Payload: ServicoPayload = {
      sub: pessoa.id,
      nomeUsuario: pessoa.nome,
    };

    return {
      Token_Do_Usuario: await this.jwtService.signAsync(Payload),
    };
  }
}
