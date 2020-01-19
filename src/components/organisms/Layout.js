import React, { memo } from "react";
import { Button, Paper, Grid, Typography } from "@material-ui/core"; 
import PropTypes from 'prop-types';

const Layout = memo(props => (
  <Paper
    elevation={0}
    className={"paperRightSide"} 
  > 
    <Grid container spacing={0}>
        <Grid className="userBlock" item xs={12}>
            <Typography  className="prTitle"> 
                {props.project && props.project.name}
            </Typography>
            <Typography  className="prTitle2"> 
                {props.project && props.project.projectList}
            </Typography>
        </Grid>
        <Grid className="listBlock" item xs={12}> 
          {props.children} 
        </Grid>
      </Grid>
  </Paper>
));

Layout.propTypes = {
  user: PropTypes.object.isRequired
};

export default Layout;
