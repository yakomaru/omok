import React from 'react';
import ReactDOM from 'react-dom';
const Board = require('../components/Board.js');

class TestApp extends React.Component {
  render() {
    return (
    <Board />
    )
  }
}

ReactDOM.render (
  <TestApp />
  , document.getElementById('container')
)
