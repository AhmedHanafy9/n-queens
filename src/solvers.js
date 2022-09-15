/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  let board = new Board({n: n});
  let rows = board.rows();

  for (let i = 0; i < n; i++) {
    board.togglePiece(i, i);
  }
  solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

window.findNRooksSolution(2);

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var solutionBoard = new Board({n});

  var getSolutions = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      solutionBoard.togglePiece(row, i);

      if (!solutionBoard.hasAnyRooksConflicts()) {
        getSolutions(row + 1);
      }
      solutionBoard.togglePiece(row, i);
    }
  };

  getSolutions(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n, rowIndex = 0, board) {
  board = board || new Board({n: n});
  const rows = board.rows();
  if (n === 2 || n === 3) {
    return board.rows();
  }
  if (rowIndex === n) {
    return board.rows();
  }
  for (let i = 0; i < n; i++) {
    board.togglePiece(rowIndex, i);

    if (!(board.hasAnyQueensConflicts())) {
      let result = findNQueensSolution(n, rowIndex + 1, board);
      if (result !== 'dead end') {
        return result;
      }
    }
    board.togglePiece(rowIndex, i);
  }
  return 'dead end';

  /* Also Works --- Ahmed's Solution
  var solutionBoard = new Board({n: n});
  var rows = solutionBoard.rows();
  var solutionCount = 0;

  if (n === 2 || n === 3) {
    return solutionBoard.rows();
  }

  var getSolutions = function(row) {
    if (row === n) {
      return;
    }

    for (var i = 0; i < n; i++) {
      solutionBoard.togglePiece(row, i);

      if (!solutionBoard.hasAnyQueensConflicts()) {
        if (row !== n - 1) {
          getSolutions(row + 1);
        } else {
          solutionCount++;
        }
      }

      if (solutionCount < 1) {
        solutionBoard.togglePiece(row, i);
      } else {
        return;
      }
    }
  };

  getSolutions(0);
  return rows;
  */
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var solutionBoard = new Board({n});

  if (n === 2 || n === 3) {
    return solutionCount;
  }

  var getSolutions = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      solutionBoard.togglePiece(row, i);

      if (!solutionBoard.hasAnyQueensConflicts()) {
        getSolutions(row + 1);
      }
      solutionBoard.togglePiece(row, i);
    }
  };

  getSolutions(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
