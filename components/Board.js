import React from 'react';
import _ from 'lodash';
import io from 'socket.io-client';
import Grid from './Grid';
import { checkDoubleThrees, checkVictoryCondition } from './RuleChecker';

const socket = io();
const BOARD_SIZE = 15;
const buildColumn = () => _.fill(Array(BOARD_SIZE), 0);
const buildRows = () => _.map(Array(BOARD_SIZE), buildColumn);
const createGameRoom = (e) => {
  e.preventDefault();
  const gameRoomId = `${Math.floor(Math.random() * 10000000)}`;
  socket.emit('joinGameRoom', { gameRoomId, socketId: socket.id, role: 'host' });
};

class Board extends React.Component {
  constructor() {
    super();
    const BOARD = buildRows();
    this.state = {
      board: BOARD,
      piecePlayed: 1,
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
      this.changeCoordinateState(data);
    });
    socket.on('changeBoardState', (data) => { this.changeBoardState(data); });
  }
  onClickHandler(newCoord, turnCount) {
    const data = {
      x: newCoord[0],
      y: newCoord[1],
      piecePlayed: this.state.piecePlayed,
      board: this.state.board,
      turnCount,
    };
    console.log(checkDoubleThrees(data));
    socket.emit('onMoveClick', data);
  }
  changeBoardState(data) {
    this.setState({
      board: data.board,
      piecePlayed: data.piecePlayed,
      playerTurnCount: data.turnCount,
    });
  }
  joinGameRoom(e) {
    e.preventDefault();
    const gameRoomId = this.state.value;
    socket.emit('joinGameRoom', { gameRoomId, socketId: socket.id, role: 'joinee' });
  }
  handleJoinRoom(e) {
    this.setState({ value: e.target.value });
  }
  changeCoordinateState(data) {
    data.length = 5;
    data.board = this.state.board;
    let nextPlayerPiece = this.state.piecePlayed > 1 ? 1 : 2;
    data.board[data.x][data.y] = data.piecePlayed;
    if (data.turnCount >= 9 && checkVictoryCondition(data)) {
      this.setState({
        victoryMessage: `Player ${data.piecePlayed} has won`,
      });
    }
    this.setState({
      board: data.board,
      piecePlayed: nextPlayerPiece,
      playerTurnCount: data.turnCount,
    }, () => {
      data.piecePlayed = this.state.piecePlayed;
      socket.emit('onPlayerMove', data);
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
          <button id="btn-create-game" onClick={e => createGameRoom(e)}>create</button>
        </div>
        <form onSubmit={e => this.joinGameRoom(e)}>
          <label>
            Join:
            <input type="text" value={this.state.value} onChange={e => this.handleJoinRoom(e)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

module.exports = Board;
