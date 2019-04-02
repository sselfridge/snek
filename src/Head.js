// creates a constructor function - research ES6 classes
class Head {

  // this is what's called when you use the "new" keyword
  constructor($el) {
    this.node = $('<div id="head"></div>');
    this.currentDirection = 'right';
    this.SPEED = 500;

    this.tail = [];
    this.applesEaten = 5;

    $el.append(this.node);
    this.node.css({ top: 0, left: 0 });
    setTimeout(this.move.bind(this), this.SPEED);
  }

  // same as Head.prototype.move = function() {...}
  move() {
    let endGame = false;
    let direction = this.currentDirection;
    let position = this.node.position();
    let tail = this.tail;
    let applesEaten = this.applesEaten;

    // const applePosTop = $('#apple').position().top;
    // const applePosLeft = $('#apple').position().left;
    // console.log(`top: ${applePosTop}, left: ${applePosLeft}`);

    const newBody = new Body($('#board'), position.top, position.left);
    tail.push(newBody.node);
    console.log(tail);
    if (tail.length > applesEaten) {
      let oldBody = tail.shift();
      oldBody.hide();
    }


    console.log(`Moving ${direction} ${position.left},${position.top}`);
    switch (direction) {
      case 'right':
        position.left += 50;
        break;
      case 'left':
        position.left -= 50;
        break;
      case 'up':
        position.top -= 50;
        break;
      case 'down':
        position.top += 50;
        break;
      default:
        console.log("WHAT DID YOU DO, THIS SHOULDN'T HAPPEN");
        break;
    }

    //check if out of bounds
    if(position.top >= 700 || position.top < 0 || position.left >= 700 || position.left < 0){
      console.log("OUT OF BOUNDS, YOU LOSE");
      endGame = true;
    }
  

    
    if(endGame === false){
      this.node.css(position);
      setTimeout(this.move.bind(this), this.SPEED);
    } 
  }

}
