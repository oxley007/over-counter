import React, { Component } from 'react';
import Add from './Add.js';
import OverBowled from '../OverBowled/OverBowled.js';
import { connect } from "react-redux";
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
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
  },
  fixedBottom: {
    position: 'fixed',
    right: '0',
    bottom: '1rem',
    left: '0',
    zIndex: '1030',
  }
});

/*
Redux Constants
*/
const mapStateToProps = state => {
  return { over: state.over.over, ball: state.over.ball };
};

class AddBall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      over: 0,
      ball: 0
    };

    this.overBowled = this.overBowled.bind(this);
  }

  overBowled() {
  if (this.props.ball === 6) {
    return <OverBowled cancelOver={this.props.cancelBowledOver} wickets={this.props.wickets} stopwatch={this.props.stopwatch} highestPartnership={this.props.highestPartnership} addWicket={this.props.addWicket} />
    }
  else {
      return <Add className="add-ball-wicket" removeBall={this.props.removeBall} wickets={this.props.wickets} highestPartnership={this.props.highestPartnership} averagePartnerhsip={this.props.averagePartnerhsip} addWicket={this.props.addWicket}/>
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.fixedBottom}>
        {this.overBowled()}
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
  )(AddBall);
