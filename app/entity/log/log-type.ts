import { CellType } from "../cell/cell-type"

export type LogType = {
	id: number;
	playerCell: CellType | null;
	message: string;
}
