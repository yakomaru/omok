const checkMajorDiagonalRows = (x, y, played, board, length) => {
  let inARow = 0;
  for (let i = 0; i < length; i += 1) {
    if (board[x + i] && board[x + i][y + i] === played) {
      inARow += 1;
    } else {
      break;
    }
  }
  for (let j = 1; j < length; j += 1) {
    if (board[x - j] && board[x - j][y - j] === played) {
      inARow += 1;
    } else {
      break;
    }
  }
  return inARow >= length;
}
const checkMinorDiagonalRows = (x, y, played, board, length) => {
  let inARow = 0;
  for (let i = 0; i < length; i += 1) {
    if (board[x + i] && board[x + i][y - i] === played) {
      inARow += 1;
    } else {
      break;
    }
  }
  for (let j = 1; j < length; j += 1) {
    if (board[x - j] && board[x - j][y + j] === played) {
      inARow += 1;
    } else {
      break;
    }
  }
  return inARow >= length;
}
const checkHorizontalRows = (x, y, played, board, length) => {
  const horizontal = board[x];
  let inARow = 0;
  for (let i = 0; i < length; i += 1) {
    if (horizontal[y + i] === played) {
      inARow += 1;
    } else {
      break;
    }
  }
  for (let j = 1; j < length; j += 1) {
    if (horizontal[y - j] === played) {
      inARow += 1;
    } else {
      break;
    }
  }
  return inARow >= length;
}
const checkVerticalRows = (x, y, played, board, length) => {
  let inARow = 0;
  for (let i = 0; i < length; i += 1) {
    if (board[x + i][y] === played) {
      inARow += 1;
    } else {
      break;
    }
  }
  for (let j = 1; j < length; j += 1) {
    if (board[x - j][y] === played) {
      inARow += 1;
    } else {
      break;
    }
  }
  return inARow >= length;
}
const checkVictoryCondition = (x, y, played, board, length) => {
    return checkHorizontalRows(x, y, played, board, length) ||
           checkVerticalRows(x, y, played, board, length) ||
           checkMajorDiagonalRows(x, y, played, board, length) ||
           checkMinorDiagonalRows(x, y, played, board, length);
}
export { checkVictoryCondition, 
         checkHorizontalRows, 
         checkVerticalRows, 
         checkMajorDiagonalRows, 
         checkMinorDiagonalRows }
