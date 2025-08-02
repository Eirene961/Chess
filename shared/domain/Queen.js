import Piece from './Piece.js';

class Queen extends Piece {
    constructor(color) {
        super(color, color === 'white' ? '♕' : '♛');
    }

    getPseudoLegalMoves(boardService, row, col) {
        const moves = [];
        const direction = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],            [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        for (let [dr, dc] of direction) {
            let r = row + dr;
            let c = col + dc;
            while (boardService.inBounds(r, c)) {
                const target = boardService.getPiece(r, c);
                if (target === null) {
                    moves.push({ row: r, col: c });
                } else {
                    if (target.color !== this.color) {
                        moves.push({ row: r, col: c });
                    }
                    break;
                }
                r += dr;
                c += dc;
            }
        }

        return moves;
    }

    clone() {
        const c = new Queen(this.color);
        c.hasMoved = this.hasMoved;
        return c;
    }
}

export default Queen;