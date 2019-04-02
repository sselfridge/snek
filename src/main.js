$(document).ready(function () {
  const head = new Head($('#board'));
  const apple = new Apple($('#board'));

  $('body').on('keydown', function (e) {
    switch (e.keyCode) {
      case 37:
        console.log('pressed left');
        if(head.currentDirection != 'right') head.currentDirection = 'left';
        break;
      case 39:
        console.log('pressed right');
        if(head.currentDirection != 'left') head.currentDirection = 'right';
        break;
      case 38:
        console.log('pressed up');
        if(head.currentDirection != 'down') head.currentDirection = 'up';
        break;
      case 40:
        console.log('pressed down');
        if(head.currentDirection != 'up') head.currentDirection = 'down';
        break;

      default:
        break;
    }


  });


});
