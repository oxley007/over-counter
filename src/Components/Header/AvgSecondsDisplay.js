import React, { Component } from 'react';
import { connect } from "react-redux";
import { addStopwatch } from "../../Actions/index";

/*
Material UI
*/
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import compose from 'recompose/compose';

/*
Redux constants*/
const mapStateToProps = state => {
  return { avgSeconds: state.stopwatch.avgSeconds };
};

/*
Material Ui constants
*/

const styles = theme => ({
  avgText: {
    margin: '0 0 10px 0',
    textAlign: 'center',
    fontSize: '0.8rem',
  },
});


class AvgSecondsDisplay extends Component {

  constructor(props) {
    super(props);

    this.incrementer = null;

    this.avgSecondsDisplay = this.avgSecondsDisplay.bind(this);

  }

  avgSecondsDisplay() {
    const { classes } = this.props;
    //console.log(this.state.avgSeconds);
    console.log(this.props.avgSeconds);
    if (isNaN(parseFloat(this.props.avgSeconds))) {
      return (
      <span className={classes.avgText}>Avg: 0:00</span>
    )
    }
    else {
    return (
      <span className={classes.avgText}>Avg: {this.props.avgSeconds}</span>
      )
      }
    }

  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12} className={classes.avgText}>
      {this.avgSecondsDisplay()}
      </Grid>
    );
  }
}

//const Button = (props) =>
  //<button type="button" {...props} className={"btn " + props.className } />;

  export default compose(
    withStyles(styles),
    connect(mapStateToProps)
  )(AvgSecondsDisplay);
