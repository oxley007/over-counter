import React, { Component } from 'react';
import './AdviceBar.css';
import AdviceSelect from '../AdviceSelect/AdviceSelect.js';
import AdviceBatting from '../AdviceBatting/AdviceBatting.js';

class AdviceBar extends Component {
  constructor(props) {
    super(props);

    this.adviceDisplay = this.adviceDisplay.bind(this);
    this.handleAssociatedButton = this.handleAssociatedButton.bind(this);
  }


    adviceDisplay() {

 if (!this.props.associated) {
        return (
          <AdviceSelect handleAssociatedButton={this.handleAssociatedButton} />
        )
      }
    else {
      return (
        <AdviceBatting associated={this.props.associated} wickets={this.props.wickets} currentPartnership={this.props.currentPartnership} avgWicket={this.props.avgWicket} highestPartnership={this.props.highestPartnership} wicketBalls={this.props.wicketBalls} partnerships={this.props.partnerships} secondsElapsed={this.props.secondsElapsed} />
      )
    }
  }

  handleAssociatedButton(associatedWith) {
    console.log('hit!!!');
    //let associatedWith = e.target.value;
    console.log(associatedWith);
    this.props.storeAssociated(associatedWith);
  }

  render() {
    return (
      <div className="advice-bar-app">
      <AdviceBatting associated={this.props.associated} wickets={this.props.wickets} currentPartnership={this.props.currentPartnership} avgWicket={this.props.avgWicket} highestPartnership={this.props.highestPartnership} wicketBalls={this.props.wicketBalls} partnerships={this.props.partnerships} secondsElapsed={this.props.secondsElapsed} />
      </div>
    );
  }
}

export default AdviceBar;
