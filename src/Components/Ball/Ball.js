import React, { Component } from 'react';
import './Ball.css';
import { connect } from "react-redux";
import { addStopwatch } from "../../Actions/index";
import { addOver } from "../../Actions/index";
const mapDispatchToProps = dispatch => {
  return {
    addStopwatch: stopwatch => dispatch(addStopwatch(stopwatch)),
    addOver: over => dispatch(addOver(over))
  };
};
const mapStateToProps = state => {
  return { over: state.over.over, ball: state.over.ball, secondsElapsed: state.stopwatch.secondsElapsed };
};


class Ball extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secondsElapsed: 0,
      laps: [],
      lastClearedIncrementer: null,
      incrementer: null,
      over: 0,
      ball: 0
    };

    this.incrementer = null;

    this.stopwatch = this.stopwatch.bind(this);
    this.addBall = this.addBall.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);

  }

addBall() {

  console.log(this.props.stop);
  this.stopwatch();
  console.log(this.props.over);
  console.log(this.props.ball);
  let balls = this.props.ball;
  let overs = this.props.over;

  console.log(balls);
  if (balls <= 5) {
  balls++;
  }
  this.setState({
    ball: balls,
    over: overs
  }, function () {
    const { over, ball } = this.state;
    console.log({ball});
    this.props.addOver({ over, ball });
    console.log(this.props.addOver({ over, ball }));
  });

  console.log(this.props.wickets);

  if (this.props.wickets > 1) {
    this.props.averagePartnerhsip(this.props.wickets, balls, this.props.over)
  //this.averagePartnerhsip(this.props.wickets, balls, this.props.over);
}

let clickFrom = 'addBall';

this.props.highestPartnership(this.props.wickets, balls, this.props.over, null, clickFrom);

}

stopwatch() {

  /*
  First clear the timer
  */
  clearInterval(this.incrementer);
  this.setState({
    secondsElapsed: 0,
    laps: [],
    incrementer: this.incrementer
  }, function () {
    const { secondsElapsed, laps, incrementer } = this.state;
    console.log({secondsElapsed, laps, incrementer});
    this.props.addStopwatch({ secondsElapsed, laps, incrementer });
    console.log(this.props.addStopwatch({ secondsElapsed, laps, incrementer }));
  });

  /*
  Then start the timer
  */


    this.incrementer = setInterval( () =>
        this.setState({
          secondsElapsed: this.props.secondsElapsed + 1,
          incrementer: this.incrementer
        },  function () {
          const { secondsElapsed, incrementer } = this.state;
          console.log({secondsElapsed, incrementer });
          this.props.addStopwatch({ secondsElapsed, incrementer });
          console.log(this.props.addStopwatch({ secondsElapsed, incrementer }));
        })
      , 1000);


}

handleStopClick() {
    clearInterval(this.incrementer);
    this.setState({
      lastClearedIncrementer: this.incrementer
    });
  }


  render() {
    console.log(this.props.secondsElapsed);
    return (
      <div className="ball-add-app">
        <div className="add-ball">
          <button className="Add-ball btn btn-default btn-circle btn-lg" onClick={this.addBall}><h2>+</h2></button>
        </div>
      </div>
    );
  }
}

//const Button = (props) =>
  //<button type="button" {...props} className={"btn " + props.className } />;

export default connect(mapStateToProps, mapDispatchToProps)(Ball);
