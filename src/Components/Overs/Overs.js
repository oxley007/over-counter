import React, { Component } from 'react';
import './Overs.css';

class Overs extends Component {
  render() {
    return (
      <div className="overs-app">
        <div className="row">
          <div className="col-md-3 offset-md-3 col-sm-6">
            <h2>OVERS:</h2>
          </div>
          <div className="col-md-3 col-sm-6">
            <p className="advice-total"><button className="text-button" onClick={this.props.removeOver}>-</button> {this.props.over}.{this.props.ball} <button className="text-button" onClick={this.props.addOver}>+</button></p>
          </div>
          </div>
          <hr />
      </div>
    );
  }
}

export default Overs;
