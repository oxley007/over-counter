import React, { Component } from 'react';


class BallRemove extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

handleClick() {
  //i'm going to need to add something for remove here...
  //this.props.addBall();
}



  render() {
    return (
        <div className="ball-remove-app div-bottom-content display-right">
          <button className="Remove-ball btn-circle" onClick={this.props.removeBall}>-</button>
        </div>
    );
  }
}


export default BallRemove;
