import React, { Component } from 'react';
import { compose } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import uuid from 'uuid';
import connect from '../libs/connect';
import Lanes from '../components/Lanes';
import LaneActions from '../actions/LaneActions';

const App = ({ LaneActions, lanes }) => {
  const addLane = () => {
    LaneActions.create({
      id: uuid.v4(),
      name: 'New Lane'
    });
  }

  return (
    <div>
      <button className='add-lane' onClick={ addLane }>+ Add Lane</button>
      <Lanes lanes={ lanes }/>
    </div>
  )
}

export default compose (
  DragDropContext(HTML5Backend),
  connect(
    ({ lanes }) => ({ lanes }),
    { LaneActions }
  )
)(App)