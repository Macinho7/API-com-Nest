/* eslint-disable prettier/prettier */
export class ListarPessoasDTO {
    constructor(
      readonly id: string,
      readonly nome: string,
      readonly email: string,
      readonly cidade: string,
      readonly nascimento: string,
      readonly idade: number,
      readonly avaliacao: any
    ) {}
  }
  