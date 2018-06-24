import React, { Component } from 'react';
import './AddWicket.css';

class AddWickets extends Component {
  render() {
    return (
      <div className="wicket-app div-bottom-content">
      <button className="btn-sm btn-wicket" onClick={this.props.addWicket}>W+</button>
      </div>
    );
  }
}

export default AddWickets;
