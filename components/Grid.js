import React from 'react';
import _ from 'lodash';

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'played': 0,
      'playerPiece': 'grid'
    };
  }
  handleClick() {
    if(this.state.played === 0) {
      let turnCount = this.props.playerTurnCount;
      let playerPiece = this.props.playerPiece;
      playerPiece > 1 ? playerPiece = 'player-two' : playerPiece = 'player-one';
      turnCount++;
      this.setState({
        played: this.props.playerPiece,
        playerPiece: playerPiece
      }, () => {
        this.props.changeCoordinateState(this.props.coordinate, this.state.played, turnCount);
      });
    }
  }
  render() {
    return(
      <div className="grid-space">
        <div className={this.state.playerPiece} id={this.props.coordinate} onClick={() => this.handleClick()}>
        </div>
        <div className="cross">
        </div>
      </div>
    )
  }
}

module.exports = Grid;
