import React, { Component } from 'react';
import Add from './Add.js';
import OverBowled from '../OverBowled/OverBowled.js';
import { connect } from "react-redux";
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
    console.log('get hit over bowled');
    console.log(this.props.ball);
  if (this.props.ball === 6) {
    return <OverBowled cancelOver={this.props.cancelBowledOver} />
    }
  else {
      return <Add className="add-ball-wicket" removeBall={this.props.removeBall} wickets={this.props.wickets} highestPartnership={this.props.highestPartnership} averagePartnerhsip={this.props.averagePartnerhsip} addWicket={this.props.addWicket}/>
    }
  }

  render() {
    return (
      <div className="addball-app">
        {this.overBowled()}
      </div>
    );
  }
}

export default connect(mapStateToProps)(AddBall);
