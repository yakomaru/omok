import { checkVictoryCondition } from './VictoryLogic.js';
const checkUpperMinorDiagonal = (x, y, played, board, length) => {
  let inARow = 0;
  let distanceFromPlacedPiece = 1;
  for (let i = distanceFromPlacedPiece; i < length; i += 1) {
    if (board[x + i] && board[x + i][y - i] === played) {
      inARow += 1;
    }
  }
  return inARow === length - distanceFromPlacedPiece;
}
const checkLowerMinorDiagonal = (x, y, played, board, length) => {
  let inARow = 0;
  let distanceFromPlacedPiece = 1;
  for (let i = distanceFromPlacedPiece; i < length; i += 1) {
    if (board[x - i] && board[x - i][y - i] === played) {
      inARow += 1;
    }
  }
  return inARow === length - distanceFromPlacedPiece;
}
const checkUpperMajorDiagonal = (x, y, played, board, length) => {
  let inARow = 0;
  let distanceFromPlacedPiece = 1;
  for (let i = distanceFromPlacedPiece; i < length; i += 1) {
    if (board[x + i] && board[x + i][y + i] === played) {
      inARow += 1;
    }
  }
  return inARow === length - distanceFromPlacedPiece;
}

const checkLowerMajorDiagonal = (x, y, played, board, length) => {
  let inARow = 0;
  let distanceFromPlacedPiece = 1;
  for (let i = distanceFromPlacedPiece; i < length; i += 1) {
    if (board[x - i] && board[x - i][y - i] === played) {
      inARow += 1;
    }
  }
  return inARow === length - distanceFromPlacedPiece;
}
const checkUpperVertical = (x, y, played, board, length) => {
  let inARow = 0;
  let distanceFromPlacedPiece = 1;
   for (let i = distanceFromPlacedPiece; i < length; i += 1) {
    if (board[x + i][y] === played) {
      inARow += 1;
    }
  }
  return inARow === length - distanceFromPlacedPiece;
}
const checkLowerVertical = (x, y, played, board, length) => {
  let inARow = 0;
  let distanceFromPlacedPiece = 1;
  for (let i = distanceFromPlacedPiece; i < length; i += 1) {
    if (board[x - i][y] === played) {
      inARow += 1;
    }
  }
  return inARow === length - distanceFromPlacedPiece;
}
const checkRightHorizontal = (x, y, played, board, length) => {
  const horizontal = board[x];
  let inARow = 0;
  let distanceFromPlacedPiece = 1;
  for (let i = distanceFromPlacedPiece; i < length; i += 1) {
    if (horizontal[y + i] === played) {
      inARow += 1;
    }
  }
  return inARow === length - distanceFromPlacedPiece;
}
const checkLeftHorizontal = (x, y, played, board, length) => {
  const horizontal = board[x];
  let inARow = 0;
  let distanceFromPlacedPiece = 1;
  for (let i = distanceFromPlacedPiece; i < length; i += 1) {
    if (horizontal[y - i] === played) {
      inARow += 1;
    }
  }
  console.log(inARow)
  return inARow === length - 1;
}

const checkDoubleThrees = (x, y, played, board) => {
  if (checkVictoryCondition(x, y, played, board, 4)) {
    return false;
  }
  let possibleThrees = { 
    topVert: checkUpperVertical(x, y, played, board, 3),
    botVer: checkLowerVertical(x, y, played, board, 3),
    leftHoriz:checkLeftHorizontal(x, y, played, board, 3), 
    rightHoriz: checkRightHorizontal(x, y, played, board, 3),
    topMinor: checkUpperMinorDiagonal(x, y, played, board, 3),
    botMinor: checkLowerMinorDiagonal(x, y, played, board, 3),
    topMajor: checkUpperMajorDiagonal(x, y, played, board, 3),
    botMajor: checkLowerMajorDiagonal(x, y, played, board, 3),
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
