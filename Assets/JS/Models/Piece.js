class Piece {
    constructor(ctx) {
        this.layout = allPieces[Math.floor(Math.random() * allPieces.length)];
        this.x = SQUARE_SIZE * 6;
        this.y = SQUARE_SIZE * -this.layout.length;
        this.width = SQUARE_SIZE;
        this.ctx = ctx;

        this.vx = 0;
        this.vy = this.width;

        this.pieceColor = piecesColors[Math.floor(Math.random() * piecesColors.length)];
    }

    draw() {
        this.ctx.save()

        this.layout.forEach((row, index) => {
            row.forEach((part, jindex) => {
                if (part === 1) {
                    this.ctx.fillStyle = this.pieceColor;
                    this.ctx.fillRect(this.x + this.width * index + 1, this.y + this.width * jindex + 1, this.width, this.width);
                    this.ctx.strokeStyle = "black";
                    this.ctx.lineWidth = 1;
                    this.ctx.strokeRect(this.x + this.width * index +1, this.y + this.width * jindex + 1, this.width, this.width);
                }
            })
        });

        this.ctx.restore()
    }

    move() {
        this.y += this.vy;
    }

    rotatePiece() {
        console.log(this.layout);
        this.layout = this.layout[0].map((val, index) => this.layout.map(row => row[index]).reverse());
        console.log(this.layout);
    }

    onKeyEvent(event) {
        switch (event.keyCode) {
            case KEY_DOWN:
                if (this.y + (this.layout[0].length + 1) * this.width < this.ctx.canvas.height) {
                    this.y += this.width
                } else {
                    this.y = this.ctx.canvas.height - this.layout[0].length * this.width
                }
                break;
            case KEY_UP:
                this.rotatePiece();
                break;
            case KEY_RIGHT:
                if (this.x + (this.layout.length + 1) * this.width < this.ctx.canvas.width) {
                    this.x += this.width
                } else {
                    this.x = this.ctx.canvas.width - this.layout.length * this.width
                }
                break;
            case KEY_LEFT:
                if (this.x - this.width > 0) {
                    this.x -= this.width
                } else {
                    this.x = 0
                }
                break;
        }
    }


    collidesWith(board) {


        return pieces.some(piece => {

            return piece.layout.some((section, sectionIndex) => {
          
                return section.some((square, squareIndex) => {
                    if (square === 1) {
                        return this.layout.some((fSection, fSectionIndex) => {

                            return fSection.some((fSquare, fSquareIndex) => {
                                if (fSquare === 1) {
                                    const squareX = piece.x + squareIndex * SQUARE_SIZE
                                    const squareY = piece.y + sectionIndex * SQUARE_SIZE
                                    const fSquareX = this.x + fSquareIndex * SQUARE_SIZE
                                    const fSquareY = this.y + fSectionIndex * SQUARE_SIZE
                                  

                                    if (fSquareY + SQUARE_SIZE === squareY && fSquareX === squareX) {
                                        // console.log({squareX, squareY, fSquareX, fSquareY});
  
                                        this.vy = 0;
                                        return true;
                                    }
                                }
                            })
                        })
                    }
                })
            })
        })
    }
}