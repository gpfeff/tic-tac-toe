
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

var player1 = 'veggies';
var player2 = 'junkfood';
var currentPlayer = null;

var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
  $('#turn-label').text(currentPlayer);
};

var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.

  if ( spaces[0] === spaces[1] && spaces[1] === spaces[2]
    || spaces[3] === spaces[4] && spaces[4] === spaces[5]
    || spaces[6] === spaces[7] && spaces[7] === spaces[8]
    //Above are horozional conditions for winning\\
    || spaces[0] === spaces[3] && spaces[3] === spaces[6]
    || spaces[1] === spaces[4] && spaces[4] === spaces[7]
    || spaces[2] === spaces[5] && spaces[5] === spaces[8]
    //Above are vertical conditions for winning\\
    || spaces[0] === spaces[4] && spaces[4] === spaces[8]
    || spaces[2] === spaces[4] && spaces[4] === spaces[6]
    //Above are diagonal conditions for winning\\

  )
  {

    console.log('somebody won');
    // Below triggers 'game-win' event, which is being listened for//
    $(document).trigger('game-win');
  }
};

$(document).on('click', '#board .space', function (e) {
  var spaceNum = $(e.currentTarget).index();
  console.log('You clicked on space #' + spaceNum);
  if (spaces[spaceNum]) {
    alert("This space has been taken!")
  } else {

  // Mark the space with the current player's name
  // TODO: Don't mark it unless the space is blank
  spaces[spaceNum] = currentPlayer;
  // Add class to elem so css can take care of the visuals
  $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);
}
  checkForWinner();
  setNextTurn();
});


$(document).on('game-win', function (e, winner) {
  //Setting currentPlayer to variable Winnner, and passing it into the event function below //
  var winner = currentPlayer;
  alert(winner + " , You've won the game!");
});

// Start the game
setNextTurn();
