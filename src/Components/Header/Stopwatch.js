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
  return { secondsElapsed: state.stopwatch.secondsElapsed, laps: state.stopwatch.laps, lastClearedIncrementer: state.stopwatch.lastClearedIncrementer, stop: state.stopwatch.stop };
};

/*
Material Ui constants
*/

const styles = theme => ({
  stopwatchDisplay: {
    float: 'right',
    marginRight: '0.20rem',
    marginBottom: '0.1rem',
  },
});


const formattedSeconds = (sec) =>
  Math.floor(sec / 60) +
    ':' +
  ('0' + sec % 60).slice(-2)



class Stopwatch extends Component {

  constructor(props) {
    super(props);

    this.incrementer = null;

    this.stopwatchTime = this.stopwatchTime.bind(this);
  }


stopwatchTime() {
  const { classes } = this.props;
return (
<div className="stopwatch">
  <h1 className={classes.stopwatchDisplay}>{formattedSeconds(this.props.secondsElapsed)}</h1>
</div>
)
}

  render() {
    return (
      <div className="ball-add-app">
        {this.stopwatchTime()}
      </div>
    );
  }
}

//const Button = (props) =>
  //<button type="button" {...props} className={"btn " + props.className } />;

  export default compose(
    withStyles(styles),
    connect(mapStateToProps)
    )(Stopwatch);
