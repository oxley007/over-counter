import React, { Component } from 'react';
import Ball from '../Ball/Ball.js';
import BallRemove from '../BallRemove/BallRemove.js';
import AddWicket from '../AddWicket/AddWicket.js';

class Add extends Component {
  render() {
    return (
      <div className="row fixed-bottom advice-select-app">
      <div className="ball-remove col-4">
      <BallRemove className="Ball-remove" removeBall={this.props.removeBall} stopwatch={this.props.stopwatch} />
      </div>
      <div className="ball-add col-4">
      <Ball className="Ball" addBall={this.props.addBall} stopwatch={this.props.stopwatch} />
      </div>
      <div className="ball-wicket col-4">
      <AddWicket className="Wicket" addWicket={this.props.addWicket} />
      </div>
      </div>
    );
  }
}

export default Add;
