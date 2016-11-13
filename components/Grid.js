import React from 'react';
import _ from 'lodash';

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'played': 0
    };
  }
  handleClick() {
    if(this.state.played === 0) {
      let turnCount = this.props.playerTurnCount;
      turnCount++;
      this.setState({
        played: this.props.playerPiece
      }, () => {
        this.props.changeCoordinateState(this.props.coordinate, this.state.played, turnCount);
      });
    }
  }
  render() {
    return(
      <div className="grid" onClick={() => this.handleClick()}>
        {this.state.played}
      </div>
    )
  }
}

module.exports = Grid;

