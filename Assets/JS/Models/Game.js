class Game {
  constructor(tetris) {
    this.canvas = document.getElementById(tetris);
    this.canvas.width = COLUMNS * SQUARE_SIZE;
    this.canvas.height = ROWS * SQUARE_SIZE;
    this.grid = [];
    this.ctx = this.canvas.getContext('2d');

    this.fps = 1000 / 2;
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
      this.grid = this.getEmptyGrid();
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

  gameOver() {
    clearInterval(this.drawInterval)

    this.ctx.save()
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.width)

    this.ctx.font = "20px 'Press Start 2P'";
    this.ctx.fillStyle = 'white'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(
      'Game over!',
      this.canvas.width / 2,
      this.canvas.height / 2,
    )
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

    if (lastPiece.y + (lastPiece.layout.length + 1) * lastPiece.width < this.ctx.canvas.height) {
      lastPiece.y += lastPiece.vy;
    } else {
      lastPiece.y = this.ctx.canvas.height - lastPiece.layout.length * lastPiece.width
      this.placeInGrid(this.piecesInView[this.piecesInView.length - 1]);
      this.deleteFullLines();
      console.log(this.grid);
      this.createNewPiece();
    }
  }

  onKeyEvent(event) {
    if (this.piecesInView.length > 0) {
      const lastPiece = this.piecesInView[this.piecesInView.length - 1];
      switch (event.keyCode) {
        case KEY_DOWN:
          const bottomPieces = this.piecesInView.slice(0, this.piecesInView.length - 1);
          if (!lastPiece.collidesWith(bottomPieces)) {
            if (lastPiece.y + (lastPiece.layout.length + 1) * lastPiece.width < lastPiece.ctx.canvas.height) {
              lastPiece.y += lastPiece.width
            } else {
              lastPiece.y = lastPiece.ctx.canvas.height - lastPiece.layout.length * lastPiece.width
            }
          } else {
            this.placeInGrid(this.piecesInView[this.piecesInView.length - 1]);
            this.deleteFullLines();
            console.log(this.grid);
            this.createNewPiece();
          }
          break;
        case KEY_UP:
          lastPiece.rotatePiece();
          break;
        case KEY_RIGHT:
          if (lastPiece.x + (lastPiece.layout[0].length + 1) * lastPiece.width < lastPiece.ctx.canvas.width) {
            lastPiece.x += lastPiece.width
          } else {
            lastPiece.x = lastPiece.ctx.canvas.width - lastPiece.layout[0].length * lastPiece.width
          }
          break;
        case KEY_LEFT:
          if (lastPiece.x - lastPiece.width > 0) {
            lastPiece.x -= lastPiece.width
          } else {
            lastPiece.x = 0
          }
          break;
      }
    }
  }

  checkCollisions() {
    const bottomPieces = this.piecesInView.slice(0, this.piecesInView.length - 1);
    if (this.piecesInView[this.piecesInView.length - 1].collidesWith(bottomPieces)) {
      this.placeInGrid(this.piecesInView[this.piecesInView.length - 1]);
      this.deleteFullLines();
      console.log(this.grid);
      this.createNewPiece();
    }
  }

  getEmptyGrid() {
    return Array.from({
      length: ROWS
    }, () => Array(COLUMNS).fill(0));
  }

  placeInGrid(piece) {
    piece.layout.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          this.grid[y + piece.y / piece.width][x + piece.x / piece.width] = 1;
        }
      });
    });
  }

  findFullRow() {
    return this.grid.findIndex(column => {
      return column.every(piece => piece === 1);
    });
  }

  clearLine(index) {
    this.grid.splice(index, 1);
    this.grid.unshift(Array(COLUMNS).fill(0));
    this.piecesInView.forEach(piece => {
      const i = piece.layout.findIndex((row, rowIndex) => {
        console.log(piece.y / piece.width);
        return (piece.y / piece.width) + rowIndex === index;

      });
      console.log(i);
      if (i !== -1) {
        piece.layout.splice(i, 1);
      }
    })
  }

  deleteFullLines() {
    let index = this.findFullRow();
    while (index !== -1) {
      this.clearLine(index);
      this.lowerLine();
      index = this.findFullRow();
    }
  }

  lowerLine() {
    this.piecesInView.forEach(piece => {
      piece.y = piece.y + SQUARE_SIZE;
    });
  }

  createNewPiece() {
    const newPiece = new Piece(this.ctx);
    this.piecesInView.push(newPiece);
  }
}