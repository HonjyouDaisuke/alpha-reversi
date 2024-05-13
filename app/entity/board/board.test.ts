import { BoardClass } from "./board";
import { CellType } from "../cell/cell-type";

describe("BoardClass", () => {
  let board: BoardClass;

  beforeEach(() => {
    board = new BoardClass();
  });

  it("should initialize with the correct starting positions", () => {
    // Assert initial board state
    expect(board.board[3][3]).toBe(CellType.Black);
    expect(board.board[3][4]).toBe(CellType.White);
    expect(board.board[4][3]).toBe(CellType.White);
    expect(board.board[4][4]).toBe(CellType.Black);
  });

  it("should set a piece at the specified position", () => {
    // Set a piece at position (2, 2)
    board = board.setPiece(2, 2, CellType.Black);

    // Assert the piece is set correctly
    expect(board.board[2][2]).toBe(CellType.Black);

    // Assert other positions are not affected
    expect(board.board[3][3]).toBe(CellType.Black);
    expect(board.board[3][4]).toBe(CellType.White);
    expect(board.board[4][3]).toBe(CellType.White);
    expect(board.board[4][4]).toBe(CellType.Black);
  });

  it("should not mutate the original board when setting a piece", () => {
    // Set a piece at position (2, 2)
    const newBoard = board.setPiece(2, 2, CellType.Black);

    // Assert the new board is different from the original one
    expect(newBoard).not.toBe(board);

    // Assert the original board remains unchanged
    expect(board.board[2][2]).toBe(CellType.Empty);
  });
});
