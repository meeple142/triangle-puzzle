const Board = require('./Board');
const Link = require('./Link');
const BoardList = require('./BoardList');

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
    nodes: boardList.list,
    links: links
}

function report(fileName, time, obj) {
    fs.writeFileSync(`${fileName}_${time}.json`, JSON.stringify(obj, null, 4), 'utf8');;
}

console.log("Number of solution states:", boardList.list[1].length);
console.log("Number of links:", links.length);

report('boards', time, graph.nodes);
report('links', time, graph.links);
report('graph', time, graph);