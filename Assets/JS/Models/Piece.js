class Piece {
    constructor(ctx) {
        this.layout = [...allPieces[Math.floor(Math.random() * allPieces.length)]];
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
                    this.ctx.fillRect(this.x + this.width * jindex, this.y + this.width * index, this.width, this.width);
                    this.ctx.strokeStyle = "black";
                    this.ctx.lineWidth = 1;
                    this.ctx.strokeRect(this.x + this.width * jindex, this.y + this.width * index, this.width, this.width);
                }
            })
        });

        this.ctx.restore()
    }

    move() {}

    rotatePiece() {

        this.layout = this.layout[0].map((val, index) => this.layout.map(row => row[index]).reverse());
   
    }

    collidesWith(pieces) {

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