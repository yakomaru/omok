import React from'react';
import _ from 'lodash';
const Grid = require('./Grid.js');
const BOARD_SIZE = 19;
let buildColumn = () => {
  return _.fill(Array(BOARD_SIZE), 0);
};
let buildRows = () => {
  return _.map(Array(BOARD_SIZE), buildColumn);
};

class Board extends React.Component {
  constructor() {
    super();
    const BOARD = buildRows();
    this.state = {
      board: BOARD,
      playerPiece: 1,
      playerTurnCount: 0
    };
  }
  changeCoordinateState(coordinate, played, turnCount) {
    let newCoord= coordinate.split(',');
    let newBoard = this.state.board;
    let newTurn;
    this.state.playerPiece > 0 ? newTurn = -1 : newTurn = 1;
    newBoard[newCoord[0]][newCoord[1]] = played;
    this.setState({
      board: newBoard,
      playerPiece: newTurn,
      playerTurnCount: turnCount
    }, () => {
      if (turnCount >= 9) {
        this.checkVictoryCondition(newCoord[0], newCoord[1], played);
      }
    });
  }
  checkVictoryCondition(x, y, played) {
    let horizontal = this.state.board[x];
    let vertical = this.state.board[y];
    let winCondition = 0;
    let triggered = false;
    for (let i = 0; i < this.state.board[x].length; i++) {
      if (this.state.board[x][i] === played && !triggered){
        triggered = true;
        winCondition = 1;
      }
      else if (this.state.board[x][i] == played && triggered) {
        winCondition++;
        if (winCondition === 5){
          break;
        }
      }
      else {
        winCondition = 0;
        triggered = false;
      }
    }
    console.log(winCondition)
  }
  render() {
    let rows;
    let test = 0;
    rows = this.state.board.map((value, key) => {
      return value.map((innerValue, innerKey) => {
        let coordinate = key + ',' + innerKey;
        return (
            <Grid
             key={coordinate}
             coordinate={coordinate}
             playerPiece={this.state.playerPiece}
             playerTurnCount={this.state.playerTurnCount}
          changeCoordinateState={this.changeCoordinateState.bind(this)}
            />
        )
      });
    });
    return(
      <div>{rows}</div>
    )
  }
}

module.exports = Board;
