import React, { Component } from 'react';
import Stopwatch from './Stopwatch';
import AvgSecondsDisplay from './AvgSecondsDisplay';
import Reset from './Reset';

/*
Redux imports
*/
import { connect } from "react-redux";
import { addStopwatch } from "../../Actions/index";
import { addOver } from "../../Actions/index";

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
Redux Constants
*/
const mapDispatchToProps = dispatch => {
  return {
    addStopwatch: stopwatch => dispatch(addStopwatch(stopwatch))
  };
};
const mapStateToProps = state => {
  return {  };
};

/*
Material UI constants
*/
const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
    justifyContent: 'center',
  },
  containerMargin: {
    paddingRight: '5%',
    paddingLeft: '5%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  headerColor: {
    backgroundColor: '#00b2ff',
  },
  verticalAlign: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  verticalAlignText: {
    marginTop: 'auto',
    marginBottom: 'auto',
    lineHeight: '0.85',
  },
  avgText: {
    margin: '0 0 10px 0',
    textAlign: 'center',
    fontSize: '0.8rem',
  }
});

class Header extends Component {
  constructor(props) {
    super(props);
      this.state = {
        secondsElapsed: 0,
        laps: [],
        lastClearedIncrementer: null,
        avgBall: [],
        avgSeconds: 0,
        over: 0,
        ball: 0
      };


    this.incrementer = null;

    this.headerDisplay = this.headerDisplay.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.stopwatch = this.stopwatch.bind(this);


  }


  componentWillMount() {
    const { secondsElapsed, laps, lastClearedIncrementer, avgBall, avgSeconds } = this.state;
    //console.log(this.props.addStopwatch({ secondsElapsed, laps, lastClearedIncrementer }));
    this.props.addStopwatch({ secondsElapsed, laps, lastClearedIncrementer,avgBall, avgSeconds });
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
      //console.log({secondsElapsed, laps});
      this.props.addStopwatch({ secondsElapsed, laps });
      //console.log(this.props.addStopwatch({ secondsElapsed, laps }));
    });

    /*
    Then start the timer
    */


      this.incrementer = setInterval( () =>
          this.setState({
            secondsElapsed: this.state.secondsElapsed + 1
          },  function () {
            const { secondsElapsed } = this.state;
            //console.log({secondsElapsed });
            this.props.addStopwatch({ secondsElapsed });
            //console.log(this.props.addStopwatch({ secondsElapsed }));
          })
        , 1000);


  }

  handleStopClick() {
      clearInterval(this.incrementer);
      this.setState({
        lastClearedIncrementer: this.incrementer
      }, function () {
        const { secondsElapsed, laps, lastClearedIncrementer, avgBall, avgSeconds } = this.state;
        //console.log({secondsElapsed, laps, lastClearedIncrementer});
        this.props.addStopwatch({ secondsElapsed, laps, lastClearedIncrementer, avgBall, avgSeconds });
        //console.log(this.props.addStopwatch({ secondsElapsed, laps, lastClearedIncrementer }))
      });
    }



  headerDisplay() {
    const { classes } = this.props;
    if (this.props.resetDisplay === 0) {
    return (
        <Grid container spacing={12} vertical-align="center" className="advice-select-app">
          <Grid item xs={8} className={classes.verticalAlign}>
    <Button variant="contained" color="secondary" onClick={this.props.resetDisplaySet} className={classes.button}>Reset</Button>
  </Grid>
  <Grid item xs={4} className={classes.verticalAlign}>
    <Grid container spacing={12} vertical-align="center" className="advice-select-app">
      <Grid item xs={9} className={classes.verticalAlign}>
        <Stopwatch />
        <AvgSecondsDisplay />
      </Grid>
      <Grid item xs={3} className={classes.verticalAlignText}>
      <span>since last ball</span>
      </Grid>

      </Grid>
  </Grid>
    </Grid>

    )
  }
  else {
    return (
        <Grid container spacing={12} className="advice-select-app">
          <Grid item xs={4}>
      <p>Are you sure?</p>
      </Grid>
      <Grid item xs={4}>
        <Reset resetBuilder={this.props.resetBuilder}/>
    </Grid>
      <Grid item xs={4}>
      <Button onClick={this.props.displayHeader} variant="outlined" className={classes.button}>Cancel</Button>
      </Grid>
    </Grid>
    )
  }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.headerColor}>
        <Grid className={classes.containerMargin} container spacing={12}>
          <Grid item xs={12}>

          {this.headerDisplay()}
        </Grid>
      </Grid>

      </div>
    );
  }
}
export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
  )(Header);
