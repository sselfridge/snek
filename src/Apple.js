class Apple {

  constructor($el) {
    this.node = $('<img id="apple"></img>');
    this.node.attr('src', 'src/assets/apple.jpg');
    $el.append(this.node);
    const randomTop = Math.floor(Math.random() * 14) * 50;
    const randomLeft= Math.floor(Math.random() * 14) * 50;
    this.node.css({ top: randomTop, left: randomLeft });
  }

}
