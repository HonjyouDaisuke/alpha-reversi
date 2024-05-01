import { CellType } from "../entity/cell/cell-type";
import { Point } from "../entity/cell/point-type";
import { Evaluation } from "../entity/evaluation/evaluation";
import { RuleControl } from "./rule-control";

type PosEvaluation = {
  evaluation: number;
  point: Point;
};

export class ComputerControl {
  supportMap: number[][];

  constructor(map: number[][]) {
    this.supportMap = map.concat();
  }

  playerChange(player: CellType): CellType {
    return player === CellType.Black ? CellType.White : CellType.Black;
  }
  miniMax(
    src: number[][],
    depth: number,
    pos: Point,
    player: CellType
  ): Point | null {
    if (depth < 0) return null;
    const rouleControll = new RuleControl();
    const paths = rouleControll.findValidPlace(src, player);
    if (paths.length <= 0) return null;
    let pointEvalu: PosEvaluation[] = [];

    for (let i = 0; i < paths.length; i++) {
      const map = JSON.parse(JSON.stringify(src));
      console.log(
        `(${paths[i].x},${paths[i].y})に置きます。(${player}) depth=${depth}`
      );
      const puttedMap = rouleControll.flipPiece([...map], paths[i], player);
      console.log("置いた結果");
      console.log(puttedMap);
      const evaluation = new Evaluation();
      const evalu = evaluation.getEvaluation(puttedMap);
      console.log(`評価点は===>${evalu}`);
      pointEvalu.push({ evaluation: evalu, point: paths[i] });
      this.miniMax(
        [...puttedMap],
        depth - 1,
        paths[i],
        this.playerChange(player)
      );
    }
    console.log(`コンピュータの手を算出中・・・`);
    console.log(`depth = ${depth} player = ${player}`);
    console.log(pointEvalu);

    return null;
  }
}
