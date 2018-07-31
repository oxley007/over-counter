import React, { Component } from 'react';
import { connect } from "react-redux";
import { addStopwatch } from "../../Actions/index";
const mapStateToProps = state => {
  return { secondsElapsed: state.stopwatch.secondsElapsed, laps: state.stopwatch.laps, lastClearedIncrementer: state.stopwatch.lastClearedIncrementer, stop: state.stopwatch.stop };
};

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
return (
<div className="stopwatch">
  <h1 className="stopwatch-timer">{formattedSeconds(this.props.secondsElapsed)}</h1>
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

export default connect(mapStateToProps)(Stopwatch);
