import React, { Component } from 'react';
import Stopwatch from './Stopwatch';
import Reset from './Reset';
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
  return { over: state.over.over, ball: state.over.ball };
};

class Header extends Component {
  constructor(props) {
    super(props);
      this.state = {
        secondsElapsed: 0,
        laps: [],
        lastClearedIncrementer: null,
        over: 0,
        ball: 0
      };


    this.incrementer = null;

    this.headerDisplay = this.headerDisplay.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.stopwatch = this.stopwatch.bind(this);

  }


  componentWillMount() {
    const { secondsElapsed, laps, lastClearedIncrementer } = this.state;
    console.log(this.props.addStopwatch({ secondsElapsed, laps, lastClearedIncrementer }));
    this.props.addStopwatch({ secondsElapsed, laps, lastClearedIncrementer });
  }


  stopwatch() {

    /*
    First clear the timer
    */
    clearInterval(this.incrementer);
    this.setState({
      secondsElapsed: 0,
      laps: []
    }, function () {
      const { secondsElapsed, laps } = this.state;
      console.log({secondsElapsed, laps});
      this.props.addStopwatch({ secondsElapsed, laps });
      console.log(this.props.addStopwatch({ secondsElapsed, laps }));
    });

    /*
    Then start the timer
    */


      this.incrementer = setInterval( () =>
          this.setState({
            secondsElapsed: this.state.secondsElapsed + 1
          },  function () {
            const { secondsElapsed } = this.state;
            console.log({secondsElapsed });
            this.props.addStopwatch({ secondsElapsed });
            console.log(this.props.addStopwatch({ secondsElapsed }));
          })
        , 1000);


  }

  handleStopClick() {
      clearInterval(this.incrementer);
      this.setState({
        lastClearedIncrementer: this.incrementer
      }, function () {
        const { secondsElapsed, laps, lastClearedIncrementer } = this.state;
        console.log({secondsElapsed, laps, lastClearedIncrementer});
        this.props.addStopwatch({ secondsElapsed, laps, lastClearedIncrementer });
        console.log(this.props.addStopwatch({ secondsElapsed, laps, lastClearedIncrementer }))
      });
    }


  headerDisplay() {
    if (this.props.resetDisplay === 0) {
    return (
      <div className="row">
    <div className="col-4">
    <button onClick={this.props.resetDisplaySet} className="btn-sm btn-wicket">Reset</button>
  </div>
    <div className="col-8">
    <Stopwatch />
    </div>
    </div>
    )
  }
  else {
    return (
      <div className="row">
      <div className="col-4">
      <p>Are you sure?</p>
      </div>
      <div className="col-4">
        <Reset resetBuilder={this.props.resetBuilder}/>
    </div>
      <div className="col-4">
      <button onClick={this.props.displayHeader} className="btn-sm">Cancel</button>
      </div>
      </div>
    )
  }
  }

  render() {
    console.log('THis is the header');
    return (
      <div className="header-app">


          {this.headerDisplay()}


      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
