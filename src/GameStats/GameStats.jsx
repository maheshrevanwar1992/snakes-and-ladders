const GameStats = ({ players }) => {
  return (
    <div className='game-stats'>
      <div>Player Details</div>
      <div className='player-list'>
        <div className='player-name'>Name</div>
        <div className='player-position'>Current Position</div>
        {
          players.map(p => {
            return (<>
              <div className='player-name'>{ p.name }</div>
              <div className='player-position'>{ p.position }</div>
            </>)
          })
        }
      </div>
    </div>
  );
}

export default GameStats;
