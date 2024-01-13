import { Body, Controller, Post } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { autenticaDTO } from './dto/autenticaDTO';

@Controller('/verificador')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post('verifica')
  login(@Body() { email, senha }: autenticaDTO) {
    return this.autenticacaoService.verificar(email, senha);
  }
}
