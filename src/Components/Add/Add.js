import React, { Component } from 'react';
import Ball from '../Ball/Ball.js';
import BallRemove from '../BallRemove/BallRemove.js';
import AddWicket from '../AddWicket/AddWicket.js';
/*
Material UI
*/
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

/*
Material UI constants
*/
const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
  },
  alignCenter: {
    textAlign: 'center',
    marginTop: 'auto',
  },
  containerMargin: {
    paddingRight: '5%',
    paddingLeft: '5%',
  },
});

class Add extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid className={classes.containerMargin} container spacing={12}>
        <Grid item xs={3} className={classes.alignCenter}>
          <BallRemove className="" wickets={this.props.wickets} stopwatch={this.props.stopwatch} highestPartnership={this.props.highestPartnership} />
        </Grid>
        <Grid item xs={6} className={classes.alignCenter}>
          <Ball className="" addBall={this.props.addBall} wickets={this.props.wickets} highestPartnership={this.props.highestPartnership} averagePartnerhsip={this.props.averagePartnerhsip}/>
        </Grid>
        <Grid item xs={3} className={classes.alignCenter}>
          <AddWicket className="" addWicket={this.props.addWicket} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Add);
