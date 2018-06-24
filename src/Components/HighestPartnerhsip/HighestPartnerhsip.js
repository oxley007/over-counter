import React, { Component } from 'react';

class HighestPartnerhsip extends Component {
  render() {
    return (
        <div className="highestPartnership-app">
          <div className="row">
            <div className="col-9">
              <h5 className="advice-title text-left">Highest Partnership</h5>
              <p className="advice-advice text-left">{this.props.highAdvice}</p>
            </div>
              <div className="col-3 partnership-total-div">
                <p className="advice-total">{this.props.highestPartnership}</p>
                <span className="overs-subhead">overs</span>
              </div>
          </div>
          <hr />
        </div>
    );
  }
}

export default HighestPartnerhsip;
