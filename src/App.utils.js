import { COLUMNS, ROWS } from './App.Constants';

export const getCoordinate = (refsArray, point) => {
  const boardPoint = (COLUMNS * ROWS) - point;
  const divRef = refsArray[boardPoint];
  const x = divRef.offsetLeft + (divRef.offsetWidth / 2);
  const y = divRef.offsetTop + (divRef.offsetHeight / 2);
  return { x, y };
}

export const getHurdleCoordinates = (refsArray, point1, point2) => {
  const point1Co = getCoordinate(refsArray, point1);
  const point2Co = getCoordinate(refsArray, point2);
  return {
    x1: point1Co.x,
    y1: point1Co.y,
    x2: point2Co.x,
    y2: point2Co.y
  };
};

export const getPlayerCoordinates = (refsArray, players, currentPlayerIndex) => {
  const currentPlayer = players[currentPlayerIndex];
  let { x, y } = getCoordinate(refsArray, currentPlayer.position);
  // chk any player exists on that location till this player
  let previousPlayerCount = 0;

  for (let i = 0; i < currentPlayerIndex; i++) {
    if (players[i].position === currentPlayer.position) {
      previousPlayerCount++;
    }
  }
  // increase x as it will be in 2nd column
  if (previousPlayerCount % 2 !== 0) {
    x = x + 10 + 2;
  }

  if (previousPlayerCount > 1) {
    y = y + (Math.floor(previousPlayerCount / 2) * (10 + 2))
  }

  return {x,y};

}