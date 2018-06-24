import React, { Component } from 'react';

class currentPartnership extends Component {
  render() {
    return (
        <div className="currentPartnership-app">
          <div className="row">
            <div className="col-9">
              <h5 className="advice-title text-left">Current Partnership:</h5>
              <p className="advice-advice text-left">{this.props.avgAdvice}</p>
            </div>
          <div className="col-3 advice-total-div">
            <p className="advice-total">{this.props.currentPartnership}</p>
            <span className="overs-subhead">overs</span>
          </div>
        </div>
          <hr />
      </div>
    );
  }
}

export default currentPartnership;
