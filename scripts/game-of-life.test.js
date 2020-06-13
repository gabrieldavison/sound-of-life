import * as game from "./game-of-life";

test("deadState gives no active cells", () => {
  expect(game.deadState(3, 3)).toEqual([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
});
test("dead cells with no live neighbours stay dead", () => {
  const init = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const expected = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  expect(game.nextState(init)).toEqual(expected);
});

test("dead cells with 3 neighbours comes to life", () => {
  const init = [
    [0, 0, 1],
    [0, 1, 1],
    [0, 0, 0],
  ];
  const expected = [
    [0, 1, 1],
    [0, 1, 1],
    [0, 0, 0],
  ];
  expect(game.nextState(init)).toEqual(expected);
});

test("cells with 0 or 1 neighbours dies", () => {
  const init = [
    [0, 1, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const expected = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const init2 = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];
  const expected2 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  expect(game.nextState(init)).toEqual(expected);
  expect(game.nextState(init2)).toEqual(expected2);
});

test("living cells with 2/3 neighbours stays alive", () => {
  const init = [
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
  ];
  const expected = [
    [0, 0, 0],
    [0, 1, 1],
    [0, 0, 0],
  ];
  const init2 = [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0],
  ];
  const expected2 = [
    [0, 1, 1],
    [1, 1, 1],
    [0, 1, 1],
  ];
  expect(game.nextState(init)).toEqual(expected);
  expect(game.nextState(init2)).toEqual(expected2);
});

test("living cell with more than 3 neighbours dies", () => {
  const init = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 1],
  ];
  const expected = [
    [0, 1, 0],
    [1, 0, 1],
    [1, 0, 1],
  ];
  expect(game.nextState(init)).toEqual(expected);
});
