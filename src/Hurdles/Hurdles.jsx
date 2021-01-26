import { getHurdleCoordinates } from '../App.utils';
import { HURDLES } from '../App.Constants';

const Hurdles = ({ refsArray }) => {
  return (
    <>
      {
        Object.keys(HURDLES).map(key => {
          const { x1, y1, x2, y2 } = getHurdleCoordinates(refsArray, key, HURDLES[key]);
          const isSnake = parseInt(key) - HURDLES[key] > 0;
          return (<>
            <line className={ `line ${ isSnake ? 'snake' : 'ladder' }` }
              x1={ x1 } y1={ y1 } x2={ x2 } y2={ y2 } />
            <circle className={ `circle ${ isSnake ? 'snake' : 'ladder' }` }
              cx={ x2 } cy={ y2 } r="5" />
          </>)
        })
      }
    </>
  );
};

export default Hurdles;