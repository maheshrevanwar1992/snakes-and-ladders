import { useState, useEffect, useReducer } from 'react';
import Board from './Board/Board.jsx';
import Hurdles from './Hurdles/Hurdles.jsx';
import { HURDLES, PLAYER_COLORS, PLAYER_COUNT } from './App.Constants';
import Player from './Player/Player';
import GameStats from './GameStats/GameStats';
import Dice from './Dice/Dice';

import './App.scss';

const playerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PLAYER_POSITION':
      return state.map((player, index) => {
        if (action.currentPlayer === index) {
          return {
            ...player,
            position: action.newPos
          }
        }
        return player;
      });
    default:
      return state;
  }
};

const getInitialState = (count) => {
  const players = [];
  for (let i = 0; i < count; i++) {
    players.push({
      name: `player-${ i + 1 }`,
      position: 1,
      color: PLAYER_COLORS[i]
    });
  }
  return players;
};


const App = () => {
  const [ playerCount ] = useState(PLAYER_COUNT);
  const [ boardRendered, setBoardRendered ] = useState(false);
  const [ refsArray ] = useState([]);
  const [ players, dispatchPlayerAction ] = useReducer(playerReducer, getInitialState(playerCount));
  const [ diceLastValue, setDiceValue ] = useState(null);
  const [ currentPlayer, setCurrentPlayer ] = useState(0);
  const [ winner, setWinner ] = useState(null);

  const handleOnDiceClick = () => {
    const randomValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(randomValue);
    const player = players[currentPlayer];

    let newPos = player.position + randomValue;
    if (HURDLES[newPos]) {
      newPos = HURDLES[newPos]
    }
    newPos = newPos > 100 ? 100 : newPos;
    dispatchPlayerAction({ type: 'SET_PLAYER_POSITION', currentPlayer, newPos });

    if (newPos === 100) {
      setWinner(currentPlayer);
    }
    setCurrentPlayer((currentPlayer + 1) % playerCount);
  }

  useEffect(() => {
    setBoardRendered(true);
  }, [])
  return (
    <div className="App">
      <div className='game-container'>
        <div className='board-container'>
          <Board refsArray={ refsArray } />
          {
            boardRendered &&
            <svg className='hurdles-players'>
              <Hurdles refsArray={ refsArray } />
              { players.map((p, i) => {
                return (<Player refsArray={ refsArray } players={ players }
                  currentPlayerIndex={ i } key={ p.name } />)
              }) }
            </svg>
          }
        </div>
        <div className='game-stats-dice-container'>
          <GameStats players={ players } />
          <Dice currentPlayerName={ players[currentPlayer].name }
            diceLastValue={ diceLastValue }
            handleOnDiceClick={ handleOnDiceClick } />
        </div>
      </div>
      {
        winner != null &&
        <div className='winner-banner'>
          <div className='congrats-text'>
            Congratulations { players[winner].name }
          </div>
        </div>
      }
    </div>
  );
};

export default App;
