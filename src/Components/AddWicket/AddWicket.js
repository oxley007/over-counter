import React, { Component } from 'react';
/*
Material UI imports
*/
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
/*
Material UI constants
*/
const styles = theme => ({
button: {
  margin: theme.spacing.unit,
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: '#fff',
    color: '#c471ed',
  },
  '&:active': {
    backgroundColor: '#f64f59',
},
},
buttonFontSmall: {
  fontSize: '1rem',
},
});

class AddWickets extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className="">
        <Button variant="outlined" color="secondary" mini onClick={this.props.addWicket} className={classes.button}>
           W+
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(AddWickets);
