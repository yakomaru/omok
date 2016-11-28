const checkUpperMinorDiagonal = (data, distanceFromPlacedPiece) => {
  let inARow = 0;
  for (let i = distanceFromPlacedPiece; i < data.length; i += 1) {
    if ( data.board[data.x + i] && data.y - i >= 0 && 
         data.board[data.x + i][data.y - i] === data.piecePlayed) {
      inARow += 1;
    }
    else if (data.checkBreak) {
      break;
    }
  }
  if (data.checkBreak) {
    return inARow;
  }
  return inARow === data.length - distanceFromPlacedPiece;
}
const checkLowerMinorDiagonal = (data, distanceFromPlacedPiece) => {
  let inARow = 0;
  for (let i = distanceFromPlacedPiece; i < data.length; i += 1) {
    if (data.x - i >= 0 && data.board[data.x - i][data.y + i] === data.piecePlayed) {
      inARow += 1;
    }
    else if (data.checkBreak) {
      break;
    }
  }
  if (data.checkBreak) {
    return inARow;
  }
  return inARow === data.length - distanceFromPlacedPiece;
}
const checkUpperMajorDiagonal = (data, distanceFromPlacedPiece) => {
  let inARow = 0;
  for (let i = distanceFromPlacedPiece; i < data.length; i += 1) {
    if (data.board[data.x + i] && data.board[data.x + i][data.y + i] === data.piecePlayed) {
      inARow += 1;
    }
    else if (data.checkBreak) {
      break;
    }
  }
  if (data.checkBreak) {
    return inARow;
  }
  return inARow === data.length - distanceFromPlacedPiece;
}

const checkLowerMajorDiagonal = (data, distanceFromPlacedPiece) => {
  let inARow = 0;
  for (let i = distanceFromPlacedPiece; i < data.length; i += 1) {
    if (data.y - i > 0 && data.x - i >= 0 && 
        data.board[data.x - i][data.y - i] === data.piecePlayed) {
      inARow += 1;
    }
    else if (data.checkBreak) {
      break;
    }
  }
  if (data.checkBreak) {
    return inARow;
  }
  return inARow === data.length - distanceFromPlacedPiece;
}
const checkUpperVertical = (data, distanceFromPlacedPiece) => {
  let inARow = 0;
  for (let i = distanceFromPlacedPiece; i < data.length; i += 1) {
    if (data.board[data.x + i] && data.board[data.x + i][data.y] === data.piecePlayed) {
      inARow += 1;
    }
    else if (data.checkBreak) {
      break;
    }
  }
  if (data.checkBreak) {
    return inARow;
  }
  return inARow === data.length - distanceFromPlacedPiece;
}
const checkLowerVertical = (data, distanceFromPlacedPiece) => {
  let inARow = 0;
  for (let i = distanceFromPlacedPiece; i < data.length; i += 1) {
    if (data.x - i >= 0 && data.board[data.x - i][data.y] === data.piecePlayed) {
      inARow += 1;
    }
    else if (data.checkBreak) {
      break;
    }
  }
  if (data.checkBreak) {
    return inARow;
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
    else if (data.checkBreak) {
      break;
    }
  }
  if (data.checkBreak) {
    return inARow;
  }
  return inARow === data.length - distanceFromPlacedPiece;
}
const checkLeftHorizontal = (data, distanceFromPlacedPiece) => {
  let inARow = 0;
  const horizontal = data.board[data.x];
  for (let i = distanceFromPlacedPiece; i < data.length; i += 1) {
    if (data.y - i >= 0 && horizontal[data.y - i] === data.piecePlayed) {
      inARow += 1;
    }
    else if (data.checkBreak) {
      break;
    }
  }
  if (data.checkBreak) {
    return inARow;
  }
  return inARow === data.length - distanceFromPlacedPiece;
}

const checkVictoryCondition = (data) => {
  data.length = 5;
  data.checkBreak = true;
  return checkLeftHorizontal(data, 0) + checkRightHorizontal(data , 1) >= 5 ||
         checkLowerVertical(data, 0) + checkUpperVertical(data, 1) >= 5 ||
         checkLowerMajorDiagonal(data, 0) + checkUpperMajorDiagonal(data , 1) >= 5 ||
         checkLowerMinorDiagonal(data, 0) + checkUpperMinorDiagonal(data, 1) >= 5;
};

const checkDoubleThrees = (data) => {
  if (checkVictoryCondition(data)) {
    return false;
  }
  data.length = 3;
  data.checkBreak = false;
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
  for(let i in possibleThrees) {
    if(possibleThrees[i]) {
      counter++;
    }
  }
  console.log(possibleThrees)
  if (counter >= 2) {
    return true;
  }
  counter = 0;
  data.length = 4;
  possibleThrees = {
    topVert: checkUpperVertical(data, 2),
    botVer: checkLowerVertical(data, 2),
    leftHoriz:checkLeftHorizontal(data, 2), 
    rightHoriz: checkRightHorizontal(data, 2),
    topMinor: checkUpperMinorDiagonal(data, 2),
    botMinor: checkLowerMinorDiagonal(data, 2),
    topMajor: checkUpperMajorDiagonal(data, 2),
    botMajor: checkLowerMajorDiagonal(data, 2), 
  }
  for(let j in possibleThrees) {
    if(possibleThrees[j]) {
      counter++;
    }
  }
  return counter >= 2;
};

export { checkDoubleThrees, checkVictoryCondition }
