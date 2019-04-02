$(document).ready(function () {
  const head = new Head($('#board'));
  const apple = new Apple($('#board'));

  $('body').on('keydown', function (e) {

    //moved this turn is reset to false at the beginning of the game loop
    // ensures only one change of direction can be made per move
    if (head.movedThisTurn === false) {
      // head.prevDirection = head.currentDirection;
      switch (e.keyCode) {
        case 37:
          // console.log('pressed left');
          if (head.currentDirection != 'right') {
            head.currentDirection = 'left';
            head.prevDirection = head.currentDirection;
          }
          head.movedThisTurn = true;
          break;
        case 39:
          // console.log('pressed right');
          if (head.currentDirection != 'left') {
            head.currentDirection = 'right';
            head.prevDirection = head.currentDirection;
          }
          head.movedThisTurn = true;
          break;
        case 38:
          // console.log('pressed up');
          if (head.currentDirection != 'down') {
            head.currentDirection = 'up';
            head.prevDirection = head.currentDirection;
          }
          head.movedThisTurn = true;
          break;
        case 40:
          // console.log('pressed down');
          if (head.currentDirection != 'up') {
            head.currentDirection = 'down';
            head.prevDirection = head.currentDirection;
          }
          head.movedThisTurn = true;
          break;

        default:
          break;
      }
    }


  });


});
