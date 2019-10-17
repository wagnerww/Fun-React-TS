import React from "react";
import { navigate } from "@reach/router";

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

const Pedidos: React.FC = () => {
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
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </React.Fragment>
    </FormVisualizationDataWrapper>
  );
};

export default Pedidos;
