import React, { FunctionComponent } from "react";
import { Router, RouteComponentProps } from "@reach/router";

import PedidosConsulta from "./pages/Pedidos";
import PedidoCadastro from "./pages/Pedidos/CadastroPedido";

type Props = { component: FunctionComponent } & RouteComponentProps;

const Route: FunctionComponent<Props> = ({ component: Component, ...rest }) => (
  <Component {...rest} />
);
const Routes: React.FC = () => (
  <Router>
    <Route component={PedidosConsulta} path="/" />
    <Route component={PedidoCadastro} path="/cadastro" />
  </Router>
);

export default Routes;
