import React, { Component } from 'react';
import './Ball.css';

const formattedSeconds = (sec) =>
  Math.floor(sec / 60) +
    ':' +
  ('0' + sec % 60).slice(-2)


class Ball extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secondsElapsed: 0,
      laps: [],
      lastClearedIncrementer: null
    };

    this.incrementer = null;

    this.handleClick = this.handleClick.bind(this);
    this.stopwatch = this.stopwatch.bind(this);
    this.stopwatchTime = this.stopwatchTime.bind(this);
  }

handleClick() {
  //this.props.stopwatch();
  this.stopwatch();
  //let stopwatchTime = this.stopwatchTime();
  //console.log(stopwatchTime);
  this.props.addBall();
}

stopwatch() {
  /*
  First clear the timer
  */
  clearInterval(this.incrementer);
  this.setState({
    secondsElapsed: 0,
    laps: []
  });

  /*
  Then start the timer
  */

  this.incrementer = setInterval( () =>
      this.setState({
        secondsElapsed: this.state.secondsElapsed + 1
      })
    , 1000);
}

stopwatchTime() {
return (
<div className="stopwatch">
  <h1 className="stopwatch-timer">{formattedSeconds(this.state.secondsElapsed)}</h1>
  <ul className="stopwatch-laps">
    { this.state.laps.map((lap, i) =>
        <li className="stopwatch-lap"><strong>{i + 1}</strong>/ {formattedSeconds(lap)}</li>)
    }
  </ul>
</div>
)
}

  render() {
    return (
      <div className="ball-add-app">
        <div>
        {this.stopwatchTime()}
        </div>
        <div className="add-ball">
          <button className="Add-ball btn btn-default btn-circle btn-lg" onClick={this.handleClick}><h2>+</h2></button>
        </div>
      </div>
    );
  }
}

//const Button = (props) =>
  //<button type="button" {...props} className={"btn " + props.className } />;

export default Ball;
