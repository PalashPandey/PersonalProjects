/* 
Info_151            :    Undergraduate information systems
Date                :        11  /   30/ 2017
Programmer Names    : Jake Taylor, Noel Rajkumar, Palash Pandey
Project Description : This project is for the Final assignment for the Info_151 class for fall 2017.

 */



var currentPlayer = 0;
var points1 = 0;    // player 1 points
var points2 = 0;    // player 2 points
var player1Selections = new Array();
var player2Selections = new Array();

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

var random = new Array();
for(var i = 1   ; i <= 9    ; i++) {
  if(   player1Selections.indexOf(i) !== -1 ) {
    random.push(i);
  }
}

function drawGrid(){
    var bigDiv = document.getElementById('game');  
    var id = 1;
    
    // Deleting the rows and coloumns after game resets 
        while ( bigDiv.hasChildNodes()  ) {
        bigDiv.removeChild(bigDiv.firstChild);
    }
    for (   var i=0; i< 3; i++ ){
        var row = document.createElement('tr');
            for( var j=0; j<3; j++){            
                var col = document.createElement('td');
                col.id= id;
   
    var game = function(e){
        /* if player 1 is playing then take the id of the cell that player 1 
         * selected and put it into the player1Selections array. Also, put a X as 
         * the text inside the cell that player 1 selected.
         */   if (currentPlayer === 0 ){
                this.innerHTML = 'X';
                player1Selections.push(parseInt(this.id));
                // to make it unclickable
                this.removeEventListener("click", arguments.callee);
            }
        /* if player 2 is playing then take the id of the cell that player 2
         * selected and put it into the player2Selections array. Also, put a o as 
         * the text inside the cell that player 2 selected.
         */
        
            else{
                this.innerHTML = 'O';
                player2Selections.push(parseInt(this.id));
                //  to make it unclickable
                this.removeEventListener("click", arguments.callee); 
            }
           
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
                //col.removeEventListener("click", game);
                // document.getElementsByTagName('td').removeEventListener('click', game);
                //  still need to figure out !!!!  how to make it unclickable
            }
        }
        };
        
        col.addEventListener('click', game);
        row.appendChild(col);
        id++; // give each cell unique id 
        
    };
        bigDiv.appendChild(row);
    }
    
 }
// to reset the board 
function reset(){
    // start form the first player again 
    currentPlayer = 0;
    // make a new array for both the players selections 
    player1Selections = new Array();
    player2Selections = new Array();
}


// check if the winning condition is met 
function checkWin() {
    // declare a boolean win
 
    var win = false;
    var playerSelections = new Array();

    if (currentPlayer === 0){
        playerSelections = player1Selections;
    }
    else{
	playerSelections = player2Selections;
    }
    if (playerSelections.length >= 3) {
        // check if any 'winners' are also in your selections
        i = 0; 
        while(i < winning.length) {
            var sets = winning[i];  // winning hand
            var setFound = true;
            //going through the winning array by rows
            r = 0;
            while ( r < sets.length) {
                // check if number is in current players hand
                // if not, break, not winner
                var found = false; // players hand
               
                //going through the winning array by coloumns
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















