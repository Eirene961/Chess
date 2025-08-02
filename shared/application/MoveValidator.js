
class MoveValidator {
    constructor(boardService) {
        this.boardService = boardService;
    }

    getLegalMoves(piece, row, col) {
        const pseudo = piece.getPseudoLegalMoves(this.boardService, row, col);
        return pseudo.filter(m => {
            const clone = this.boardService.cloneBoard();
            const cloneService = new this.boardService.constructor(clone);
            cloneService.movePiece(row, col, m.row, m.col);
            return !cloneService.isCheck(piece.color);
        });
    }
}

export default MoveValidator;