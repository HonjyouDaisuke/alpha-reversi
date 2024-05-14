import { RuleControl } from "@/usecase/rule-control";
import { CellType } from "@/entity/cell/cell-type";
import { BoardClass } from "./board";
import { Point } from "@/entity/cell/point-type";
import { ComputerControl } from "@/usecase/computer-control";

export class BoardController {
	board = new BoardClass();

	isEmpty(p: Point): boolean {
		return p !== undefined && [CellType.Empty, CellType.Able, CellType.Recommend].includes(this.board.board[p.y][p.x]);
	}

	setNewPiece(p: Point, player: CellType): BoardClass | null {
		const rule = new RuleControl();
		console.log(p);
		if (!this.isEmpty(p)) return null;
		if (!rule.checkAbleToPlace(this.board.board, p, player)) {
			console.log(`ここには置けません (${p.x},${p.y})`);
			return null;
		}
		let tempBoard = structuredClone(this.board);
		tempBoard.board = rule.flipPiece(tempBoard.board, p, player);
		return tempBoard;
	}

	getCurrentBoard(): number[][] {
		return this.board.board;
	}

	getCurrentBoardClass(): BoardClass {
		return this.board;
	}

	setNewBoard(board: number[][]) {
		this.board.board = board;
		console.log(`ボードを更新しました。`);
		console.log(this.board.board);
	}

	setCell(p: Point, cell: CellType) {
		this.board.board[p.y][p.x] = cell;
	}

	setAbleCell(paths: Point[] | null): BoardClass | null | undefined {
		if (paths === null) return;
		if (paths.length <= 0) return;
		const recomend = new ComputerControl(this.getCurrentBoard(), 2);
		const path = recomend.getComputerPost(CellType.Black);
		console.log("おすすめ→");
		console.log(path);

		paths.forEach((p, index) => {
			this.setCell(p, CellType.Able);
		});
		if (path !== null) this.setCell(path, CellType.Recommend);
	}

	isAbleCell(cell: CellType): boolean {
		if (cell === CellType.Able) return true;
		if (cell === CellType.Recommend) return true;
		return false;
	}

	clearAbleCell() {
		for (let y = 0; y < this.board.board.length; y++) {
			for (let x = 0; x < this.board.board[0].length; x++) {
				if (!this.isAbleCell(this.board.board[y][x])) continue;
				this.board.board[y][x] = CellType.Empty;
			}
		}
	}
}
