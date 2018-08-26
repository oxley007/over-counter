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
  adviceTotal: {
    fontSize: '2.85rem',
    lineHeight: '1',
    marginBottom: 'auto',
    marginTop: 'auto',
    marginRight: '5px',
    marginLeft: '5px',
    ['@media (max-height:740px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '2.2rem',
      marginRight: '2px',
      marginLeft: '2px',
    },
  },

});

class WicketsDisplay extends Component {
  render() {
    const { classes } = this.props;
    return (
      <span className={classes.adviceTotal}>
        {this.props.wickets}
      </span>
    );
  }
}

export default withStyles(styles)(WicketsDisplay);
