import { BoardClass } from "./board";
import { CellType } from "../cell/cell-type";

describe("BoardClass", () => {
  let board: BoardClass;

  beforeEach(() => {
    board = new BoardClass();
  });

  it("should initialize with the correct starting positions", () => {
    expect(board.board[3][3]).toBe(CellType.Black);
    expect(board.board[3][4]).toBe(CellType.White);
    expect(board.board[4][3]).toBe(CellType.White);
    expect(board.board[4][4]).toBe(CellType.Black);
  });

  it("should set a piece at the specified position", () => {
    board = board.setPiece(2, 2, CellType.Black);

    expect(board.board[2][2]).toBe(CellType.Black);

    expect(board.board[3][3]).toBe(CellType.Black);
    expect(board.board[3][4]).toBe(CellType.White);
    expect(board.board[4][3]).toBe(CellType.White);
    expect(board.board[4][4]).toBe(CellType.Black);
  });

  it("should not mutate the original board when setting a piece", () => {
    const newBoard = board.setPiece(2, 2, CellType.Black);

    expect(newBoard).not.toBe(board);

    expect(board.board[2][2]).toBe(CellType.Empty);
  });
});
