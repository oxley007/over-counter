import React, { Component } from 'react';
import './AdviceSelect.css';

class AdviceSelect extends Component {
  render() {
    return (
      <div className="advice-select-app">
        <div className="row">
          <div className="col-12">
            <p>Are you associated with:</p>
          </div>
        </div>
        <div className="row advice-buttons">
          <div className="col-4">
            <button className="btn btn-primary-outline" onClick={this.props.handleAssociatedButton} value="batting">Batting team</button>
          </div>
        <div className="col-4">
          <button className="btn btn-primary-outline" onClick={this.props.handleAssociatedButton} value="bowling">Bowling team</button>
        </div>
        <div className="col-4">
          <button className="btn btn-primary-outline" onClick={this.props.handleAssociatedButton} value="neutral">Neutral</button>
        </div>
      </div>
    </div>
    );
  }
}

export default AdviceSelect;
