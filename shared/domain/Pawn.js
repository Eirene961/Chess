import Piece from './Piece.js';

class Pawn extends Piece {
    constructor(color) {
        super(color, color === 'white' ? '♙' : '♟');
    }

    getPseudoLegalMoves(boardService, row, col) {
        const moves = [];
        const direction = this.color === 'white' ? -1 : 1;

        if (boardService.isEmpty(row + direction, col)) {
            moves.push({ row: row + direction, col });

            const startRow = this.color === 'white' ? 6 : 1;
            if (row === startRow && boardService.isEmpty(row + 2 * direction, col)) {
                moves.push({ row: row + 2 * direction, col });
            }
        }

        for (let dc of [-1, 1]) {
            const targetRow = row + direction;
            const targetCol = col + dc;
            const target = boardService.getPiece(targetRow, targetCol);
            if (target && target.color !== this.color) {
                moves.push({ row: targetRow, col: targetCol });
            }
        }

        if (boardService.enPassantTarget) {
            const ep = boardService.enPassantTarget;
            if (Math.abs(ep.col - col) === 1 && ep.row === row + direction) {
                moves.push({ row: ep.row, col: ep.col });
            }
        }
        
        return moves;
    }

    clone() {
        const c = new Pawn(this.color);
        c.hasMoved = this.hasMoved;
        return c;
    }
}

export default Pawn;