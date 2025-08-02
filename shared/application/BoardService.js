import Queen from '../domain/Queen.js'
import King from '../domain/King.js'
import Pawn from '../domain/Pawn.js';

class BoardService {
    constructor(board) {
        this.board = board;
        this.enPassantTarget = null;
    }

    inBounds(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    isEmpty(row, col) {
        return this.inBounds(row, col) && this.board.grid[row][col] === null;
    }

    getPiece(row, col) {
        return this.inBounds(row, col) ? this.board.grid[row][col] : null;
    }

    movePiece(fromRow, fromCol, toRow, toCol) {
        const piece = this.getPiece(fromRow, fromCol);
        this.board.grid[toRow][toCol] = piece;
        this.board.grid[fromRow][fromCol] = null;

        // Promotion
        if (piece.constructor === Pawn && (toRow === 0 || toRow === 7)) {
            const promotedPiece = piece.color === 'white'
                ? new Queen('white')
                : new Queen('black');
            this.board.grid[toRow][toCol] = promotedPiece;
        }

        // Castling
        if (piece.constructor === King && Math.abs(toCol - fromCol) === 2) {
            const rookFromCol = toCol === 6 ? 7 : 0;
            const rookToCol = toCol === 6 ? 5 : 3;
            const rook = this.getPiece(fromRow, rookFromCol);

            this.board.grid[fromRow][rookToCol] = rook;
            this.board.grid[fromRow][rookFromCol] = null;

            rook.hasMoved = true;
        }

        // En Passant capture
        if (piece.constructor === Pawn && toRow === this.enPassantTarget?.row && toCol === this.enPassantTarget.col) {
            const dir = piece.color === 'white' ? 1 : -1;
            this.board.grid[toRow + dir][toCol] = null; // Remove captured pawn
        }

        // If pawn moves 2 squares
        if (piece.constructor === Pawn && Math.abs(toRow - fromRow) === 2) {
            this.enPassantTarget = { row: (fromRow + toRow) / 2, col: toCol };
        } else {
            this.enPassantTarget = null;
        }

        piece.hasMoved = true;
    }

    isCheck(color) {
        const kingPos = this.findKing(color);
        if (!kingPos) {
            return false;
        }

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = this.getPiece(i, j);
                if (piece && piece.color !== color) {
                    const moves = piece.getPseudoLegalMoves(this, i, j);
                    if (moves.some(m => m.row === kingPos.row && m.col === kingPos.col)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    findKing(color) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = this.getPiece(i, j);
                if (piece && piece.symbol === (color === 'white' ? '♔' : '♚')) {
                    return { row: i, col: j};
                }
            }
        }
        return null;
    }

    isCheckmate(color) {
        if(!this.isCheck(color)) {
            return false;
        }

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = this.getPiece(i, j);
                if (piece && piece.color === color) {
                    const moves = piece.getPseudoLegalMoves(this, i, j);
                    for (let move of moves) {
                        const clone = this.cloneBoard();
                        const cloneService = new this.constructor(clone);
                        cloneService.movePiece(i, j, move.row, move.col);

                        if (!cloneService.isCheck(color)) {
                            return false; // Có ít nhất 1 move thoát check
                        }
                    }
                }
            }
        }

        return true;
    }

    isStalemate(color) {
        if (this.isCheck(color)) {
            return false;
        }

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = this.getPiece(i, j);
                if (piece && piece.color === color) {
                    const moves = piece.getPseudoLegalMoves(this, i, j);
                    if (moves.length > 0) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    cloneBoard() {
        const newBoard = new this.board.constructor();
        newBoard.grid = this.board.grid.map(row =>
            row.map(piece => piece ? piece.clone() : null)
        );
        return newBoard;
    }
}

export default BoardService;