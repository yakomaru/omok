import { checkVictoryCondition } from './VictoryLogic.js';
const checkUpperMinorDiagonal = (data, distanceFromPlacedPiece) => {
  let inARow = 0;
  for (let i = distanceFromPlacedPiece; i < data.length; i += 1) {
    if (data.board[data.x + i] && data.board[data.x + i][data.y - i] === data.piecePlayed) {
      inARow += 1;
    }
  }
  return inARow === data.length - distanceFromPlacedPiece;
}
const checkLowerMinorDiagonal = (data, distanceFromPlacedPiece) => {
  let inARow = 0;
  for (let i = distanceFromPlacedPiece; i < data.length; i += 1) {
    if (data.board[data.x - i] && data.board[data.x - i][data.y - i] === data.piecePlayed) {
      inARow += 1;
    }
  }
  return inARow === data.length - distanceFromPlacedPiece;
}
const checkUpperMajorDiagonal = (data, distanceFromPlacedPiece) => {
  let inARow = 0;
  for (let i = distanceFromPlacedPiece; i < data.length; i += 1) {
    if (data.board[data.x + i] && data.board[data.x + i][data.y + i] === data.piecePlayed) {
      inARow += 1;
    }
  }
  return inARow === data.length - distanceFromPlacedPiece;
}

const checkLowerMajorDiagonal = (data, distanceFromPlacedPiece) => {
  let inARow = 0;
  for (let i = distanceFromPlacedPiece; i < data.length; i += 1) {
    if (data.board[data.x - i] && data.board[data.x - i][data.y - i] === data.piecePlayed) {
      inARow += 1;
    }
  }
  return inARow === data.length - distanceFromPlacedPiece;
}
const checkUpperVertical = (data, distanceFromPlacedPiece) => {
  let inARow = 0;
  for (let i = distanceFromPlacedPiece; i < data.length; i += 1) {
    if (data.board[data.x + i] && data.board[data.x + i][data.y] === data.piecePlayed) {
      inARow += 1;
    }
  }
  return inARow === data.length - distanceFromPlacedPiece;
}
const checkLowerVertical = (data, distanceFromPlacedPiece) => {
  let inARow = 0;
  for (let i = distanceFromPlacedPiece; i < data.length; i += 1) {
    if (data.board[data.x - i] && data.board[data.x - i][data.y] === data.piecePlayed) {
      inARow += 1;
    }
  }
  return inARow === data.length - distanceFromPlacedPiece;
}
const checkRightHorizontal = (data, distanceFromPlacedPiece) => {
  let inARow = 0;
  const horizontal = data.board[data.x];
  for (let i = distanceFromPlacedPiece; i < data.length; i += 1) {
    if (horizontal[data.y + i] && horizontal[data.y + i] === data.piecePlayed) {
      inARow += 1;
    }
  }
  return inARow === data.length - distanceFromPlacedPiece;
}
const checkLeftHorizontal = (data, distanceFromPlacedPiece) => {
  let inARow = 0;
  const horizontal = data.board[data.x];
  for (let i = distanceFromPlacedPiece; i < data.length; i += 1) {
    if (horizontal[data.y - i] && horizontal[data.y - i] === data.piecePlayed) {
      inARow += 1;
    }
  }
  return inARow === data.length - distanceFromPlacedPiece;
}

const checkDoubleThrees = (data) => {
  data.length = 4;
  if (checkVictoryCondition(data)){
    return false;
  }
  let possibleThrees = { 
    topVert: checkUpperVertical(data, 1),
    botVer: checkLowerVertical(data, 1),
    leftHoriz:checkLeftHorizontal(data, 1), 
    rightHoriz: checkRightHorizontal(data, 1),
    topMinor: checkUpperMinorDiagonal(data, 1),
    botMinor: checkLowerMinorDiagonal(data, 1),
    topMajor: checkUpperMajorDiagonal(data, 1),
    botMajor: checkLowerMajorDiagonal(data, 1),
  };
  let counter = 0;
  for(var i in possibleThrees){
    if(possibleThrees[i]) {
      counter++;
    }
  }
  console.log(possibleThrees)
  return counter >= 2;
};

export { checkDoubleThrees }
