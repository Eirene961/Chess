import Piece from './Piece.js';

class Knight extends Piece {
    constructor(color) {
        super(color, color === 'white' ? '♘' : '♞');
    }

    getPseudoLegalMoves(boardService, row, col) {
        const moves = [];
        const directions = [
            [-1, -2], [-2, -1], [-2, 1], [-1, 2],
            [1, -2], [2, -1], [2, 1], [1, 2]
        ];
        
        for (let [dr, dc] of directions) {
            let r = row + dr;
            let c = col + dc;
            if (boardService.inBounds(r, c)) {
                const target = boardService.getPiece(r, c);
                if (target === null) {
                    moves.push({ row: r, col: c });
                } else {
                    if (target.color !== this.color) {
                        moves.push({ row: r, col: c });
                    }
                }
            }
        }

        return moves;
    }

    clone() {
        const c = new Knight(this.color);
        c.hasMoved = this.hasMoved;
        return c;
    }
}

export default Knight;