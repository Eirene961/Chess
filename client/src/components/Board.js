import King from '../../../shared/domain/King.js'
import Queen from '../../../shared/domain/Queen.js';
import Rook from '../../../shared/domain/Rook.js';
import Bishop from '../../../shared/domain/Bishop.js'
import Knight from '../../../shared/domain/Knight.js'
import Pawn from '../../../shared/domain/Pawn.js';

class Board {
    constructor() {
        this.grid = this.createEmptyBoard();
        this.setupInitialPosition();
    }

    createEmptyBoard() {
        return Array.from({ length: 8 }, () => Array(8).fill(null));
    }

    setupInitialPosition() {
        // Black
        this.grid[0][0] = new Rook('black');
        this.grid[0][1] = new Knight('black');
        this.grid[0][2] = new Bishop('black');
        this.grid[0][3] = new Queen('black');
        this.grid[0][4] = new King('black');
        this.grid[0][5] = new Bishop('black');
        this.grid[0][6] = new Knight('black');
        this.grid[0][7] = new Rook('black');
        for (let j = 0; j < 8; j++) {
            this.grid[1][j] = new Pawn('black');
        }

        // White
        this.grid[7][0] = new Rook('white');
        this.grid[7][1] = new Knight('white');
        this.grid[7][2] = new Bishop('white');
        this.grid[7][3] = new Queen('white');
        this.grid[7][4] = new King('white');
        this.grid[7][5] = new Bishop('white');
        this.grid[7][6] = new Knight('white');
        this.grid[7][7] = new Rook('white');
        for (let j = 0; j < 8; j++) {
            this.grid[6][j] = new Pawn('white');
        }
    }
}

export default Board;