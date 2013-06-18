// takes the game grid and returns player number of winner, 3 if tie, and 0 if no winner
function win(grid, playerNum){
	counterRow = 1;
	counterCol = 1;
	counterDiagF = 1;
	counterDiagB = 1;
	counterTie = 0;

  for (var i=0; i<3; i++){
  	// tally for diag wins
  	counterDiagF *= grid[i][i]
  	counterDiagB *= grid[i][2-i]
  	// tally for row or col wins
  	for (var j=0; j<3; j++){
  		counterRow *= grid[i][j]
  		counterCol *= grid[j][i]
  		counterTie += grid[i][j]
  	}
  	// check for row or col wins
  	var score = Math.pow(playerNum, 3);
  	if (counterRow == score || counterCol == score)
  		return playerNum;
  	counterRow = 1;
  	counterCol = 1;
  }
  // check for diag wins
  if (counterDiagF == score || counterDiagB == score)
  	return playerNum;
  if (counterTie == 13)
  	return 3;
  return 0;
}

$(function() {  // game start
	var turn = 1; // which player's turn it is
	var symbols = ["X", "O"];	
	var grid = [[0,0,0], [0,0,0], [0,0,0]]; //2d grid of the game board

	$('div.blank').on('click', function() {
		$(this).unbind('click');
		$(this).addClass(symbols[turn-1]);
		$(this).removeClass('blank');
		grid[$(this).closest('div.row').index()-2][$(this).index()] = turn; // fills the grid with the corresponding player number
		if (win(grid, turn) == 3)
			$('h2').prepend('Tie!');
		if (win(grid, turn) == 1 || win(grid, turn) == 2)
			$('h2').prepend('Player ' + turn + ' wins!');
		if (win(grid, turn) != 0){
			$('#refresh').show();
			$('div').unbind('click');
		}
		turn = (turn % 2) + 1;
	});

});