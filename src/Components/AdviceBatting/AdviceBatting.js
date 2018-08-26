import React, { Component } from 'react';
import './AdviceBatting.css';
import CurrentPartnership from '../CurrentPartnership/CurrentPartnership.js';
import AveragePartnership from '../CurrentPartnership/AveragePartnership.js';
import HighestPartnerhsip from '../HighestPartnerhsip/HighestPartnerhsip.js';
import BallDiff from '../../Util/BallDiff.js';
import Advice from '../../Util/Advice.js';
import { connect } from "react-redux";
import { addOver } from "../../Actions/index";
const mapStateToProps = state => {
  return { over: state.over.over, ball: state.over.ball };
};

class AdviceBatting extends Component {
  constructor(props) {
    super(props);

    this.battingAdvice = this.battingAdvice.bind(this);
  }

  battingAdvice() {



    /*
    Get the current partnershp over and the highest partnership overs and calculate the difference
    */

    // get the current partnership and strip into sperate overs and ball variables.
    let currentPartnershipDiff = BallDiff.getOverAndBallSeperation(this.props.currentPartnership);
    let ballSumTruncOver = currentPartnershipDiff[0];
    //console.log(ballSumTruncOver);
    let ballSumTruncBall = currentPartnershipDiff[1];
    //console.log(ballSumTruncBall);

    // get the highest partnership and strip into sperate overs and ball variables.
    let highPartnership = BallDiff.getOverAndBallSeperation(this.props.highestPartnership);
    let highPartnershipSumTruncOver = highPartnership[0];
    //console.log(highPartnershipSumTruncOver);
    let highPartnershipSumTruncBall = highPartnership[1];
    //console.log(highPartnershipSumTruncBall);

    //now that we have variables with seperate ball and over, calculate how many balls there are.
    let partnershipBalls = BallDiff.getpartnershipDiff(ballSumTruncBall, ballSumTruncOver);
    let totalBalls = partnershipBalls[1];
    //console.log(totalBalls);

    //now that we have variables with seperate ball and over, calculate how many balls there are.
    let HighPartnershipBalls = BallDiff.getpartnershipDiff(highPartnershipSumTruncBall, highPartnershipSumTruncOver);
    let partnershipTotalBalls = HighPartnershipBalls[1];
    //console.log(partnershipTotalBalls);

    //calculate the differene in balls between the current partnership and the highest partnership.
    let currentVsHighPartnershipDiffBalls = partnershipTotalBalls - totalBalls;
    //console.log(currentVsHighPartnershipDiffBalls);

    //Take the difference and turn into overs and balls.
    let getpartnershipDiffTotal = BallDiff.getpartnershipDiffTotal(currentVsHighPartnershipDiffBalls);
    let currentVsHighPartnershipDiffOver = getpartnershipDiffTotal[0];
    //console.log(currentVsHighPartnershipDiffOver);
    let currentVsHighPartnershipDiffBall = getpartnershipDiffTotal[1];
    //console.log(currentVsHighPartnershipDiffBall);

    //Turn the overs and balls into a combined string.
    let currentVsHighPartnershipDiff = `${currentVsHighPartnershipDiffOver}.${currentVsHighPartnershipDiffBall}`;
    //console.log(currentVsHighPartnershipDiff);

    //convert the string into a float.
    let currentVsHighPartnership = parseFloat(currentVsHighPartnershipDiff);
    //console.log(currentVsHighPartnership);

    //convert the props into floats so I can compare them in the if statements.
    let avgWicket = parseFloat(this.props.avgWicket);
    let currentPartnership;
    if (this.props.wickets >= 1) {
    currentPartnership = parseFloat(this.props.currentPartnership);
    //console.log(currentPartnership);
    if (isNaN(parseFloat(currentPartnership))) {
    currentPartnership = 0
    }
    else {
      //nothing
    }
    }
    else {
      let stringCurrentPartnershipOver = this.props.over;
      let stringCurrentPartnershipBall = this.props.ball;
      let stringCurrentPartnership = `${stringCurrentPartnershipOver}.${stringCurrentPartnershipBall}`;
      currentPartnership = parseFloat(stringCurrentPartnership);

    }
    let highestPartnership = parseFloat(this.props.highestPartnership);
    let avgWicketPlus1 = avgWicket + 0.3;
    console.log(avgWicketPlus1);

    /*
    methods to decide what advice to display to user.
    */
    let avgAdvice = Advice.getAvgBowlingOrBatting(this.props.over, currentPartnership, avgWicket, this.props.associated, this.props.wickets);
    let highAdvice = Advice.getHighBowlingOrBatting(this.props.over, currentPartnership, avgWicket, this.props.associated, this.props.wickets, highestPartnership, avgWicketPlus1, currentVsHighPartnership)

    if (this.props.wickets === 0) {
      highestPartnership = currentPartnership;
    }
    else {
      //do nothing
    }
    /*
    Return the advice to the user
    */
    return (
      <div>
      <CurrentPartnership currentPartnership={currentPartnership} avgAdvice={avgAdvice}/>
      <AveragePartnership averagePartnership={avgWicket}  wickets={this.props.wickets} />
      <HighestPartnerhsip highestPartnership={highestPartnership} highAdvice={highAdvice}/>
      </div>

    )
  }

  render() {
    return (
      <div>
      {this.battingAdvice()}
      </div>
    );
  }
}

export default connect(mapStateToProps)(AdviceBatting);
