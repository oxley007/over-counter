import React, { Component } from 'react';
import './AverageWicket.css';

class AverageWicket extends Component {
  constructor(props) {
    super(props);

    this.handleAssociatedButton = this.handleAssociatedButton.bind(this);
    this.overOneWicket = this.overOneWicket.bind(this);
  }


    overOneWicket() {

      if ((this.props.ball === 5 || this.props.ball === 6) && this.props.wickets > 0) {
        return (
          <p>Average partnership: {this.props.avgWicket} overs</p>
        )
        }
      else if ((this.props.ball === 3 || this.props.ball === 4) && this.props.wickets > 0) {
        return (
        <p>Fall of wickets (overs): {this.props.wicketBalls.join(", ")}</p>
      )
      }
      else if ((this.props.ball === 1 || this.props.ball === 2) && this.props.wickets > 0) {
        return (
        <p>Longest partnership: {this.props.highestPartnership} overs</p>
      )
      }
      else {
      return <p>Current Partnership: {this.props.currentPartnership}</p>
    }
  }

  handleAssociatedButton(e) {
    let associatedWith = e.target.value;
    console.log(associatedWith);
    this.props.storeAssociated(associatedWith);
  }

  render() {
    return (
      <div className="App">
      {this.overOneWicket()}
      </div>
    );
  }
}

export default AverageWicket;
