
class Game {
    constructor(boardService) {
        this.boardService = boardService;
        this.turn = 'white'; // white or black
        this.status = 'ongoing'; // ongoing, check, checkmate, stalemate, draw
    }

    nextTurn() {
        this.turn = this.turn === 'white' ? 'black' : 'white';
    }

    updateStatus() {
        if (this.boardService.isCheckmate(this.turn)) {
            this.status = 'checkmate';
        } else if (this.boardService.isStalemate(this.turn)) {
            this.status = 'stalemate';
        } else if (this.boardService.isCheck(this.turn)) {
            this.status = 'check';
        } else {
            this.status = 'ongoing';
        }
    }
}

export default Game;