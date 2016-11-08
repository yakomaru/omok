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
      playerTurn: 1
    };
  }
  changeCoordinateState(coordinate, played){
    let newCoord= coordinate.split(',');
    let newBoard = this.state.board;
    let newTurn;
    this.state.playerTurn > 0 ? newTurn = -1 : newTurn = 1;
    newBoard[newCoord[0]][newCoord[1]] = played;
    this.setState({
      board: newBoard,
      playerTurn: newTurn
    });
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
             playerTurn={this.state.playerTurn}
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
