import React, { Component } from 'react';
/*
Material UI
*/
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
/*
Material UI constants
*/
const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
  },
  hideSmall: {
    ['@media (max-width:374px)']: { // eslint-disable-line no-useless-computed-key
      display: 'none',
    },
  }
});

class AdviceUmpire extends Component {
  constructor(props) {
    super(props);

    this.umpireAdvice = this.umpireAdvice.bind(this);
  }

umpireAdvice() {

  let randomAdive = Math.floor(Math.random()*7);
  let randomBattingBowling = Math.floor(Math.random()*7);
  if ((this.props.associated === 'batting' || this.props.associated === 'bowling') && randomBattingBowling < 2) {
    if (this.props.associated === 'batting')
    {
      let randomBowling = Math.floor(Math.random()*2);
      if (randomBowling === 0)
      {
        randomAdive = 7;
      }
      else {
        randomAdive = 8;
    }
  }
}
    if (this.props.associated === 'bowling')
    {
      let randomBowling = Math.floor(Math.random()*2);
      if (randomBowling === 0)
      {
        randomAdive = 9;
      }
      else {
        randomAdive = 10;
      }
    }
  console.log(randomAdive);
  switch (randomAdive) {
  case 0:
    return <p>LBW advice: watch the next few balls closely and take note if the ball is bouncing over the hight of the stumps</p>
    break;
  case 1:
    return <p>LBW advice: take note how far or how close the batter is standing to the stumps. </p>
    break;
  case 2:
    return <p>LBW advice: take note of the batters height. Where do the knee-rolls match up with the stumps?</p>
    break;
  case 3:
    return <p>No ball advice: are you watching the front foot?</p>
    break;
  case 4:
    return <p>Wide advice: do you have a good indication of where the off-side and leg-side wide markers are?</p>
    break;
  case 5:
    return <p>One-short advice: make sure you watch the batsman when running between the wickets to make sure they pass the crease.</p>
    break;
  case 6:
    return <p>Runout advice: are you moving square of the wickets for tight runs to best judge a runout?</p>
    break;
  case 7:
    return <p>Running advice: is the non-striker backing-up when the ball is bowled?</p>
    break;
  case 8:
    return <p>Running advice: are the batsman calling loudly. This includes “waiting” to see if the fielder will get to the ball. </p>
    break;
  case 9:
    return <p>Fielding advice: are the fielders backing up the wicket keeper and bowlers end to stop any over-throws?</p>
    break;
  case 10:
    return <p>Fielding advice: are the fielders walking-in with the bowler?</p>
    break;
  default:
    return <p>No ball advice: are you watching the front foot?</p>
    break;
}
}

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={12} className="advice-select-app">
        <Grid item xs={12} className={classes.hideSmall}>
          {this.umpireAdvice()}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AdviceUmpire);
