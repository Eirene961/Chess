import Board from './components/Board.js';
import BoardService from '../../shared/application/BoardService.js';
import MoveValidator from '../../shared/application/MoveValidator.js';
import Game from '../../shared/application/Game.js'
import BoardRenderer from './pages/BoardRenderer.js';

const board = new Board();
const boardService = new BoardService(board);
const moveValidator = new MoveValidator(boardService);
const game = new Game(boardService);
const renderer = new BoardRenderer(board, boardService, moveValidator, game);

renderer.renderHTML();