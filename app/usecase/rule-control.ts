import { BoardClass } from "../entity/board/board";
import { CellType } from "../entity/cell/cell-type";
import { Point } from "../entity/cell/point-type";
import { Player } from "../entity/player/player-type";

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
    //console.log(map);
    for (let j = 0; j < map.length; j++) {
      for (let i = 0; i < map[j].length; i++) {
        if (!this.checkAbleToPlace([...map], { x: i, y: j }, player)) continue;
        validMoves.push({ x: i, y: j });
      }
    }
    return validMoves;
  }

  isEmpty(cell: number): boolean {
    if (cell === CellType.Empty) return true;
    if (cell === CellType.Able) return true;
    if (cell === CellType.Recommend) return true;
    return false;
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
    let d: Point = { x: 0, y: 0 };
    switch (dir) {
      case Direction.Up:
        d = { x: 0, y: -1 };
        break;
      case Direction.Down:
        d = { x: 0, y: 1 };
        break;
      case Direction.Left:
        d = { x: -1, y: 0 };
        break;
      case Direction.Right:
        d = { x: 1, y: 0 };
        break;
      case Direction.UpLeft:
        d = { x: -1, y: -1 };
        break;
      case Direction.UpRight:
        d = { x: 1, y: -1 };
        break;
      case Direction.DownLeft:
        d = { x: -1, y: 1 };
        break;
      case Direction.DownRight:
        d = { x: 1, y: 1 };
        break;
    }
    return d;
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
