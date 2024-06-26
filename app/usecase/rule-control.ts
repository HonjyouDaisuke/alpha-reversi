import { CellType } from "@/entity/cell/cell-type";
import { Point } from "@/entity/cell/point-type";

const DIR_LENGTH = 8;

export enum Direction {
	Up,
	Down,
	Left,
	Right,
	UpLeft,
	UpRight,
	DownLeft,
	DownRight,
}

export class RuleControl {
	isValidPosition(map: number[][], p: Point): boolean {
		return p.x >= 0 && p.x < map[0].length && p.y >= 0 && p.y < map.length;
	}

	findValidPlace(map: number[][], player: CellType): Point[] {
		const validMoves: Point[] = [];
		for (let j = 0; j < map.length; j++) {
			for (let i = 0; i < map[j].length; i++) {
				if (!this.checkAbleToPlace([...map], { x: i, y: j }, player)) continue;
				validMoves.push({ x: i, y: j });
			}
		}
		return validMoves;
	}

	isEmpty(cell: number): boolean {
		const emptyCellTypes = [CellType.Empty, CellType.Able, CellType.Recommend];
		return emptyCellTypes.includes(cell);
	}

	checkDirection(
		map: number[][],
		p: Point,
		player: CellType,
		direction: Point
	): boolean {
		let x = p.x + direction.x;
		let y = p.y + direction.y;

		if (!this.isValidPosition(map, { x: x, y: y })) return false;
		if (map[y][x] !== 3 - player) return false;

		while (this.isValidPosition(map, { x: x, y: y })) {
			if (this.isEmpty(map[y][x])) return false;
			if (map[y][x] === player) return true;
			x += direction.x;
			y += direction.y;
		}
		return false;
	}

	makeDirectionPoint(dir: Direction): Point {
		if (dir >= DIR_LENGTH) throw new Error("方向がありません");

		const directionMap: { [key in Direction]: Point } = {
			[Direction.Up]: { x: 0, y: -1 },
			[Direction.Down]: { x: 0, y: 1 },
			[Direction.Left]: { x: -1, y: 0 },
			[Direction.Right]: { x: 1, y: 0 },
			[Direction.UpLeft]: { x: -1, y: -1 },
			[Direction.UpRight]: { x: 1, y: -1 },
			[Direction.DownLeft]: { x: -1, y: 1 },
			[Direction.DownRight]: { x: 1, y: 1 },
		};

		return directionMap[dir];
	}

	checkAbleToPlace(map: number[][], p: Point, player: CellType): boolean {
		if (!this.isEmpty(map[p.y][p.x])) return false;

		for (let dir = 0; dir < DIR_LENGTH; dir++) {
			const d = this.makeDirectionPoint(dir);
			if (this.checkDirection(map, p, player, d)) return true;
		}
		return false;
	}

	flipDirection(
		map: number[][],
		p: Point,
		player: CellType,
		d: Point
	): Point[] {
		let pos: Point = { x: p.x + d.x, y: p.y + d.y };

		if (!this.isValidPosition(map, pos) || map[pos.y][pos.x] !== 3 - player)
			return [];
		let flippedPoints: Point[] = [];

		while (this.isValidPosition(map, pos)) {
			if (this.isEmpty(map[pos.y][pos.x])) return [];
			if (map[pos.y][pos.x] === player) {
				return flippedPoints;
			}
			flippedPoints.push({ x: pos.x, y: pos.y });
			pos.x += d.x;
			pos.y += d.y;
		}
		return [];
	}

	flipPiece(map: number[][], p: Point, player: CellType): number[][] {
		if (!this.isEmpty(map[p.y][p.x])) return map;
		const tmpMap = [...map];
		tmpMap[p.y][p.x] = player;
		for (let dir = 0; dir < DIR_LENGTH; dir++) {
			const d = this.makeDirectionPoint(dir);
			const flippedPoints = this.flipDirection(tmpMap, p, player, d);
			for (const flipped of flippedPoints) {
				tmpMap[flipped.y][flipped.x] = player;
			}
		}
		return tmpMap;
	}
}
