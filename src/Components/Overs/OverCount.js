import React, { Component } from 'react';
import { connect } from "react-redux";
import { addOver } from "../../Actions/index";
/*
Material UI
*/
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import compose from 'recompose/compose';

/*
Material UI constants
*/
const styles = theme => ({
  adviceTotal: {
    fontSize: '2.85rem',
    margin: '0',
    ['@media (max-height:740px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '2.60rem',
    },
  },
});

/*
Redux Constants
*/
const mapStateToProps = state => {
  return { over: state.over.over, ball: state.over.ball };
};

class OverCount extends Component {

  render() {
    const { classes } = this.props;
    return (
      <span className={classes.adviceTotal}>
        {this.props.over}.{this.props.ball}
      </span>
    );
  }
}


export default compose(
  withStyles(styles),
  connect(mapStateToProps)
  )(OverCount);
