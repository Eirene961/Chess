import Piece from './Piece.js'
import Rook from './Rook.js'

class King extends Piece {
    constructor(color) {
        super(color, color === 'white' ? '♔' : '♚')
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

        // Castling
        if (!this.hasMoved) {
            // Kingside
            if (this.canCastle(boardService, row, col, 'kingside')) {
                moves.push({ row, col: col + 2 });
            }
            // Queenside
            if (this.canCastle(boardService, row, col, 'queenside')) {
                moves.push({ row, col: col - 2 });
            }
        }

        return moves;
    }

    canCastle(boardService, row, col, side) {
        const rookCol = side === 'kingside' ? 7 : 0;
        const rook = boardService.getPiece(row, rookCol);

        if (!rook || rook.constructor !== Rook || rook.hasMoved) {
            return false;
        }

        // Check empty squares between king and rook
        const step = side === 'kingside' ? 1 : -1;
        for (let c = col + step; c !== rookCol; c += step) {
            if (boardService.getPiece(row, c)) {
                return false;
            }
        }

        // Check squares king passes through are not under attack
        for (let c = col; c !== col + step * 3; c += step) {
            const clone = boardService.cloneBoard();
            const cloneService = new boardService.constructor(clone);
            cloneService.movePiece(row, col, row, c);
            if (cloneService.isCheck(this.color)) {
                return false;
            }
        }

        return true;
    }

    clone() {
        const c = new King(this.color);
        c.hasMoved = this.hasMoved;
        return c;
    }
}

export default King;