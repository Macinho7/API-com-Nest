/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import {
    ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { PessoasService } from '../pessoas.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class nomeEhUnicoValidator implements ValidatorConstraintInterface {
    constructor(private pessoaRepository: PessoasService){}
  async validate(value: any):Promise<boolean> {
    const pessoasComNomeExistente = 
        await this.pessoaRepository.buscaNome(value)
    return !pessoasComNomeExistente    
  }
}

export const nomeEhUnico = (opcoesDeValidacao: ValidationOptions) => {
    return (objeto: object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: nomeEhUnicoValidator,
        })

    }
}
