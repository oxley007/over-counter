import React, { Component } from 'react';
import './OverBowled.css';
import AddWicket from '../AddWicket/AddWicket.js';

class OverBowled extends Component {
  constructor(props) {
    super(props);

    this.overBowled = this.overBowled.bind(this);
  }


    overBowled() {

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
          <button className="ok-button-over btn btn-default btn-circle btn-lg" onClick={this.props.overCount}>ok</button>
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

export default OverBowled;
