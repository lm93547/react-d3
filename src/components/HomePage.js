import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

const HomePage = () => {
  return (
      <Grid container justify="center" direction="column" alignItems="center">
        <Grid item>
            <h3>React and D3 Experiments</h3>
        </Grid>
      <Grid item>
        <Link to="pack-tree">Pack Tree Visualisation</Link>
      </Grid>
      <Grid item>
        <Link to="scatter">Scatter plot with synced tooltip</Link>
      </Grid>
    </Grid>
  );
};

export { HomePage };
