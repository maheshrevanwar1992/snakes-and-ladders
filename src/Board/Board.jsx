import { COLUMNS, ROWS } from '../App.Constants';

const Board = ({refsArray}) => {
  return (<div className="board">
    {
      [ ...Array(ROWS) ].map((_, i) => {
        return (<div key={ i } className='row'>
          {
            [ ...Array(COLUMNS) ].map((_, j) => {
              return (<div className={ `cell cell-${ j }` } ref={ ref => {
                refsArray.push(ref)
              } }>
                { (COLUMNS * ROWS) - ((i * ROWS) + (j + 1)) + 1 }
              </div>);
            })
          }
        </div>)
      })
    }
  </div>);
}

export default Board;