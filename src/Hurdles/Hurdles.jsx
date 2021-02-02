import { getHurdleCoordinates } from '../App.utils';
import { HURDLES } from '../App.Constants';

const Hurdles = ({ refsArray }) => {
    return (
      <>
        {
          Object.keys(HURDLES).map(key => {
            const { x1, y1, x2, y2 } = getHurdleCoordinates(refsArray, key, HURDLES[key]);
            const isSnake = parseInt(key) - HURDLES[key] > 0;

            if (isSnake) {
              return (<>
                <line className='line snake'
                  x1={ x1 } y1={ y1 } x2={ x2 } y2={ y2 } />
                <circle className='circle snake' cx={ x2 } cy={ y2 } r="5" />
              </>)
            } else {

              const slope = (y2 - y1) / (x2 - x1); // y = mx + c
              const constant = y1 - (slope * x1);
              const allStrikes = [];

              for (let j = y1 - 10; j > y2 + 10; j = j - 15) {
                const i = (j - constant) / slope;
                allStrikes.push(<line className='line ladder'
                  x1={ i } y1={ j } x2={ i + 10 } y2={ j + 1 } />);
              }

              return (<>
                <line className='line ladder'
                  x1={ x1 } y1={ y1 } x2={ x2 } y2={ y2 } />
                <line className='line ladder'
                  x1={ x1 + 10 } y1={ y1 + 1 } x2={ x2 + 10 } y2={ y2 + 1 } />
                { allStrikes }
              </>)
            }
          })
        }
      </>
    );
  }
;

export default Hurdles;