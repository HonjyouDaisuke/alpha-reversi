import { PlayerData } from "../player/player-type";
import { Score } from "../score/score";

export type ModalType = {
  message: string;
  title: string;
};

export default class Winner {
  winnerData: PlayerData | null = null;
  playersData: PlayerData[] | null = null;
  black: number = 0;
  white: number = 0;

  constructor(score: Score | null, players: PlayerData[] | null) {
    if (score === null || players === null) return;
    this.black = score.getBlackScore();
    this.white = score.getWhiteScore();
    this.playersData = players;
    this.winnerData = this.black > this.white ? players[0] : players[1];
  }

  makeModalMessage(): ModalType {
    let res: ModalType = { message: "", title: "" };
    if (this.winnerData === null)
      return {
        message: "勝者データが見つかりませんでした。",
        title: "エラーが発生しました",
      };
    if (this.playersData === null)
      return {
        message: "勝者データが見つかりませんでした。",
        title: "エラーが発生しました",
      };

    res.message = `${this.playersData[0].displayName} - [黒:${this.black} vs ${this.white}:白] - ${this.playersData[1]?.displayName}`;
    res.title = `${this.winnerData.displayName}の勝ち!!`;
    return res;
  }
}
