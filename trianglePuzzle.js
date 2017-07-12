/*eslint-env node*/
/*eslint no-undef:2, no-unused-vars:0, no-console:0*/
var boardTree;

function makeBoard(boardIn) {
    var boardOut = {};

    if (boardIn) {
        //copy
        boardOut.board = boardIn.board.map(function (ele) {
            return ele;
        });
    } else {
        boardOut.board = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    }

    boardOut.children = [];
    return boardOut;
}


function makeMoves(boardIn) {
    var moves, childrenOut;

    function makeMove(boardInL, jumperPegIndex, removedPegIndex, landingSpaceIndex) {
        var jumperPeg = boardIn.board[jumperPegIndex],
            removedPeg = boardIn.board[removedPegIndex],
            landingSpace = boardIn.board[landingSpaceIndex],

            shouldMakeMove = removedPeg === 1 && jumperPeg === 1 && landingSpace === 0,
            newBoard;

        //console.log(shouldMakeMove)
        if (shouldMakeMove) {
            //copy the board
            newBoard = makeBoard(boardInL);
            //then make the move
            newBoard.board[jumperPegIndex] = 0;
            newBoard.board[removedPegIndex] = 0;
            newBoard.board[landingSpaceIndex] = 1;

            return newBoard;
        }

        return null;
    }

    moves = [
        //right to bottom left
        [0, 2, 5],
        [5, 2, 0],
        [2, 5, 9],
        [9, 5, 2],
        [5, 9, 14],
        [14, 9, 5],

        [1, 4, 8],
        [8, 4, 1],
        [4, 8, 13],
        [13, 8, 4],

        [3, 7, 12],
        [12, 7, 3],

        //left to bottom right
        [0, 1, 3],
        [3, 1, 0],
        [1, 3, 6],
        [6, 3, 1],
        [3, 6, 11],
        [11, 6, 3],

        [2, 4, 7],
        [7, 4, 2],
        [4, 7, 11],
        [11, 7, 4],

        [5, 8, 12],
        [12, 8, 5],


        //bottom to top
        [10, 11, 12],
        [12, 11, 10],
        [11, 12, 13],
        [13, 12, 11],
        [12, 13, 14],
        [14, 13, 12],

        [6, 7, 8],
        [8, 7, 6],
        [7, 8, 9],
        [9, 8, 7],

        [3, 4, 5],
        [5, 4, 3]
    ];


    childrenOut = moves.map(function (move) {
            //will make a copy ofthe board with the move done to it or null
            //console.log(move)
            return makeMove(boardIn, move[0], move[1], move[2]);
        })
        .filter(function (board) {
            //remove out all the nulls - not valid moves
            return board !== null;
        });

    //console.log('c', childrenOut)
    boardIn.children = boardIn.children.concat(childrenOut)
}

boardTree = makeBoard();
makeMoves(boardTree)
console.dir(boardTree, {
    depth: null
});
