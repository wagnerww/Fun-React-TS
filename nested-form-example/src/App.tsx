import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Pedidos from "./pages/Pedidos";

import Router from "./routes";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Typography component="div" style={{ height: "100vh" }}>
          <Box py={3} px={2}>
            <Router />
          </Box>
        </Typography>
      </Container>
    </React.Fragment>
  );
};

export default App;
