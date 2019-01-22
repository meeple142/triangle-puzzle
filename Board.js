var boardCount = 0;
module.exports = class Board {
    constructor(boardIn) {
        if (boardIn) {
            //copy
            this.pegs = boardIn.pegs.map(p => p);
            this.pegCount = boardIn.pegCount;
        } else {
            //empty constructor
            this.pegs = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            this.pegCount = 14;
        }
        //unique Id
        this.id = boardCount;
        boardCount += 1;
    }

    clone() {
        return new Board(this);
    }

    doTransformation(moves) {
        let pegsOut = [];
        // for each move, do it
        moves.forEach((destination, start) => pegsOut[destination] = this.pegs[start]);
        //over wright
        this.pegs = pegsOut;

        //for chaining
        return this;
    }

    rotate() {
        var rotateMoves = [10, 11, 6, 12, 7, 3, 13, 8, 4, 1, 14, 9, 5, 2, 0];
        return this.doTransformation(rotateMoves);
    }

    flip() {
        var flipMoves = [0, 2, 1, 5, 4, 3, 9, 8, 7, 6, 14, 13, 12, 11, 10];
        return this.doTransformation(flipMoves);
    }

    //returns t/f, checks if the board passed in has the same pegs
    hasSamePegs(boardIn) {
        return this.pegs.every((peg, i) => peg === boardIn.pegs[i]);
    }



    getChildBoards() {
        const pegMoves = [
            //top to bottom right
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

            //top to bottom left
            [0, 1, 3],
            [3, 1, 0],
            [1, 3, 6],
            [6, 3, 1],
            [3, 6, 10],
            [10, 6, 3],

            [2, 4, 7],
            [7, 4, 2],
            [4, 7, 11],
            [11, 7, 4],

            [5, 8, 12],
            [12, 8, 5],


            //left to right
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


        //will return a copy ofthe board with the move done to it or null
        function makeMove(boardInL, jumperPegIndex, removedPegIndex, landingSpaceIndex) {
            var jumperPeg = boardInL.pegs[jumperPegIndex],
                removedPeg = boardInL.pegs[removedPegIndex],
                landingSpace = boardInL.pegs[landingSpaceIndex],

                shouldMakeMove = removedPeg === 1 && jumperPeg === 1 && landingSpace === 0,
                newBoard, pegCount;
            //console.log(shouldMakeMove)
            if (shouldMakeMove) {
                //copy the board
                newBoard = boardInL.clone();
                //then make the move
                newBoard.pegs[jumperPegIndex] = 0;
                newBoard.pegs[removedPegIndex] = 0;
                newBoard.pegs[landingSpaceIndex] = 1;

                //update the peg count here
                newBoard.pegCount -= 1;

                return newBoard;
            }

            return null;
        }


        var that = this;
        return pegMoves.reduce(function (children, move) {
            //will make a copy of the board with the move done to it or null
            var child = makeMove(that, move[0], move[1], move[2]);

            if (child !== null) {
                children.push(child);
            }

            return children;

        }, []);

    }
}