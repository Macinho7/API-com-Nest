/* eslint-disable prettier/prettier */
export class ListaProdutoDTO {
  constructor(
    readonly id: string,
    readonly categoria: string,
    readonly preco: any,
    readonly tipo: string,
    readonly encomendado: string,
  ) {}
}
