import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";

import api from "../../services/api";
import { numberFormat } from "../../utils/intl";

import {
  Grid,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

import FormVisualizationDataWrapper from "../../components/Form/FormVisualizationDataWrapper";
import { IPedido } from "../../models/interface/pedido.interface";

interface IPedidoFortmated extends IPedido {
  valorTotalFormatado: string;
}

const Pedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<IPedidoFortmated[]>([]);

  useEffect(() => {
    async function loadPedidos() {
      try {
        const { data } = await api.get<IPedidoFortmated[]>("/pedidos");
        const pedidos = await data.map<IPedidoFortmated>(pedido => ({
          valorTotalFormatado: numberFormat(pedido.total),
          ...pedido
        }));
        setPedidos(pedidos);
      } catch (error) {}
    }

    loadPedidos();
  }, []);

  return (
    <FormVisualizationDataWrapper title="Consulta de Pedidos">
      <React.Fragment>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("/cadastro");
          }}
        >
          Novo Pedido
        </Button>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Comprador</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedidos.map(pedido => (
              <TableRow key={pedido.id}>
                <TableCell component="th" scope="row">
                  {pedido.nome}
                </TableCell>
                <TableCell>{pedido.email}</TableCell>
                <TableCell align="right">
                  {pedido.valorTotalFormatado}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </FormVisualizationDataWrapper>
  );
};

export default Pedidos;
