//
// Copyright (c) 2020 Nutanix Inc. All rights reserved.
//
import React from 'react';
import { getPlayerCoordinates } from '../App.utils';

export default class Player extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.playerRect = React.createRef();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { refsArray, players, currentPlayerIndex } = prevProps;
    const previousValue = getPlayerCoordinates(refsArray, players, currentPlayerIndex);

    this.playerRect.current.setAttribute('class', '');
    this.playerRect.current.setAttribute('x', previousValue.x);
    this.playerRect.current.setAttribute('y', previousValue.y);

    this.playerRect.current.setAttribute('class', 'player-transition');

    const newPos = this.getCurrentPlayerPosition();

    this.playerRect.current.setAttribute('x', newPos.x);
    this.playerRect.current.setAttribute('y', newPos.y);

  }

  getCurrentPlayerPosition = () => {
    const { refsArray, players, currentPlayerIndex } = this.props;
    return getPlayerCoordinates(refsArray, players, currentPlayerIndex);
  }

  render() {
    const { players, currentPlayerIndex } = this.props;
    const { x, y } = this.getCurrentPlayerPosition();
    return (
      <rect x={ x } y={ y } width={ 10 } height={ 10 }
        className='player-transition'
        fill={ players[currentPlayerIndex].color }
        ref={ this.playerRect }
      />
    )
  }

}
