import { CellType } from "../cell/cell-type"

export type LogType = {
	playerCell: CellType | null;
	message: string;
}
