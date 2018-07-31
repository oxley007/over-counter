import React, { Component } from 'react';
import WicketsDisplay from './WicketsDisplay';

class Wickets extends Component {

  render() {
    return (
      <div className="App">
      <div className="row">
        <div className="col-9">
          <h5 className="advice-title text-left">Wickets:</h5>
          <p className="advice-advice text-left">Total wickets in this innings.</p>
        </div>
        <div className="col-3 advice-total-div">
          <p className="advice-total">
          <button className="text-button" onClick={this.props.removeWicket}>-</button>
          <WicketsDisplay wickets={this.props.wickets} />
          <button className="text-button" onClick={this.props.addWicket}>+</button></p>
        </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default Wickets;
