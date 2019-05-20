// creates a constructor function - research ES6 classes
const tileSize = 20;
class Head {

  // this is what's called when you use the "new" keyword
  constructor($el) {
    this.node = $('<div id="head"></div>');
    this.currentDirection = 'right';
    this.prevDirection = 'right';
    this.SPEED = 75;

    this.highScore = 0;
    this.endGame = false;

    this.tail = [];
    this.applesEaten = 5;

    this.movedThisTurn = false;

    $el.append(this.node);
    this.node.css({
      top: 0,
      left: 0
    });
    setTimeout(this.move.bind(this), this.SPEED);
  }

  //returns true if the position (top,left) is located in any of the body elements
  checkForBody(tail, top, left) {
    let collision = false;
    tail.forEach(segment => {
      let position = segment.position();
      if (top === position.top && left === position.left) {
        collision = true;
      }
    });
    return collision;
  }

  // same as Head.prototype.move = function() {...}
  move() {
    let direction = this.currentDirection;
    let prev = this.prevDirection;
    let position = this.node.position();
    let tail = this.tail;
    let applesEaten = this.applesEaten;
    this.movedThisTurn = false;

    // //TODO: Tell body what direction we're moving
    // if(direction === 'left')

    let tile;
    if (prev === direction) {
      if (prev === 'left' || prev === 'right') {
        tile = 'horzi';
      } else {
        tile = 'vert';
      }
    } else {
      if ((prev === 'down' && direction === 'right') || (prev === 'left' && direction === 'up')) {
        tile = 'right-up';
      } else if ((prev === 'right' && direction === 'up') || (prev === 'down' && direction === 'left')) {
        tile = 'left-up';
      } else if ((prev === 'right' && direction === 'down') || (prev === 'up' && direction === 'left')) {
        tile = 'left-down';
      } else if ((prev === 'left' && direction === 'down') || (prev === 'up' && direction === 'right')) {
        tile = 'right-down';
      } else {
        console.log('ERROR: SHOULD NOT BE HERE');
      }
      this.prevDirection = direction;
    }



    const newBody = new Body($('#board'), position.top, position.left, tile);

    tail.push(newBody.node);
    // console.log(tail);
    if (tail.length > applesEaten) {
      let oldBody = tail.shift();
      // oldBody.hide();
      oldBody.remove();
      //delete body element (or Z axis it)
    }
  

    // console.log(`Moving ${direction} ${position.left},${position.top}.  : Previous Direction:${this.prevDirection}`);
    // if (direction != this.prevDirection) console.log(`CHANGE DIRECTIONS`);
    switch (direction) {
      case 'right':
        position.left += tileSize;
        break;
      case 'left':
        position.left -= tileSize;
        break;
      case 'up':
        position.top -= tileSize;
        break;
      case 'down':
        position.top += tileSize;
        break;
      default:
        console.log("WHAT DID YOU DO, THIS SHOULDN'T HAPPEN");
        break;
    }

    //check if we've eaten an apple
    const applePosTop = $('#apple').position().top;
    const applePosLeft = $('#apple').position().left;

    if (position.top === applePosTop && position.left === applePosLeft) {
      let randTop = Math.floor(Math.random() * 14) * tileSize;
      let randLeft = Math.floor(Math.random() * 14) * tileSize;
      while (this.checkForBody(tail, randTop, randLeft)) {
        randTop = Math.floor(Math.random() * 14) * tileSize;
        randLeft = Math.floor(Math.random() * 14) * tileSize;
      }
      $('#apple').css({
        top: randTop,
        left: randLeft
      });
      this.applesEaten = this.applesEaten + 5;
      let score = parseInt($('#score').text());
      $('#score').text(`${++score}`);
    }

    let headOnBody = this.checkForBody(tail, position.top, position.left);

    if (headOnBody === true) {
      this.endGame = true;
      // console.log('HIT THE BODY, YOU LOSE');
    }

    //check if out of bounds - end game if so
    if (position.top >= tileSize * 14 || position.top < 0 || position.left >= tileSize * 14 || position.left < 0) {
      // console.log("OUT OF BOUNDS, YOU LOSE");
      this.endGame = true;
    }


    //
    if (this.endGame === false) {
      this.node.css(position);
      setTimeout(this.move.bind(this), this.SPEED);
    } else {
      // console.log(`GAME OVER!!! - high score and show endGame popup`);
      let score = parseInt($('#score').text());
      if (score > this.highScore) {
        this.highScore = score;
      }



      //hide the last tail piece since it was overwriting the dead-snek
      let firstTail = this.tail.pop();
      firstTail.hide();


      $('#endScore').text(`${score}`);
      $('#highScore').text(`${this.highScore}`);
      $('#endGame').show();
    }
  }

}