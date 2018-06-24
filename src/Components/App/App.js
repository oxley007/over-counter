import React, {
  Component
} from 'react';
import './App.css';
import Ball from '../Ball/Ball.js';
import Add from '../Add/Add.js';
import Overs from '../Overs/Overs.js';
import OverBowled from '../OverBowled/OverBowled.js';
import Wickets from '../Wickets/Wickets.js';
import AddWicket from '../AddWicket/AddWicket.js';
import AverageWicket from '../AverageWicket/AverageWicket.js';
import AdviceBar from '../AdviceBar/AdviceBar.js';
import AdviceUmpire from '../AdviceUmpire/AdviceUmpire.js';
import BallCalc from '../../Util/BallCalc.js';
import BallDiff from '../../Util/BallDiff.js';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      balls: 0,
      overs: 0,
      wickets: 0,
      wicketBalls: [],
      avgWicket: 0,
      highestPartnership: 0,
      partnerships: [],
      associatedWith: '',
      currentPartnership: 0,
    };

    this.addBall = this.addBall.bind(this);
    this.removeBall = this.removeBall.bind(this);
    this.overCount = this.overCount.bind(this);
    this.cancelBowledOver = this.cancelBowledOver.bind(this);
    this.addOver = this.addOver.bind(this);
    this.removeOver = this.removeOver.bind(this);
    this.addWicket = this.addWicket.bind(this);
    this.removeWicket = this.removeWicket.bind(this);
    this.averagePartnerhsip = this.averagePartnerhsip.bind(this);
    this.highestPartnership = this.highestPartnership.bind(this);
    this.storeAssociated = this.storeAssociated.bind(this);
    this.overBowled = this.overBowled.bind(this);

  }

  addBall() {

    let balls = this.state.balls;
    if (balls <= 5) {
    balls++;
    }
    this.setState({
      balls: balls
    });
    if (this.state.wickets > 1) {
    this.averagePartnerhsip(this.state.wickets, balls, this.state.overs);
  }

  let clickFrom = 'addBall';

  this.highestPartnership(this.state.wickets, balls, this.state.overs, null, clickFrom);

  }

  removeBall() {
    let overs = this.state.overs;
    let balls = this.state.balls;
    if (balls > 0) {
    balls--;
  }
  else if (balls === 0) {
    overs--;
    balls = 5;

  }

  if (overs < 0) {
    balls = 0;
    overs = 0;
  }

    this.setState({
      balls: balls
    });
    this.setState({
      overs: overs
    });
    this.averagePartnerhsip(this.state.wickets, balls, this.state.overs);

  }

  overCount() {
    let overs = this.state.overs;
    let balls = this.state.balls;
    balls = 0;
    this.setState({
      balls: balls
    });
    overs++;
    this.setState({
      overs: overs
    });
  }

  cancelBowledOver() {
    let balls = this.state.balls;
    balls = 5;
    this.setState({
      balls: balls
    });
  }

  addOver() {
    let overs = this.state.overs;
    overs++;
    this.setState({
      overs: overs
    });
  }

  removeOver() {
    let overs = this.state.overs;
    overs--;
    this.setState({
      overs: overs
    });
  }

  addWicket() {
    let wickets = this.state.wickets;
    wickets++;
    this.setState({
      wickets: wickets
    });
    let over = this.state.overs;
    let ball = this.state.balls;
    let wicketBall = `${over}.${ball}`;
    let clickFrom = 'wicket';
    this.highestPartnership(wickets, ball, over, wicketBall, clickFrom);
    let wicketBalls = this.state.wicketBalls.slice();
    wicketBalls.push(wicketBall);
    this.setState({wicketBalls: wicketBalls});

    //add call to highestPartnership method


    this.averagePartnerhsip(wickets, ball, over);
  }

averagePartnerhsip(wickets, ball, over) {


    /*
    Work out the average overs per/partnerhsip:
    */
    //totalBalls (70 or 11.4 overs)
    //let totalBallsOvers = over * 6;
    //let totalBalls = totalBallsOvers + ball
    let getpartnershipDiff = BallDiff.getpartnershipDiff(ball, over);
    //let totalBallsOvers = getpartnershipDiff[0];
    let totalBalls = getpartnershipDiff[1];
    //divide totalballs by Wickets (70 / 2 = 35)
    let quotient;
    console.log(quotient);
    console.log(this.state.wickets);
    if (this.state.wickets > 1) {
    quotient = Math.floor(totalBalls/wickets);
    }
    else {
    quotient = 0;
    }
    //divide the above by 6 and the remainder are the balls (35 goes into 6 5 times with 5 balls remoainder - i.e 5.5)
    //let quotientBalls = Math.floor(quotient/6);
    //let remainderAvg = quotient % 6;
    let getpartnershipDiffTotal = BallDiff.getpartnershipDiffTotal(quotient);
    let quotientBalls = getpartnershipDiffTotal[0];
    let remainderAvg = getpartnershipDiffTotal[1];

    let remainderExtra;
    if (ball <= 2) {
      remainderExtra = '';
    }
    else if (wickets > 2 && ball > 2) {
      remainderExtra = 5;
    }
    else {
      remainderExtra = '';
    }
    console.log(remainderAvg);
    console.log(remainderExtra);

    //5.5 * 2 in cricket is 5 *2 = 10 overs + 10 balls = 11.4 - woo!
    let avgWicket = `${quotientBalls}.${remainderAvg}${remainderExtra}`;

    console.log(avgWicket);
    this.setState({avgWicket: avgWicket});
    console.log(this.state.avgWicket);

  }

  removeWicket() {
    let wickets = this.state.wickets;
    wickets--;
    this.setState({
      wickets: wickets
    });
  }

  highestPartnership(wickets, ball, over, wicketBall, clickFrom) {

    //workout the balls between each wicket
    //the first wicket is just the over so far

    let highestPartnership;
    let latestPartnership;
    let partnershipBall;
    let partnershipOver;
    let partnerships = this.state.partnerships.slice();
    let wicketBalls = this.state.wicketBalls;
    if (wickets === 1 && clickFrom === 'wicket') {
      console.log('does this get hit?');
      highestPartnership = wicketBall;
      console.log(highestPartnership);
      latestPartnership = wicketBall;
      console.log(latestPartnership);
    }
    else if (wickets > 1 || (wickets >= 1 && clickFrom === 'addBall')) {
      //the second wicket and more needs to take the current over minus the previous wicket over
      latestPartnership = BallCalc.getOverDiff(wicketBalls, partnershipOver, over, ball, partnershipBall);

    }
    else {
      //nothng.
    }


    if (clickFrom === 'wicket') {
    // we then store this into an array partershipTotals
    console.log(latestPartnership);
    partnerships.push(latestPartnership);
    this.setState({partnerships: partnerships});
    console.log(partnerships);


    //then use max to find highest partenership and store in state.
    let highPartnership = Math.max.apply(null, partnerships);
    console.log(highPartnership);

    // get the highest partnership and strip into sperate overs and ball variables.
    let highestPartnershipDiff = BallDiff.getOverAndBallSeperation(highPartnership);
    let highPartnersipOver = highestPartnershipDiff[0];
    //console.log(ballSumTruncOver);
    let highPartnersipBall = highestPartnershipDiff[1];
    //console.log(ballSumTruncBall);

    if (highPartnersipBall === 6) {
      highPartnership = highPartnersipOver + 1;
    }

    this.setState({
      highestPartnership: highPartnership
    });
  }
  else if (clickFrom === 'addBall') {
    //let currentBall = `${over}.${ball}`


    if (latestPartnership > this.state.highestPartnership) {
      this.setState({
        highestPartnership: latestPartnership
      });
      //let latestPartnershipInt = parseInt(latestPartnership, 10);
      this.setState({
        currentPartnership: latestPartnership
      });
    }
    else {
      //let latestPartnershipInt = parseInt(latestPartnership, 10);
      console.log('current partnershp getting hit?');
      console.log(latestPartnership);
      console.log(this.state.currentPartnership);
      this.setState({
        currentPartnership: latestPartnership
      });
    }

  }

  }

  storeAssociated(associatedWith) {
    this.setState({associatedWith: associatedWith});
  }

  overBowled() {
    console.log('get hit over bowled');
  if (this.state.balls === 6) {
    return <OverBowled ball={this.state.balls} overCount={this.overCount} cancelOver={this.cancelBowledOver} addWicket={this.addWicket} />
    }
  else {
      return <Add className="add-ball-wicket" addBall={this.addBall} removeBall={this.removeBall} stopwatch={this.stopwatch} addWicket={this.addWicket} />
    }
  }

  render() {
    return (
      <div className="App main text-center">
      <div className="container">
      <AdviceBar ball={this.state.balls} storeAssociated={this.storeAssociated} associated={this.state.associatedWith} wickets={this.state.wickets} over={this.state.overs} currentPartnership={this.state.currentPartnership} avgWicket={this.state.avgWicket} highestPartnership={this.state.highestPartnership} wicketBalls={this.state.wicketBalls} partnerships={this.state.partnerships} />
      <Wickets className="Wicket" addWicket={this.addWicket} removeWicket={this.removeWicket} wickets={this.state.wickets} />
      <Overs ball={this.state.balls} over={this.state.overs} addOver={this.addOver} removeOver={this.removeOver} />
      <AdviceUmpire associated={this.state.associatedWith} />
      {this.overBowled()}
      </div>
      </div>
    );
  }
}

export default App;
