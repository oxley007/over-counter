import React, { Component } from 'react';

class WicketsDisplay extends Component {


  render() {
    console.log(this.props.wickets);
    return (
      <span className="overs-app">
        {this.props.wickets}
      </span>
    );
  }
}

export default WicketsDisplay;
