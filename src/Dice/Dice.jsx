const Dice = ({ diceLastValue, handleOnDiceClick, currentPlayerName }) => {
  return (
    <div className='dice-container'>
      <div className='last-value'>{ diceLastValue }</div>
      <button className='play-button' onClick={ handleOnDiceClick }>
        Play { currentPlayerName }
      </button>
    </div>
  );
}

export default Dice;
