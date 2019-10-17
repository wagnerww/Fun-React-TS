import React from "react";

import { Grid, Paper } from "@material-ui/core";

interface IProps {
  children: JSX.Element;
  title: string;
}

const FormVisualizationDataWrapper: React.FC<IProps> = ({
  children,
  title
}) => {
  return (
    <Grid container sm>
      <Grid item sm>
        <Paper style={{ padding: "20px" }}>
          <h2>{title}</h2>
          {children}
        </Paper>
      </Grid>
    </Grid>
  );
};
export default FormVisualizationDataWrapper;
