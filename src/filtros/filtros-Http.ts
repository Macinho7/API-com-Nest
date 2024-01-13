/* eslint-disable prettier/prettier */
import { ArgumentsHost, Catch, ConsoleLogger, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class filtrarErrosRequisicao implements ExceptionFilter {
    constructor(
        private adapterHost: HttpAdapterHost,
        private loggerNativo: ConsoleLogger,
    ){}
  catch(excecao: unknown, host: ArgumentsHost) {
    this.loggerNativo.error(excecao)
    console.log(excecao)

    const { httpAdapter } = this.adapterHost
    const resp = host.switchToHttp()
    const requisicao = resp.getRequest()
    const resposta = resp.getResponse()
    
 
    const {status, body } = excecao instanceof HttpException ? {
        status: excecao.getStatus(),
        body: excecao.getResponse()
    } : {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        body: {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            date: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(requisicao),
            method: httpAdapter.getRequestMethod(requisicao),
            hostName: httpAdapter.getRequestHostname(requisicao)
        }
    }
    httpAdapter.reply(resposta, body, status)
  }
}
