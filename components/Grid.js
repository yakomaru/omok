import React from 'react';
import _ from 'lodash';

class Grid extends React.Component {
  constructor() {
    super();
  }
  handleClick() {
    let turnCount = this.props.playerTurnCount;
    turnCount++;
    this.props.onClickHandler(this.props.coordinate, turnCount);
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
