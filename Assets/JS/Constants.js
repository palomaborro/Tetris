const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const KEY_DOWN = 40;
const COLUMNS = 14;
const ROWS = 25;
const SQUARE_SIZE = 25;
// const LINES_PER_LEVEL = 10;

const oPiece = [
    [1, 1],
    [1, 1]
];

const iPiece = [
    [1, 1, 1, 1],   
];

const zPiece = [
    [1,1,0],
    [0,1,1]
];

const jPiece = [
    [1,1,1],
    [0,0,1]
];

const lPiece = [
    [1,1,1],
    [1,0,0]
];

const sPiece = [
    [0,1,1],
    [1,1,0]
];

const tPiece = [
    [1,1,1],
    [0,1,0]
];

const allPieces = [oPiece, iPiece, zPiece, jPiece, lPiece, sPiece, tPiece];

const piecesColors = ['#FF8600', '#FF4CE7', '#F71D1D', '#A47CFF', '#53FF70', '#47D7FD', '#FCFC00'];