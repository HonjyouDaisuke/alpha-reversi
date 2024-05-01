import { Computer } from "../computer/computer";

export type PlayerData = {
  id: number;
  name: string;
  email: string;
  isCom: boolean;
  computer: Computer | null;
};
export class Player {
  players: PlayerData[];
  constructor() {
    //TODO:ダミーデータです。正式には入力を受け付ける
    this.players = [
      {
        id: 0,
        name: "Human 1",
        email: "Human@gmail.com",
        isCom: false,
        computer: null,
      },
      {
        id: 1,
        name: "com1",
        email: "Com1@gmail.com",
        isCom: true,
        computer: { depth: 0, level: 1 },
      },
      {
        id: 2,
        name: "com2",
        email: "Com2@gmail.com",
        isCom: true,
        computer: { depth: 4, level: 2 },
      },
      {
        id: 3,
        name: "com3",
        email: "Com3@gmail.com",
        isCom: true,
        computer: { depth: 6, level: 3 },
      },
    ];
  }
  getPlayerData(id: number): PlayerData | null {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id === id) {
        return this.players[i];
      }
    }
    return null;
  }
}
