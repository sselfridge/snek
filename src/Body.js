class Body {

    constructor($el, top, left,tile) {
      this.node = $('<div class="body"></div>');
      $el.append(this.node);
      this.node.css({ top: top, left: left });
      this.node.addClass(tile);
      this.age = 0;
      //TODO - set body Image to appriate snake tile
    }
  
  }
  