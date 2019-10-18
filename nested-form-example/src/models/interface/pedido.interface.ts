import { IProduto } from "./produto.interface";

export interface IPedido {
  id: string;
  nome: string;
  email: string;
  /*dataCriacao?: string;*/
  rua: string;
  bairro?: string;
  produtos: IProduto[];
  total: number;
}
