import React, { Component } from 'react';
import './Ball.css';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
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
  return { over: state.over.over, ball: state.over.ball, secondsElapsed: state.stopwatch.secondsElapsed, avgBall: state.stopwatch.avgBall, avgSeconds: state.stopwatch.avgSeconds };
};
const styles = theme => ({
button: {
  margin: theme.spacing.unit,
  backgroundColor: '#fff',
  color: '#c471ed',
  '&:hover': {
    backgroundColor: '#fff',
    color: '#c471ed',
  },
  '&:active': {
    backgroundColor: '#f64f59',
    color: '#fff',
},
},
});

const formattedSeconds = (sec) =>
  Math.floor(sec / 60) +
    '.' +
  ('0' + sec % 60).slice(-2)

class Ball extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secondsElapsed: 0,
      laps: [],
      lastClearedIncrementer: null,
      incrementer: null,
      avgBall: [],
      avgSeconds: 0,
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
  Work out the average seconds ecslipsed by adding to the array
  */

    console.log(this.props.avgBall);
    console.log(this.state.avgBall);
    console.log(this.props.avgSeconds);
    console.log(this.state.secondsElapsed);
    console.log(this.props.secondsElapsed);
    let secondsElapsed = this.state.secondsElapsed;
    console.log(secondsElapsed);
    let formattedAvgSeconds = formattedSeconds(secondsElapsed);
    console.log(formattedAvgSeconds);
    let avgBalls = this.state.avgBall;
    if (this.props.ball != 0) {
    avgBalls.push(formattedAvgSeconds);
  }

    //let avgSeconds = avgBalls[avgBalls.length - 1];
    let total = 0;
    for(var i = 0; i < avgBalls.length; i++) {
    let num = parseFloat(avgBalls[i]);
    console.log(num);
    total += num;
    }
    let avgSecondsFull = total / avgBalls.length;
    console.log(avgSecondsFull);
    var avgSeconds = avgSecondsFull.toFixed(2);
    //let formattedAvgSeconds = formattedSeconds(avgSeconds);
    //console.log(formattedAvgSeconds);
    console.log(avgSeconds);

    console.log(avgBalls);

  /*
  First clear the timer
  */
  clearInterval(this.incrementer);
  this.setState({
    secondsElapsed: 0,
    laps: [],
    incrementer: this.incrementer,
    avgBall: avgBalls,
    avgSeconds: avgSeconds,
  }, function () {
    const { secondsElapsed, laps, incrementer, avgBall, avgSeconds } = this.state;
    console.log({secondsElapsed, laps, incrementer, avgBall, avgSeconds});
    this.props.addStopwatch({ secondsElapsed, laps, incrementer, avgBall, avgSeconds });
    console.log(this.props.addStopwatch({ secondsElapsed, laps, incrementer, avgBall, avgSeconds }));
  });

  /*
  Then start the timer
  */


    this.incrementer = setInterval( () =>
        this.setState({
          secondsElapsed: this.props.secondsElapsed + 1,
          incrementer: this.incrementer
        },  function () {
          const { secondsElapsed, incrementer, avgBall, avgSeconds } = this.state;
          //console.log({secondsElapsed, incrementer });
          this.props.addStopwatch({ secondsElapsed, incrementer, avgBall, avgSeconds });
          //console.log(this.props.addStopwatch({ secondsElapsed, incrementer }));
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
  const { classes } = this.props;
    return (
      <div className="">
        <div className="">
          <Button variant="fab" size="medium" color="primary" aria-label="Add" className={classes.button}
             onClick={this.addBall}>
        <AddIcon />
      </Button>
        </div>
      </div>
    );
  }
}

//const Button = (props) =>
  //<button type="button" {...props} className={"btn " + props.className } />;

/*
copy this code:
  export default compose(
    withStyles(styles, { name: 'Cart' }),
    connect(mapStateToProps, null)
  )(Cart);
  */

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
  )(Ball);
