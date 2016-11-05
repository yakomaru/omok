import React from 'react'

class Board extends React.Component {
  constructor() {
    super();
    let board = [];
    let rows = [];
    for(let i = 0; i < 19; i++) {
      for (let j = 0; j < 19; j++) {
        rows.push(0);
        if( j === 18) {
          board.push(rows);
          rows = [];
        }
      }
    }
    this.state = { board };
    console.log(this.state)
  }
  render() {
    return (
      <div>{this.state.board}</div>
    )
  }
}

module.exports = Board;
