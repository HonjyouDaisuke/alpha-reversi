export type Computer = {
  depth: number; //先読みの手数
  level: number; //コンピュータのレベル
};

export class Computers {
  computers: Computer[] = [
    { depth: 0, level: 0 },
    { depth: 2, level: 1 },
    { depth: 4, level: 2 },
    { depth: 6, level: 3 },
    { depth: 8, level: 4 },
  ];
}
