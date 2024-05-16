import { Computer } from "../computer/computer";

const DEFAULT_PLAYERS = [
	{
		id: 0,
		name: "human",
		displayName: "人間さま",
		email: "Human@gmail.com",
		isCom: false,
		computer: null,
	},
	{
		id: 1,
		name: "com0",
		displayName: "貧乏神(Level0)",
		email: "Com0@gmail.com",
		isCom: true,
		computer: { depth: 0, level: 1 },
	},
	{
		id: 2,
		name: "com1",
		displayName: "赤鬼(Level1)",
		email: "Com1@gmail.com",
		isCom: true,
		computer: { depth: 2, level: 1 },
	},
	{
		id: 3,
		name: "com2",
		displayName: "青鬼(Level2)",
		email: "Com2@gmail.com",
		isCom: true,
		computer: { depth: 4, level: 2 },
	},
	{
		id: 4,
		name: "com3",
		displayName: "閻魔大王(Level3)",
		email: "Com3@gmail.com",
		isCom: true,
		computer: { depth: 6, level: 3 },
	},
];

export type PlayerData = {
	id: number;
	name: string;
	displayName: string;
	email: string;
	isCom: boolean;
	computer: Computer | null;
};
export class Player {
	players: PlayerData[];
	constructor() {
		this.players = DEFAULT_PLAYERS;
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
