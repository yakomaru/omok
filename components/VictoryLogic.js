const checkMajorDiagonalRows = (data) => {
  let inARow = 0;
  let length = data.length;
  let board = data.board;
  let x = data.x;
  let y = data.y;
  let played = data.piecePlayed;
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
const checkMinorDiagonalRows = (data) => {
  let inARow = 0;
  let length = data.length;
  let board = data.board;
  let x = data.x;
  let y = data.y; 
  let played = data.piecePlayed;
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
const checkHorizontalRows = (data) => {
  let inARow = 0;
  let length = data.length;
  let board = data.board;
  let x = data.x;
  let y = data.y; 
  const horizontal = board[x];
  let played = data.piecePlayed;
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
const checkVerticalRows = (data) => {
  let inARow = 0;
  let length = data.length;
  let board = data.board;
  let x = data.x;
  let y = data.y; 
  let played = data.piecePlayed;
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
const checkVictoryCondition = (data) => {
    return checkHorizontalRows(data) ||
           checkVerticalRows(data) ||
           checkMajorDiagonalRows(data) ||
           checkMinorDiagonalRows(data);
}
export { checkVictoryCondition, 
         checkHorizontalRows, 
         checkVerticalRows, 
         checkMajorDiagonalRows, 
         checkMinorDiagonalRows }
