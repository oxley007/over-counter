import React, { Component } from 'react';
import WicketsDisplay from './WicketsDisplay';
/*
Material UI
*/
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

/*
Material UI constants
*/
const styles = theme => ({
  button: {
      margin: theme.spacing.unit,
      color: '#fff',
      margin: '0',
      fontSize: '1.20rem',
      verticalAlign: 'top',
      width: '10px !important',
      ['@media (max-width:350px)']: { // eslint-disable-line no-useless-computed-key
        paddingBottom: '1rem',
      },
    },
    buttonTen: {
        margin: theme.spacing.unit,
        color: '#fff',
        margin: '0',
        fontSize: '1.20rem',
        verticalAlign: 'top',
        width: '10px !important',
        height: '10px',
        margin: '0 5px 10px 5px',
        ['@media (max-width:350px)']: { // eslint-disable-line no-useless-computed-key
          paddingBottom: '1rem',
        },
      },
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
    ['@media (max-height:740px)']: { // eslint-disable-line no-useless-computed-key
      marginTop: '8px !important',
    },
  },
  alignCenter: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
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
    lineHeight: '0',
  },
});

class Wickets extends Component {
  constructor(props) {
    super(props);

    this.wicketDisplay = this.wicketDisplay.bind(this);
  }

wicketDisplay() {
  console.log(this.props.wickets);
  const { classes } = this.props;
  if (this.props.wickets < 10) {
    return (
    <span>
    <IconButton className={classes.button} onClick={this.props.removeWicket}>-</IconButton>
    <WicketsDisplay wickets={this.props.wickets} />
    <IconButton className={classes.button} onClick={this.props.addWicket}>+</IconButton>
    </span>
  )
  }
  else {
    return (
    <span>
    <WicketsDisplay wickets={this.props.wickets} />
    <IconButton className={classes.buttonTen} onClick={this.props.removeWicket}>-</IconButton>
    <IconButton className={classes.buttonTen} onClick={this.props.addWicket}>+</IconButton>
    </span>
  )
  }

}

  render() {
    const { classes } = this.props;
    return (
      <Grid className="" container spacing={12}>
        <Grid item xs={10}>
          <h3 className={classes.adviceHeadings}>Wickets:</h3>
          <p className={classes.adviceSubText}>Total wickets in this innings.</p>
        </Grid>
        <Grid item xs={2} className={classes.alignCenter}>
          <p className={classes.alignCenter}>
          {this.wicketDisplay()}
          </p>
        </Grid>
        <Divider className={classes.divider} />
      </Grid>
    );
  }
}

export default withStyles(styles)(Wickets);
