import { IProduto } from "./produto.interface";

export interface IPedido {
  id: number;
  nome: string;
  email: string;
  /*dataCriacao?: string;*/
  rua: string;
  bairro?: string;
  produtos: IProduto[];
  total: number;
}
