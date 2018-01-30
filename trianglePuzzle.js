/*eslint-env node*/
/*eslint no-undef:2, no-unused-vars:0, no-console:0*/
//process.stdin.resume(); //so the program will not close instantly


function toSum(sum, item) {
    return sum + item;
}

function makeBoardList(){
   var listOut = [],
   rowCount = 15;
   
   for(i = 0; i < rowCount; ++i){
      listOut.push([]);
   }
   
   return listOut;
}

var row, index,
    fs = require('fs'),
    util = require('util'),
    boardList = makeBoardList(),
    links = [],
    boardCount = 0,
    boardStateCount = 1,
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
    var boardOut = {};
        
        //incrament the number of boards and make id
							boardCount += 1;
        boardOut.id = boardCount; 

    if (boardIn) {
        //copy
        boardOut.pegs = boardIn.pegs.map(function (ele) {
            return ele;
        });
    } else {
        //empty constructor
        boardOut.pegs = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    }

    return boardOut;
}


function makeLink(parentId, childId){
   links.push({
      parent: parentId,
      child: childId
   })
}

function getChildBoards(boardIn) {
    var childrenOut;

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
            newBoard = makeBoard(boardInL);
            //then make the move
            newBoard.pegs[jumperPegIndex] = 0;
            newBoard.pegs[removedPegIndex] = 0;
            newBoard.pegs[landingSpaceIndex] = 1;

            return newBoard;
        }

        return null;
    }



     return moves.reduce(function (children, move) {
            //will make a copy ofthe board with the move done to it or null
            var child = makeMove(boardIn, move[0], move[1], move[2]);
            
            if(child !== null){
               children.push(child);
            }
            
            return children; 
            
        }, []);

}

// make sure every peg matches
function boardsMatch(a,b){

   return a.pegs.every((peg, i)=> peg === b.pegs[i]);

}



// Add first board to board list
boardList[14].push(makeBoard());
var childBoards, childId;

// loop the rows in boardList, the row value means the number of pegs thoes boards have
// this is to speed up checking if a board state already exsitis
for(row = 14; row > 0; --row){
    console.log('number of boards:', boardCount);
    console.log('number of board states:', boardStateCount);
    console.log();
    for(index = 0; index < boardList[row].length ; ++index){
        
        //get the Childboards
        childBoards = getChildBoards(boardList[row][index]);
        childBoards.forEach((childBoard)=>{
        
        	    //find the match if it has one
            var dupBoard = boardList[row - 1].find(boardListBoard=>{
            			return boardsMatch(childBoard, boardListBoard)
            })
        	
        				// no dup
        				if(typeof dupBoard === "undefined"){
        					   childId = childBoard.id;
        					   //add to boardList
        					   boardList[row - 1].push(childBoard) 
        					   boardStateCount += 1;
        				} else {
        					   childId = dupBoard.id;
        				}
        				
           //make link with correct ids
           	makeLink(boardList[row][index].id, childId);	
        })
    }
}


console.log("Number of solution states:", boardList[1].length)
console.log("Number of links:", links.length)

fs.writeFileSync('states.json', JSON.stringify(boardList, null, 4), 'utf8');
fs.writeFileSync('links.json', JSON.stringify(links, null, 4), 'utf8');

