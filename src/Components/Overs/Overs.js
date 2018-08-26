import React, { Component } from 'react';
import './Overs.css';
import OverCount from "./OverCount";
import { connect } from "react-redux";
import { addOver } from "../../Actions/index";
/*
Material UI
*/
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import compose from 'recompose/compose';

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
    },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
    marginBottom: 'auto',
    marginTop: 'auto',
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
  overTextStyle: {
    textAlign: 'center',
    fontSize: '2.60rem',
    fontWeight: '400',
    margin: '1% 0 1% 0',
    ['@media (max-height:730px)']: { // eslint-disable-line no-useless-computed-key
      margin: '3% 0 3% 0',
      lineHeight: '0.5',
      fontSize: '0.9rem',
    },
  },
  marginSmall: {
    margin: '1% 0 1% 0',
  },
});

/*
React constants
*/
const mapDispatchToProps = dispatch => {
  return {
    addOver: over => dispatch(addOver(over))
  };
};
const mapStateToProps = state => {
  return { over: state.over.over, ball: state.over.ball };
};

class Overs extends Component {
  constructor(props) {
    super(props);

    this.state = {
          over: 0,
          ball: 0
        };

    this.addOver = this.addOver.bind(this);
    this.removeOver = this.removeOver.bind(this);
    this.addToRedux = this.addToRedux.bind(this);
  }

  addOver() {
    let overs = this.props.over;
    let ball  = this.props.ball;

    overs++;
    this.setState({
      over: overs,
      ball: ball
    }, function () {
      console.log("getting hit, func");
      this.addToRedux();
    });

    console.log("this getting hit?");
    let clickFrom = 'addBall';
    this.props.highestPartnership(this.props.wickets, ball, overs, null, clickFrom);

  }

  removeOver() {
    console.log('remove over?');
    let overs = this.props.over;
    let ball  = this.props.ball;

    if (overs > 0) {
    overs--;
    }
    else {
      //do nothing
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
    this.props.highestPartnership(this.props.wickets, ball, overs, null, clickFrom);



    /*
    let overs = this.state.over;
    overs--;
    this.setState({
      over: overs
    });
    */
  }

addToRedux() {
  const { over, ball } = this.state;
  console.log({over});
  this.props.addOver({ over, ball });
  console.log(this.props.addOver({ over, ball }));
}

componentWillMount() {
  const { over, ball } = this.state;
  console.log(this.props.addOver({ over, ball }));
  this.props.addOver({ over, ball });
}

  render() {
    const { classes } = this.props;
    return (
      <Grid className="" container spacing={12}>
        <Grid item xs={0} sm={3} className="">
        </Grid>
        <Grid item xs={12} sm={3} className="">
            <h2 className={classes.overTextStyle}>OVERS:</h2>
          </Grid>
          <Grid item xs={12} sm={3} justify="center" className={classes.alignCenter}>
            <p className={classes.marginSmall}>
              <IconButton className={classes.button} onClick={this.removeOver}>-</IconButton>
              <OverCount />
              <IconButton className={classes.button} onClick={this.addOver}>+</IconButton>
            </p>
          </Grid>
          <Grid item xs={0} sm={3} className="">
          </Grid>
      </Grid>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
  )(Overs);
