const Board = require('./Board');

module.exports = class BoardList {
    constructor() {
        this.boardCount = -1;
        this.boardGroupsLists = new Array(15).fill(true).map(e => []);
    }
    get list() {
        return this.boardGroupsLists;
    }

    getTotalBoardCount() {
        return this.boardGroupsLists.reduce((sum, list) => sum + list.length, 0)
    }
    getBoardsByPegCount(pegCount) {
        //get the sub list
        var boardGroupList = this.boardGroupsLists[pegCount];
        return boardGroupList.map(boardGroup => boardGroup.boards[0]);
    }

    addBoard(boardIn) {
        //keep track
        this.boardCount += 1;

        //make copies of board for all the symmetries
        var boardGroup = {
            id: boardIn.id,
            boards: [
                boardIn.clone(), //i
                boardIn.clone().rotate(), //r
                boardIn.clone().rotate().rotate(), //r2
                boardIn.clone().flip(), //f
                boardIn.clone().flip().rotate(), //fr
                boardIn.clone().flip().rotate().rotate(), //fr2
            ]
        }

        //put it in the correct list
        this.boardGroupsLists[boardIn.pegCount].push(boardGroup);
    }

    isOnList(boardIn) {
        //get the sub list
        var boardGroupList = this.boardGroupsLists[boardIn.pegCount];

        //see if any boardGroup has a board that matches
        var boardGroupMatch = boardGroupList.find(boardGroup =>
            boardGroup.boards.some(board =>
                board.hasSamePegs(boardIn)
            )
        );

        return boardGroupMatch === undefined ? null : boardGroupMatch.id;
    }

}