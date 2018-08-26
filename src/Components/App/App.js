import React, {
  Component
} from 'react';
//import './App.css';
import Ball from '../Ball/Ball.js';
import Add from '../Add/Add.js';
import AddBall from '../Add/AddBall.js';
import Overs from '../Overs/Overs.js';
import OverBowled from '../OverBowled/OverBowled.js';
import Wickets from '../Wickets/Wickets.js';
import AddWicket from '../AddWicket/AddWicket.js';
import AverageWicket from '../AverageWicket/AverageWicket.js';
import AdviceBar from '../AdviceBar/AdviceBar.js';
import AdviceUmpire from '../AdviceUmpire/AdviceUmpire.js';
import BallCalc from '../../Util/BallCalc.js';
import BallDiff from '../../Util/BallDiff.js';
import Header from '../Header/Header.js';

/*
Redux imports
*/
import { connect } from "react-redux";
import { addOver } from "../../Actions/index";
import { addStopwatch } from "../../Actions/index";


/*
Material UI
*/
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import compose from 'recompose/compose';

/*
Redux constants*/
const mapDispatchToProps = dispatch => {
  return {
    addStopwatch: stopwatch => dispatch(addStopwatch(stopwatch)),
    addOver: over => dispatch(addOver(over))
  };
};
const mapStateToProps = state => {
  return { over: state.over.over, ball: state.over.ball };
};

/*
Material UI constants
*/
const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
  },
  containerMargin: {
    paddingRight: '5%',
    paddingLeft: '5%',
  },
  headerColor: {
    backgroundColor: '#00b2ff',
  },
  mainApp: {
    overflow: 'hidden',
    backgroundColor: '#12c2e9',
    backgroundImage: 'linear-gradient(to bottom right, #12c2e9 20%, #c471ed, #f64f59 110%)',
    //backgroundImage: 'linear-gradient(135.92deg,#12c2e9 0%,#c471ed 24.66%,#f64f59)',
    //backgroundImage: 'linear-gradient(135.92deg,#f64f59 0%,#c471ed 24.66%,#12c2e9)',
    /*, original three colours #12c2e9, #c471ed, #f64f59 */
    height: '100vh',
    color: '#fff',
    //fontFamily: "'Source Sans Pro', sans-serif",
    ['@media (max-width:374px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '0.7rem',
    },
  },
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
          wickets: 0,
          wicketBalls: [],
          avgWicket: 0,
          highestPartnership: 0,
          partnerships: [],
          associatedWith: '',
          currentPartnership: 0,
          resetDisplay: 0,
          lastClearedIncrementer: null
        };

    this.baseState = this.state;
    this.incrementer = null;

    this.addBall = this.addBall.bind(this);
    this.removeBall = this.removeBall.bind(this);
    this.cancelBowledOver = this.cancelBowledOver.bind(this);
    this.addOver = this.addOver.bind(this);
    this.removeOver = this.removeOver.bind(this);
    this.addWicket = this.addWicket.bind(this);
    this.removeWicket = this.removeWicket.bind(this);
    this.averagePartnerhsip = this.averagePartnerhsip.bind(this);
    this.highestPartnership = this.highestPartnership.bind(this);
    this.storeAssociated = this.storeAssociated.bind(this);
    this.overBowled = this.overBowled.bind(this);
    this.resetDisplaySet = this.resetDisplaySet.bind(this);
    this.resetBuilder = this.resetBuilder.bind(this);
    this.displaySet = this.displaySet.bind(this);


  }

    resetBuilder() {
      let resetDisplay = 0;
      this.setState({resetDisplay: resetDisplay});
        this.setState(this.baseState);

        //let over = this.props.over;
        //let ball = this.props.ball;
        let over = 0;
        let ball = 0;
        this.props.addOver({ over, ball });
        console.log(this.props.addOver({ over, ball }));

        /*
        clearInterval(this.incrementer);
        this.setState({
          lastClearedIncrementer: this.incrementer
        }, function () {
          const { lastClearedIncrementer } = this.state;
          console.log({lastClearedIncrementer});
          this.props.addStopwatch({ lastClearedIncrementer });
          console.log(this.props.addStopwatch({ lastClearedIncrementer }));
        });
        */


        //clearInterval(this.incrementer);


        let lastClearedIncrementer = null;
        let secondsElapsed = 0;
        let laps = [];
        this.props.addStopwatch({ lastClearedIncrementer, laps, secondsElapsed });
        console.log(this.props.addStopwatch({ lastClearedIncrementer, laps, secondsElapsed }));


        //let secondsElapsed = 0;
        //let laps = [];
        //this.props.secondsElapsed = secondsElapsed;
        //this.props.laps = laps;
        //this.props.lastClearedIncrementer = lastClearedIncrementer;
        //this.props.addStopwatch({ secondsElapsed, laps });
        //console.log(this.props.addStopwatch({ secondsElapsed, laps }));



    /*    handleStopClick() {
    clearInterval(this.incrementer);
    this.setState({
      lastClearedIncrementer: this.incrementer
    });
  }*/
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
    let over = this.props.over;
    let ball = this.props.ball;
    let wicketBall = `${over}.${ball}`;
    console.log(wicketBall);
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
    console.log(wickets);
    if (wickets > 1) {
      console.log(wickets + '= total wickets');
    quotient = Math.floor(totalBalls/wickets);
    }
    else {
    quotient = 0;
    }

    console.log(quotient);

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


    console.log(wickets);
    console.log(ball);
    console.log(over);
    console.log(wicketBall);
    console.log(clickFrom);

    //workout the balls between each wicket
    //the first wicket is just the over so far

    let highestPartnership;
    let latestPartnership;
    let partnershipBall;
    let partnershipOver;
    console.log(this.state.partnerships);
    let partnerships = this.state.partnerships.slice();
    console.log(partnerships);
    let wicketBalls = this.state.wicketBalls;
    console.log(wicketBalls);
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
      if (latestPartnership < 0) {
        console.log(wicketBalls);
        wicketBalls.pop();
        console.log(wicketBalls);
        console.log(latestPartnership);
        latestPartnership = 0;
        let currentBallOver = `${over}.${ball}`;
        console.log(currentBallOver);
        wicketBalls.push(currentBallOver);
        this.setState({wicketBalls: wicketBalls});
        console.log(wicketBalls);


        this.setState({
          currentPartnership: latestPartnership
        });
      }
      else {
      this.setState({
        currentPartnership: latestPartnership
      });
    }
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
      return <Add className="add-ball-wicket" addBall={this.addBall} removeBall={this.removeBall} stopwatch={this.stopwatch} addWicket={this.addWicket} wicket={this.state.wickets} highestPartnership={this.highestPartnership}/>
    }
  }

  resetDisplaySet() {
    let resetDisplay = 1;
    this.setState({resetDisplay: resetDisplay});
  }

  displaySet() {
    let resetDisplay = 0;
    this.setState({resetDisplay: resetDisplay});
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainApp}>
        <Header className={classes.headerColor} resetDisplay={this.state.resetDisplay} resetDisplaySet={this.resetDisplaySet} resetBuilder={this.resetBuilder} displayHeader={this.displaySet} />
        <AdviceBar ball={this.state.balls} storeAssociated={this.storeAssociated} associated={this.state.associatedWith} wickets={this.state.wickets} over={this.state.overs} currentPartnership={this.state.currentPartnership} avgWicket={this.state.avgWicket} highestPartnership={this.state.highestPartnership} wicketBalls={this.state.wicketBalls} partnerships={this.state.partnerships} />

      <Grid className={classes.containerMargin} container spacing={12}>
          <Grid item xs={12}>
            <Wickets className="Wicket" removeWicket={this.removeWicket} wickets={this.state.wickets} addWicket={this.addWicket} />
            <Overs  addOver={this.addOver} removeOver={this.removeOver} highestPartnership={this.highestPartnership} wickets={this.state.wickets} />

            <AddBall overCount={this.overCount} cancelOver={this.cancelBowledOver} emoveBall={this.removeBall} highestPartnership={this.highestPartnership} averagePartnerhsip={this.averagePartnerhsip} addWicket={this.addWicket} wickets={this.state.wickets} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
  )(App);
