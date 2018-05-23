/* 
Info_151            :    Undergraduate information systems
Date                :        11  /   30/ 2017
Programmer Names    : Jake Taylor  , Noel Rajkumar , Palash Pandey
Project Description : This project is for the Final assignment for the Info_151 class for fall 2017.
 */



var currentPlayer = 0;
var points1 = 0;    // player 1 points
var points2 = 0;    // player 2 points
var player1Selections = new Array();
var player2Selections = new Array();
var random = [1 ,   2   ,   3   ,   4   ,   5   ,   6   ,   7   ,   8   ,9];
 
 

// all the winning conditions 
var winning = [
               [1,  2   ,3], // horizontal first line
               [4,  5   ,6], // horizontal second line
               [7,  8   ,9], // horizontal third line
               [1,  4   ,7], // vertical first line
               [2,  5   ,8], // vertical second line
               [3,  6   ,9], // vertical third line
               [1,  5   ,9],// diagonal one 
               [3,  5   ,7] // diagonal two 
           ];

/**
 * 
 * the drawGrid function draws the 3x3 grid for tick tac toe and intialtes the game function which is the main function for userinteraction 
 */

function drawGrid(){
 
    var bigDiv = document.getElementById('game'); 
    var table = document.createElement('table');
    var id = 1;
        while (bigDiv.hasChildNodes()) {
        bigDiv.removeChild(bigDiv.firstChild);
    }
    for (var i=0; i< 3; i++){
        var row = document.createElement('tr');
            
            for( var j=0; j<3; j++){            
                var col = document.createElement('td');
                col.id= id;
   
    var game = function(e){
        /* if player 1 is playing then take the id of the cell that player 1 
         * selected and put it into the player1Selections array. Also, put a X as 
         * the text inside the cell that player 1 selected.
         */ 
       
        var index = random.indexOf(parseInt(this.id));
        random.splice(index,1);
        
        var validMove = new Array();
        validMove.push(indexAi);
        //if (currentPlayer === 0 ){
                this.innerHTML = "X";
                player1Selections.push(parseInt(this.id));
                this.removeEventListener("click", arguments.callee); 
                currentPlayer = 1;
               
          //  }
        /* if player 2 is playing then take the id of the cell that player 2
         * selected and put it into the player2Selections array. Also, put a o as 
         * the text inside the cell that player 2 selected.
         */
        
           // if(currentPlayer ===1){
               // for(g=0;g<10; g++){
                var indexAi = Math.floor(Math.random() * (random.length)) + 0;
                if(indexAi){}
                console.log(random);
                console.log("id: " + random[indexAi]);
                console.log("index:" + indexAi);
                document.getElementById((random[indexAi])).innerHTML = "O";
                player2Selections.push(parseInt(random[indexAi]));   
                console.log(player2Selections);
                currentPlayer=0;
               // break;
           // }
            random.splice(indexAi,1);
        
      //  }
            // declare a boolean won      
            var won = checkWin();
            
         /*
          * check if its the winning condition 
          */ 
         
         // this is for checking for tie condition 
         if(player1Selections.length + player2Selections.length >= 9){
                // game over so reset the board and start a new game 
                reset();
                // make another grid for the new game
                drawGrid();
                // reload the page 
             
         }
        if (won){
            // if the currentPlayer while winning condition is met 
            // is player 1 then add a point on the scoreboard for player 1
                if(currentPlayer === 0){
                    points1++;
                }
                else {
                    points2++;
                }
                
                // update the score board with new pints 
                document.getElementById('player1').innerHTML = points1;
                document.getElementById('player2').innerHTML = points2;
                
                // game over so reset the board and start a new game 
                reset();
                // make another grid for the new game
                drawGrid();
            }
            // if winning condition is not met 
        else{
            // change the current player i.e. give the other player chance to move 
            if(currentPlayer === 0){
                currentPlayer = 1;
            }
            else{
                currentPlayer =0;
                
                //document.getElementsByTagName('td').removeEventListener('click', game);
                //  still need to figure out !!!!  how to make it unclickable
            }
        }
        };
        
        col.addEventListener('click', game);
        row.appendChild(col);
        id++; // give each cell unique id 
        
    
    };
        bigDiv.appendChild(table);
        table.appendChild(row);
    }
    
 }
// to reset the board 
function reset(){
    // start form the first player again 
    currentPlayer = 0;
    // make a new array for both the players selections 
    player1Selections = new Array();
    player2Selections = new Array();
    random = [1,2,3,4,5,6,7,8,9];
}


// check if the winning condition is met 
function checkWin() {
    // declare a boolean win
    var win = false;
    var playerSelections = new Array();

    if (currentPlayer === 0)
        playerSelections = player1Selections;
    else{
	playerSelections = player2Selections;
    }
    if (playerSelections.length >= 3) {
        // check if any 'winners' are also in your selections
        i = 0; 
        while(i < winning.length) {
            var sets = winning[i];  // winning hand
            var setFound = true;
            r = 0;
            while ( r < sets.length) {
                // check if number is in current players hand
                // if not, break, not winner
                var found = false;
                
                // players hand
                s = 0; 
                while (s < playerSelections.length) {
                    if (sets[r] === playerSelections[s]) {
                        found = true;
                        break;
                    }
                 s++;
                }

                // value not found in players hand
                // not a valid set, move on
                if (found === false) {
                    setFound = false;
                    break;
                }
             r++;
            }

            if (setFound === true) {
                win = true;
                break;
            }
         i++;
        }
    }

    return win;

}

window.onload = drawGrid;















