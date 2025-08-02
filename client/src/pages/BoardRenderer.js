
class BoardRenderer {
    constructor(board, boardService, moveValidator, game) {
        this.board = board;
        this.boardService = boardService;
        this.moveValidator = moveValidator;
        this.game = game;
        this.selectedPiece = null;
        this.validMoves = [];
    }

    renderHTML() {
        const boardDiv = document.getElementById('chessboard');
        boardDiv.innerHTML = '';

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.classList.add((i + j) % 2 === 0 ? 'white' : 'black');
                square.dataset.row = i;
                square.dataset.col = j;

                // Highlight selectedPiece
                if (this.selectedPiece && this.selectedPiece.row === i && this.selectedPiece.col === j) {
                    square.classList.add('highlight');
                }

                // Highlight valid moves
                if (this.validMoves.some(m => m.row === i && m.col === j)) {
                    square.classList.add('highlight-move');
                }

                const piece = this.board.grid[i][j];
                if (piece) {
                    square.textContent = piece.symbol;
                }

                square.addEventListener('click', () => this.handleClick(i, j));

                boardDiv.appendChild(square);
            }
        }
    }

    handleClick(row, col) {
        const piece = this.board.grid[row][col];

        if (this.selectedPiece && this.validMoves.some(m => m.row === row && m.col === col)) {
            // Move piece
            this.boardService.movePiece(this.selectedPiece.row, this.selectedPiece.col, row, col);

            // Switch turn
            this.game.nextTurn();
            
            // Update status
            this.game.updateStatus();

            if (this.game.status === 'checkmate') {
                alert(`${this.game.turn} is checkmated! Game over.`)
            } else if (this.game.status === 'stalemate') {
                alert(`Stalemate! Draw.`);
            } else if (this.game.status === 'check') {
                console.log(`${this.game.turn} is in check!`);
            }

            this.selectedPiece = null;
            this.validMoves = [];
        } else if (piece && piece.color === this.game.turn) {
            // Select piece of current turn
            this.selectedPiece = { row, col };
            this.validMoves = this.moveValidator.getLegalMoves(piece, row, col);
        } else {
            // Click empty square not in validMoves
            this.selectedPiece = null;
            this.validMoves = [];
        }

        this.renderHTML();
    }
}

export default BoardRenderer;