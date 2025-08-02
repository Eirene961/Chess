class Piece {
    constructor(color, symbol) {
        this.color = color; // "white" hoặc "black"
        this.symbol = symbol;
        this.hasMoved = false;
    }

    getPseudoLegalMoves(boardService, row, col) {
        throw new Error('getPseudoLegalMoves() must be implemented by subclass');
    }

    clone() {
        throw new Error('clone() must be implement by subclass');
    }
}

export default Piece;