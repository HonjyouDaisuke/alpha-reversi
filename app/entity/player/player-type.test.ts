import { Player, PlayerData } from "./player-type";

describe("Player", () => {
  let player: Player;

  beforeEach(() => {
    player = new Player();
  });

  test("getPlayerData method should return correct player data", () => {
    // Arrange
    const expectedPlayer: PlayerData = {
      id: 1,
      name: "com0",
      displayName: "貧乏神(Level0)",
      email: "Com0@gmail.com",
      isCom: true,
      computer: { depth: 0, level: 1 },
    };

    // Act
    const result: PlayerData | null = player.getPlayerData(1);

    // Assert
    expect(result).toEqual(expectedPlayer);
  });

  test("getPlayerData method should return null for non-existent player", () => {
    // Arrange
    const nonExistentId: number = 10;

    // Act
    const result: PlayerData | null = player.getPlayerData(nonExistentId);

    // Assert
    expect(result).toBeNull();
  });

  // Add more tests as needed...
});
