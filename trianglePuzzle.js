/*eslint-env node*/
/*eslint no-undef:2, no-unused-vars:0, no-console:0*/
//process.stdin.resume(); //so the program will not close instantly

function exitHandler(options, err) {
    if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);

    process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, {
    cleanup: true
}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {
    exit: true
}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {
    exit: true
}));

function toSum(sum, item) {
    return sum + item;
}

var fs = require('fs'),
    util = require('util'),
    boardTree,
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

function makeBoard(boardIn) {
    var boardOut = {},
        pegCount;

    if (boardIn) {
        //copy
        boardOut.board = boardIn.board.map(function (ele) {
            return ele;
        });
        boardOut.numberOfPegs = -1;
    } else {
        //empty constructor
        boardOut.board = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        boardOut.numberOfPegs = 14;
    }

    boardOut.solved = false
    boardOut.children = [];
    return boardOut;
}
var counter = {
    loop: 0,
    boards: 1
};

function makeMoves(boardIn) {
    counter.loop += 1;
    console.log(counter);
    var childrenOut;

    function makeMove(boardInL, jumperPegIndex, removedPegIndex, landingSpaceIndex) {



        var jumperPeg = boardInL.board[jumperPegIndex],
            removedPeg = boardInL.board[removedPegIndex],
            landingSpace = boardInL.board[landingSpaceIndex],

            shouldMakeMove = removedPeg === 1 && jumperPeg === 1 && landingSpace === 0,
            newBoard, pegCount;
        //console.log(shouldMakeMove)
        if (shouldMakeMove) {
            //copy the board
            newBoard = makeBoard(boardInL);
            //then make the move
            newBoard.board[jumperPegIndex] = 0;
            newBoard.board[removedPegIndex] = 0;
            newBoard.board[landingSpaceIndex] = 1;

            //check are we done?
            pegCount = newBoard.board.reduce(toSum, 0);
            newBoard.numberOfPegs = pegCount;
            newBoard.solved = pegCount === 1;

            return newBoard;
        }

        return null;
    }



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
    boardIn.children = childrenOut
    //    boardIn.children = boardIn.children.concat(childrenOut)
    if (boardIn.children.length > 0 && counter.loop < 1000) {
        counter.boards += boardIn.children.length;
        boardIn.children.forEach(function (child) {
            makeMoves(child);
        });
    }
    //console.log(counter);
}

boardTree = makeBoard();
makeMoves(boardTree)
fs.writeFileSync('boardTree.json', util.inspect(boardTree, {
    depth: null
}), 'utf8');

//console.dir(boardTree, {
//    depth: null
//});
