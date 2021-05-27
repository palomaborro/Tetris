class Game {
  constructor(tetris) {
    this.canvas = document.getElementById(tetris);
    this.canvas.width = COLUMNS * SQUARE_SIZE;
    this.canvas.height = ROWS * SQUARE_SIZE;
    this.ctx = this.canvas.getContext('2d');

    this.fps = 1000 / 1;
    this.drawInterval = undefined;

    this.piecesInView = [];


    //const theme = new Audio('./assets/sound/mw-theme.mp3')
    //theme.volume = 0.1

    //this.sounds = {
    // theme,
    // coin: new Audio('./assets/sound/coin.wav')
    //}
  }

  start() {
    if (!this.drawInterval) {
      this.startScreen();
      this.createNewPiece();
      //this.sounds.theme.play()
      this.drawInterval = setInterval(() => {
        this.clear()
        this.move();
        this.draw();      
        this.checkCollisions();
      }, this.fps);
    }
  }

  startScreen() {
    this.ctx.save()

    this.ctx.fillStyle = 'white';
    this.ctx.font = "20px 'Press Start 2P'";
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText("Press ENTER to Start", this.width / 2, this.height / 2);

    this.ctx.restore()
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  draw() {
    this.ctx.save()

    this.piecesInView.forEach((piece) => piece.draw());

    this.ctx.restore()
  }

  move() {
    let lastPiece = this.piecesInView[this.piecesInView.length - 1];

    lastPiece.move();

    if (lastPiece.y + (lastPiece.layout[0].length + 1) * lastPiece.width < this.ctx.canvas.height) {
      lastPiece.y += lastPiece.vy;
    } else {
      lastPiece.y = this.ctx.canvas.height - lastPiece.layout[0].length * lastPiece.width
      this.createNewPiece();
    }
  }

  onKeyEvent(event) {
    if (this.piecesInView.length > 0) {
      this.piecesInView[this.piecesInView.length - 1].onKeyEvent(event);
    }
  }

  checkCollisions() {
    const bottomPieces = this.piecesInView.slice(0, this.piecesInView.length - 1);
    if (this.piecesInView[this.piecesInView.length - 1].collidesWith(bottomPieces)) {
      this.createNewPiece();
    }
  }

  createNewPiece() {
    const newPiece = new Piece(this.ctx);
    this.piecesInView.push(newPiece);
  }
}