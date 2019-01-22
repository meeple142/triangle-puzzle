const Board = require('./Board');
const Link = require('./Link');
const BoardList = require('./BoardList');
const report = require('./report');

//make the first board
var firstBoard = new Board();
// make the boardList
var boardList = new BoardList();

//make links List
var links = [];

//add the first board to the list
boardList.addBoard(firstBoard);

//loop all the peg counts 14 to 2. don't need to do 1s
for (let i = 14; i > 1; --i) {
    //get the boards with i pegs (parent boards)
    let parentsBoards = boardList.getBoardsByPegCount(i);
    console.log(`Starting boards with ${i} pegs. Board count:${parentsBoards.length}`)
    //for each parent board
    parentsBoards.forEach(function (parentBoard) {
        //find the children boards
        let childBoards = parentBoard.getChildBoards();

        //for each child board
        childBoards.forEach(function (childBoard) {
            //check if on list
            let boardId = boardList.isOnList(childBoard);

            //if not on list
            if (boardId === null) {
                //add to list
                boardList.addBoard(childBoard);
                //save id
                boardId = childBoard.id;
            }

            //make link between each parent board and child board id
            links.push(new Link(parentBoard.id, boardId, childBoard.pegCount));
        })
    })
}



const time = Date.now();
const graph = {
    nodes: boardList.listByPegCount,
    links: links
}

console.log("Number of solution states:", boardList.getBoardsByPegCount(1).length);
console.log("Total Number of boards:", boardList.getTotalBoardCount());
console.log("Number of links:", links.length);

// report('full', time, boardList.debugList);
report('boards', time, graph.nodes);
report('links', time, graph.links);
report('graph', time, graph);