import React from 'react';
import _ from 'lodash';

class Grid extends React.Component {
  constructor() {
    super();
    this.state = {
      'played': 0,
    };
  }
  handleClick() {
    if(this.state.played === 0) {
      let turnCount = this.props.playerTurnCount;
      turnCount++;
      this.setState({
        played: this.props.playerPiece,
      }, () => {
        this.props.changeCoordinateState(this.props.coordinate, this.state.played, turnCount);
      });
    }
  }
  render() {
    return(
      <div className="grid-space">
        <div className={this.props.omokPiece} id={this.props.coordinate} onClick={() => this.handleClick()}>
        </div>
        <div className="cross">
        </div>
      </div>
    )
  }
}

module.exports = Grid;
