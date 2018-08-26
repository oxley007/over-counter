import React, { Component } from 'react';
/*
Material UI
*/
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

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
    ['@media (max-height:740px)']:  { // eslint-disable-line no-useless-computed-key
      fontSize: '2.0rem',
    },
  },
  oversSubhead: {
    fontSize: '0.95rem',
  },
  adviceHeadings: {
    fontSize: '1.35rem',
    fontWeight: '400',
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
});

class currentPartnership extends Component {
  constructor(props) {
    super(props);

    this.currentPartnershipDisplay = this.currentPartnershipDisplay.bind(this);
  }

currentPartnershipDisplay() {
  const { classes } = this.props;
  if (this.props.currentPartnership < 10) {
    return (
  <p className={classes.adviceTotal}>{this.props.currentPartnership}</p>
  )
  }
  else {
    return (
  <p className={classes.adviceTotalTen}>{this.props.currentPartnership}</p>
  )
  }
}
  render() {
    const { classes } = this.props;
    return (
      <Grid className={classes.containerMargin} container spacing={12}>
        <Grid item xs={10}>
              <h3 className={classes.adviceHeadings}>Current Partnership:</h3>
              <p className={classes.adviceSubText}>The current partnership in overs</p>
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

export default withStyles(styles)(currentPartnership);
