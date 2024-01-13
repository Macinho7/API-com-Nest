import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ServicoPayload } from '../autenticacao.service';
import { Request } from 'express';

export interface interfacePessoa extends Request {
  pessoa: ServicoPayload;
}
@Injectable()
export class AutenticaGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(contexto: ExecutionContext): Promise<boolean> {
    const requisicao = contexto.switchToHttp().getRequest<interfacePessoa>();
    const token = this.extrairOtoken(requisicao);
    if (!token) {
      throw new UnauthorizedException('Token nao existe');
    }
    try {
      const payload: ServicoPayload = await this.jwtService.verifyAsync(token);
      requisicao.pessoa = payload;
    } catch (error) {
      console.error(error.message);
      throw new UnauthorizedException('Token invalidado');
    }
    return true;
  }
  private extrairOtoken(requisicao: Request): string | undefined {
    const [tipo, token] = requisicao.headers.authorization?.split(' ') ?? [];
    return tipo === 'Bearer' ? token : undefined;
  }
}
