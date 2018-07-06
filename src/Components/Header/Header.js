import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);

    this.headerDisplay = this.headerDisplay.bind(this);
  }

  headerDisplay() {
    if (this.props.resetDisplay === 0) {
    return (
      <div className="row">
    <div className="col-4">
    <button onClick={this.props.resetDisplaySet} className="btn-sm btn-wicket">Reset</button>
    </div>
    </div>
    )
  }
  else {
    return (
      <div className="row">
      <div className="col-4">
      <p>Are you sure?</p>
      </div>
      <div className="col-4">
      <button onClick={this.props.resetBuilder} className="btn-sm btn-wicket">Yes</button>
      </div>
      <div className="col-4">
      <button onClick={this.props.displayHeader} className="btn-sm">Cancel</button>
      </div>
      </div>
    )
  }
  }

  render() {
    return (
      <div className="header-app">


          {this.headerDisplay()}


      </div>
    );
  }
}

export default Header;
