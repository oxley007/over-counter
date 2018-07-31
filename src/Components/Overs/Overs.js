import React, { Component } from 'react';
import './Overs.css';
import OverCount from "./OverCount";
import { connect } from "react-redux";
import { addOver } from "../../Actions/index";
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
    let overs = this.state.over;
    overs--;
    this.setState({
      over: overs
    });
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
    return (
      <div className="overs-app">
        <div className="row">
          <div className="col-md-3 offset-md-3 col-sm-6">
            <h2>OVERS:</h2>
          </div>
          <div className="col-md-3 col-sm-6">
            <p className="advice-total">
              <button className="text-button" onClick={this.removeOver}>-</button>
              <OverCount />
              <button className="text-button" onClick={this.addOver}>+</button>
            </p>
          </div>
          </div>
          <hr />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overs);
