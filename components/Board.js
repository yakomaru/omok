import React from 'react';
import _ from 'lodash';
import Grid from './Grid';
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
      whichPlayer: '',
      submit: '',
      value: '',
    };
  }
  componentDidMount() {
    socket.on('connected', (data) => {
      console.log(data);
    });
    socket.on('changeBoardState', (data) => {this.handleBoardState(data)});
    socket.on('playerJoinedRoom', (data) => {
      console.log(`Player has joined ${data.gameRoomId}`);
    }); 
  }

  handleJoinRoom(e) {
    this.setState({value: e.target.value});
  }
  createGameRoom(e) {
    e.preventDefault();
    const gameRoomId = `${Math.floor(Math.random() * 10000000)}`;
    console.log(gameRoomId)
    this.setState({
      submit: gameRoomId,
      whichPlayer: 1,
    });
    socket.emit('createGame', { gameRoomId, socketId: socket.id, player: 1 });
  }

  joinGameRoom(e) {
    e.preventDefault();
    let gameRoomId = this.state.value;
    socket.emit('joinGameRoom', { gameRoomId, socketId: socket.id, player: 2 });
    this.setState({
      submit: this.state.value,
      whichPlayer: 2,
    });
  }

  sendOmokMove(board, piece, turnCount){
    const data = { board, piece, turnCount, gameRoomId: this.state.submit };
    socket.emit('onPlayerMove', data);
  }

  handleBoardState(data){
    console.log(data);
    this.setState({
      board: data.board,
      playerPiece: data.piece,
      playerTurnCount: data.turnCount,
    }, () => {
      console.log('click')
    });
  }

  changeCoordinateState(newCoord, played, turnCount) {
    if (this.state.whichPlayer == this.state.playerPiece) {
      const newBoard = this.state.board;
      const newTurn = this.state.playerPiece > 1 ? 1 : 2;
      newBoard[newCoord[0]][newCoord[1]] = played;
      if (turnCount >= 9 && this.checkVictoryCondition(newCoord[0], newCoord[1], played)) {
        this.setState({
          victoryMessage: `Player ${this.state.playerPiece} has won`,
        });
      }
      this.setState({
        board: newBoard,
        playerPiece: newTurn,
        playerTurnCount: turnCount,
      }, () => {    
        this.sendOmokMove(this.state.board, this.state.playerPiece, this.state.playerTurnCount);
      });
    }
  }
  checkVictoryCondition(x, y, played) {
    return this.checkHorizontalRows(x, y, played) ||
           this.checkVerticalRows(x, y, played) ||
           this.checkMajorDiagonalRows(x, y, played) ||
           this.checkMinorDiagonalRows(x, y, played);
  }
  checkMajorDiagonalRows(x, y, played) {
    let inARow = 0;
    for (let i = 0; i < 5; i += 1) {
      if (this.state.board[x + i] && this.state.board[x + i][y + i] === played) {
        inARow += 1;
      } else {
        break;
      }
    }
    for (let j = 1; j < 5; j += 1) {
      if (this.state.board[x - j] && this.state.board[x - j][y - j] === played) {
        inARow += 1;
      } else {
        break;
      }
    }
    return inARow >= 5;
  }
  checkMinorDiagonalRows(x, y, played) {
    let inARow = 0;
    for (let i = 0; i < 5; i += 1) {
      if (this.state.board[x + i] && this.state.board[x + i][y - i] === played) {
        inARow += 1;
      } else {
        break;
      }
    }
    for (let j = 1; j < 5; j += 1) {
      if (this.state.board[x - j] && this.state.board[x - j][y + j] === played) {
        inARow += 1;
      } else {
        break;
      }
    }
    return inARow >= 5;
  }
  checkHorizontalRows(x, y, played) {
    const horizontal = this.state.board[x];
    let inARow = 0;
    for (let i = y; i < horizontal.length; i += 1) {
      if (horizontal[i] === played) {
        inARow += 1;
      } else {
        break;
      }
    }
    for (let j = y - 1; j >= 0; j -= 1) {
      if (horizontal[j] === played) {
        inARow += 1;
      } else {
        break;
      }
    }
    return inARow >= 5;
  }
  checkVerticalRows(x, y, played) {
    let inARow = 0;
    for (let i = x; i < this.state.board.length; i += 1) {
      if (this.state.board[i][y] === played) {
        inARow += 1;
      } else {
        break;
      }
    }
    for (let j = x - 1; j >= 0; j -= 1) {
      if (this.state.board[j][y] === played) {
        inARow += 1;
      } else {
        break;
      }
    }
    return inARow >= 5;
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
            playerPiece={this.state.playerPiece}
            playerTurnCount={this.state.playerTurnCount}
            changeCoordinateState={(newCoord, played, turnCount) =>
              this.changeCoordinateState(newCoord, played, turnCount)}
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
