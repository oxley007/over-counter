import React, { Component } from 'react';
import './OverBowled.css';
import AddWicket from '../AddWicket/AddWicket.js';
import { addOver } from "../../Actions/index";
import { connect } from "react-redux";
const mapDispatchToProps = dispatch => {
  return {
    addOver: over => dispatch(addOver(over))
  };
};
const mapStateToProps = state => {
  return { over: state.over.over, ball: state.over.ball };
};


class OverBowled extends Component {
  constructor(props) {
    super(props);

    this.state = {
          over: 0,
          ball: 0
        };

    this.overBowled = this.overBowled.bind(this);
    this.overCount = this.overCount.bind(this);

  }

  overCount() {
    let overs = this.props.over;
    console.log(this.props.over);
    let balls = this.props.ball;
    console.log(this.props.ball);
    balls = 0;
    overs++;

    this.setState({
      ball: balls,
      over: overs
    }, function () {
      const { over, ball } = this.state;
      this.props.addOver({ over, ball });
      console.log(this.props.addOver({ over, ball }));
    });
  }

    overBowled() {
      console.log(this.props.ball );
      if (this.props.ball === 6) {
        return (
          <div className="over-bowled-app fixed-bottom advice-select-app">
          <div className="row">
          <div className="col-12">
          <h2>Over bowled</h2>
          </div>
          </div>
          <div className="row">
          <div className="col-4">
          <div className="div-bottom-content display-right">
          <button className="ok-button-over btn-circle" onClick={this.props.cancelOver}>-</button>
          </div>
          </div>
          <div className="col-4">
          <button className="ok-button-over btn btn-default btn-circle btn-lg" onClick={this.overCount}>ok</button>
          </div>
          <div className="ball-wicket col-4">
          <AddWicket className="Wicket" addWicket={this.props.addWicket} />
          </div>
          </div>
          </div>
        )

      }
      else {
      return <p></p>
    }

    }

  render() {
    return (
      <div className="over-bowled-app">
      {this.overBowled()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OverBowled);
