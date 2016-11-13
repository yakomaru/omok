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
    this.checkHorizontalRows(x, y, played);
    this.checkVerticalRows(x, y, played);
    this.checkMajorDiagonalRows(parseInt(x), parseInt(y), played);
    console.log(this.checkMinorDiagonalRows(parseInt(x), parseInt(y), played));
  }
  checkMajorDiagonalRows(x, y, played) {
    let inARow = 0;
    for (let i = 0; i <= 5; i++) {
      if (this.state.board[x+i][y+i] === played) {
        inARow++;
      }
      else {
        break;
      }
    }
    for (let j = 1; j <= 5; j++) {
      if (x-j < 0 || y-j < 0) {
        break;
      }     
      if (this.state.board[x-j][y-j] === played) {
        inARow++;
      }
      else {
        break;
      }
    }
    return inARow >= 5;
  }
  checkMinorDiagonalRows(x, y, played){
    let inARow = 0;
    for (let i = 0; i <= 5; i++) {
      if (y-i < 0){
        break;
      }
      if (this.state.board[x+i][y-i] === played) {
        inARow++;
      }
      else {
        break;
      }
    }
    for (let j = 1; j <= 5; j++) {
      if (x-j < 0) {
        break;
      }     
      if (this.state.board[x-j][y+j] === played) {
        inARow++;
      }
      else {
        break;
      }
    }
    return inARow >= 5;
  }
  checkHorizontalRows(x, y, played) { 
    let horizontal = this.state.board[x];
    let inARow = 0;
    for (let i = y; i < horizontal.length; i++) {
      if (horizontal[i] === played) {
        inARow++;
      }
      else {
        break;
      }
    }
    for (let j = y-1; j >= 0; j--) {
      if (horizontal[j] === played) {
        inARow++;
      }
      else {
        break;
      }
    }
    return inARow >= 5;
  }
  checkVerticalRows(x, y, played) {
    let inARow = 0;
    for (let i = x; i < this.state.board.length; i++) {
      if (this.state.board[i][y] === played) {
        inARow++;
      }
      else {
        break;
      }
    }
    for (let j = x-1; j >= 0; j--) {
      if(this.state.board[j][y] === played) {
        inARow++;
      }
      else {
        break;
      }
    }
    return inARow >= 5;
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
