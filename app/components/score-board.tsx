import { ScoreType } from "../entity/score/score-type";

interface Props {
  score: ScoreType;
}

export function ScoreBoard({ score }: Props) {
  return (
    <div className="flex flex-row bg-blue-900">
      <div>黒:</div>
      <div>{score.BlackCount}枚</div>
      <div>vs</div>
      <div>白:</div>
      <div>{score.WhiteCount}枚</div>
    </div>
  );
}
