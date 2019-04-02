class Body {

    constructor($el, top, left) {
      this.node = $('<div class="body"></div>');
      $el.append(this.node);
      this.node.css({ top: top, left: left });
      this.age = 0;
    }
  
  }
  