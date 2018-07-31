import React, { Component } from 'react';
import { connect } from "react-redux";
import { addOver } from "../../Actions/index";
const mapStateToProps = state => {
  return { over: state.over.over, ball: state.over.ball };
};

class OverCount extends Component {

  render() {
    console.log(this.props.ball);
    return (
      <span className="overs-app">
        {this.props.over}.{this.props.ball}
      </span>
    );
  }
}

export default connect(mapStateToProps)(OverCount);
