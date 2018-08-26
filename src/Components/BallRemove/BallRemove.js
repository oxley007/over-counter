import React, { Component } from 'react';
/*
Redux imports*/
import { connect } from "react-redux";
import { addOver } from "../../Actions/index";
/*
Material UI imports
*/
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import RemoveIcon from '@material-ui/icons/Remove';
import compose from 'recompose/compose';
/*
Material UI constants
*/
const styles = theme => ({
button: {
  margin: theme.spacing.unit,
  backgroundColor: '#fff',
  color: '#c471ed',
  '&:hover': {
    backgroundColor: '#fff',
    color: '#c471ed',
  },
  '&:active': {
    backgroundColor: '#f64f59',
    color: '#fff',
},
},
buttonFontSmall: {
  fontSize: '1rem',
},
});

/*
Redux Constants
*/
const mapDispatchToProps = dispatch => {
  return {
    addOver: over => dispatch(addOver(over))
  };
};
const mapStateToProps = state => {
  return { over: state.over.over, ball: state.over.ball };
};


class BallRemove extends Component {
  constructor(props) {
    super(props);

    this.state = {
          over: 0,
          ball: 0
        };

    this.removeBall = this.removeBall.bind(this);
    this.addToRedux = this.addToRedux.bind(this);

  }

removeBall() {
  console.log('remove over?');
  console.log(this.props.over);
  console.log(this.props.ball);
  console.log(this.props.wickets);
  let overs = this.props.over;
  let ball  = this.props.ball;

  if (ball > 0) {
  ball--;
  }
  else if (ball === 0 && overs >= 1) {
    overs--;
    ball = 6;
  }
  this.setState({
    over: overs,
    ball: ball
  }, function () {
    console.log("getting hit, remove over");
    this.addToRedux();
  });

  console.log("this getting hit?");
  let clickFrom = 'addBall';
  console.log(this.props.wickets);
  console.log(ball);
  console.log(overs);
  console.log(clickFrom);
  this.props.highestPartnership(this.props.wickets, ball, overs, null, clickFrom);

}

addToRedux() {
  const { over, ball } = this.state;
  console.log({over});
  this.props.addOver({ over, ball });
  console.log(this.props.addOver({ over, ball }));
}



  render() {
    const { classes } = this.props;
    return (
        <div className="">
            <Button variant="fab" mini color="primary" aria-label="Remove" className={classes.button} onClick={this.removeBall}>
          <RemoveIcon className={classes.buttonFontSmall} />
        </Button>
        </div>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
  )(BallRemove);
