$(document).ready(function () {
  let head = new Head($('#board'));
  let apple = new Apple($('#board'));

  $('#endGame').hide();

  $('body').on('keydown', function (e) {  
    //moved this turn is reset to false at the beginning of the game loop
    // ensures only one change of direction can be made per move
    if (head.movedThisTurn === false) {
      console.log(`keyPressed: ${e.keyCode}`);
      // head.prevDirection = head.currentDirection;
      switch (e.keyCode) {
        case 37:
          // console.log('pressed left');
          if (head.currentDirection != 'right') {
            head.prevDirection = head.currentDirection;
            head.currentDirection = 'left';
          }
          head.movedThisTurn = true;
          break;
        case 39:
          // console.log('pressed right');
          if (head.currentDirection != 'left') {
            head.prevDirection = head.currentDirection;
            head.currentDirection = 'right';
          }
          head.movedThisTurn = true;
          break;
        case 38:
          // console.log('pressed up');
          if (head.currentDirection != 'down') {
            head.prevDirection = head.currentDirection;
            head.currentDirection = 'up';
          }
          head.movedThisTurn = true;
          break;
        case 40:
          // console.log('pressed down');
          $('#endGame').hide();
          if (head.currentDirection != 'up') {
            head.prevDirection = head.currentDirection;
            head.currentDirection = 'down';
          }
          head.movedThisTurn = true;
          break;

        default:
          break;
      }
    }


  });

  $('#reset').click(function(){
    //delete head
    //delete apple
    $("#head").remove();
    $('.body').remove();
    $('#apple').remove();

    head = new Head($('#board'));
    apple = new Apple($('#board'));

    let score = parseInt($('#score').text());
    $('#score').text(`0`);

    $("#endGame").hide();

  });
  

});
