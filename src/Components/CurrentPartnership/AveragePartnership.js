import React, { Component } from 'react';
/*
Material UI
*/
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import compose from 'recompose/compose';
/*
Redux imports
*/
import { addOver } from "../../Actions/index";
import { connect } from "react-redux";
/*
Redux constants
*/
const mapDispatchToProps = dispatch => {
  return {
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
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`,
    borderTopWidth: '0.5px !important',
    width: '100%',
    marginTop: '15px !important',
    borderTop: '1px solid #fff',
  },
  alignCenter: {
    textAlign: 'center',
    marginTop: 'auto',
  },
  adviceTotal: {
    fontSize: '2.85rem',
    lineHeight: '1',
    marginBottom: 'auto',
    marginTop: 'auto',
    ['@media (max-height:740px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '2.2rem',
    },
  },
  adviceTotalTen: {
    fontSize: '2.1rem',
    lineHeight: '1',
    marginBottom: 'auto',
    marginTop: 'auto',
    ['@media (max-height:740px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '2.0rem',
    },
  },
  oversSubhead: {
    fontSize: '0.95rem',
  },
  adviceHeadings: {
    fontSize: '1.35rem',
    fontWeight: '400',
    marginTop: '0',
    marginBottom: '3%',
    ['@media (max-height:740px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '1.1rem',
    },
  },
  adviceSubText: {
    color: '#eee',
    opacity: '0.8',
    marginBottom: '0.1%',
    marginTop: '0.4%',
  },
  containerMargin: {
    paddingRight: '5%',
    paddingLeft: '5%',
  },
  adviceTotalTwoDecimal: {
    fontSize: '2.1rem',
    lineHeight: '1',
    marginBottom: '0.3rem',
    marginTop: '0.4rem',
    ['@media (max-height:740px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '2.2rem',
    },
  },
});

class currentPartnership extends Component {
  constructor(props) {
    super(props);

      this.state = {
            over: 0,
            ball: 0
          };

    this.currentPartnershipDisplay = this.currentPartnershipDisplay.bind(this);
  }

currentPartnershipDisplay() {
  console.log(this.props.over);
  console.log(this.props.ball);
  console.log(this.props.wickets);
  console.log(this.props.averagePartnership);
  const { classes } = this.props;
  if (this.props.averagePartnership < 10 && this.props.wickets > 1) {
    let avgPartnership = this.props.averagePartnership
    let remainderAvg = avgPartnership % 1;
    console.log(remainderAvg);
    remainderAvg *= 10;
    console.log(remainderAvg);
    let remainderAvgSecondDecimal = remainderAvg % 1;
    console.log(remainderAvgSecondDecimal);
    remainderAvgSecondDecimal *= 10;
    console.log(remainderAvgSecondDecimal);
    let decimalRound = Math.round(remainderAvgSecondDecimal * 100) / 100;
    console.log(decimalRound);
    if (decimalRound === 5) {
      return (
    <p className={classes.adviceTotalTwoDecimal}>{this.props.averagePartnership}</p>
      )
    }
    else {
    return (
  <p className={classes.adviceTotal}>{this.props.averagePartnership}</p>
    )
  }
  }
  else if (this.props.averagePartnership >= 10 && this.props.wickets > 1) {
    return (
  <p className={classes.adviceTotalTen}>{this.props.averagePartnership}</p>
  )
  }
  else if (this.props.averagePartnership < 10 && this.props.wickets === 0) {
    return (
    <p className={classes.adviceTotal}>~</p>
  )
  }
  else if (this.props.averagePartnership < 10 && this.props.wickets <= 1) {
    return (
    <p className={classes.adviceTotal}>{this.props.over}.{this.props.ball}</p>
  )
  }
  else if (this.props.averagePartnership >= 10 && this.props.wickets <= 1) {
    return (
    <p className={classes.adviceTotalTen}>{this.props.over}.{this.props.ball}</p>
  )
  }
}
  render() {
    const { classes } = this.props;
    return (
      <Grid className={classes.containerMargin} container spacing={12}>
        <Grid item xs={10}>
              <h3 className={classes.adviceHeadings}>Average Partnership:</h3>
              <p className={classes.adviceSubText}>Average partnership for the innings</p>
            </Grid>
          <Grid item xs={2} className={classes.alignCenter}>
            {this.currentPartnershipDisplay()}
            <span className={classes.oversSubhead}>overs</span>
          </Grid>
          <Divider className={classes.divider} />
      </Grid>
    );
  }
}

/*
<p className={classes.adviceSubText}>{this.props.avgAdvice}</p>
*/
export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
  )(currentPartnership);
