import React from 'react';
import _ from 'lodash';
import Grid from './Grid';
import { checkVictoryCondition } from './VictoryLogic.js';
import { checkDoubleThrees } from './DoubleThrees.js';
const socket = io();
const BOARD_SIZE = 15;
const buildColumn = () => _.fill(Array(BOARD_SIZE), 0);
const buildRows = () => _.map(Array(BOARD_SIZE), buildColumn);

class Board extends React.Component {
  constructor() {
    super();
    const BOARD = buildRows();
    this.state = {
      board: BOARD,
      playerPiece: 1,
      playerTurnCount: 0,
      victoryMessage: null,
      value: '',
    };
  }
  componentDidMount() {
    socket.on('connected', (data) => {
      console.log(data);
    });
    socket.on('playerJoinedRoom', (data) => {
      console.log(`Player has joined ${data.gameRoomId}`);
    });
    socket.on('changeCoordinateState', (data) => {
      this.changeCoordinateState(data.newCoord, data.turnCount)
    });
    socket.on('changeBoardState', (data) => {this.changeBoardState(data)});
  }

  handleJoinRoom(e) {
    this.setState({value: e.target.value});
  }
  createGameRoom(e) {
    e.preventDefault();
    const gameRoomId = `${Math.floor(Math.random() * 10000000)}`;
    socket.emit('joinGameRoom', { gameRoomId, socketId: socket.id, role: 'host' });
  }

  joinGameRoom(e) {
    e.preventDefault();
    let gameRoomId = this.state.value;
    socket.emit('joinGameRoom', { gameRoomId, socketId: socket.id, role: 'joinee' });
  }

  changeBoardState(data){
    this.setState({
      board: data.newBoard,
      playerPiece: data.newTurn,
      playerTurnCount: data.turnCount,
    });
  }

  onClickHandler(newCoord, turnCount) {
    console.log(checkDoubleThrees(newCoord[0], newCoord[1], this.state.playerPiece, this.state.board));
    socket.emit('onMoveClick', { newCoord, turnCount, role: this.state.playerPiece });
  }
  changeCoordinateState(newCoord, turnCount) {
    const newBoard = this.state.board;
    const playedPiece = this.state.playerPiece;
    const newTurn = playedPiece > 1 ? 1 : 2;
    newBoard[newCoord[0]][newCoord[1]] = playedPiece;
    if (turnCount >= 9 && checkVictoryCondition(newCoord[0], newCoord[1], playedPiece, newBoard, 5)) {
      this.setState({
        victoryMessage: `Player ${playedPiece} has won`,
      });
    }
    this.setState({
      board: newBoard,
      playerPiece: newTurn,
      playerTurnCount: turnCount,
    }, () => {    
      socket.emit('onPlayerMove', { newBoard, newTurn, turnCount });
    });
  }

  render() {
    const rows = this.state.board.map((value, key) =>
      value.map((innerValue, innerKey) => {
        const coordinate = [key, innerKey];
        let omokPiece = 'grid'
        if (innerValue > 1) {
          omokPiece = 'player-two';
        }
        else if (innerValue === 0){
          omokPiece = 'grid';
        }
        else {
          omokPiece = 'player-one';
        }
        return (
          <Grid
            omokPiece={omokPiece}
            coordinate={coordinate}
            playerTurnCount={this.state.playerTurnCount}
            onClickHandler={(newCoord, turnCount) =>
              this.onClickHandler(newCoord, turnCount)}
          />
        );
      })
    );
    return (
      <div className="other">
        <div className="board-outer">
          <div className="board-container">
            <div className="board-inner">{rows}</div>
          </div>
          <div className="victory-message">
            {this.state.victoryMessage}
          </div>
        </div>
        <div className="buttons">
          <button id="btn-create-game" onClick={(e) => this.createGameRoom(e)}>create</button>
        </div>
        <form onSubmit={(e) => this.joinGameRoom(e)}>
          <label>
            Join:
            <input type="text" value={this.state.value} onChange={(e) => this.handleJoinRoom(e)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

module.exports = Board;
