/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
export class ListarComprasDTO {
  constructor(
    readonly id: string,
    readonly compra: string,
    readonly valorTotal: number,
    readonly taxa: number,
    readonly pessoa: any,
    readonly produto: any
  ) {}
}
