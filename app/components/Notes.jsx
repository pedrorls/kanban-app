import React from 'react';
import Note from './Note';
import Editable from './Editable';
import LaneActions from '../actions/LaneActions';


export default ({ 
  notes,
  onDelete=() => {},
  onNoteClick=() => {},
  onEdit=() => {}
}) => (
  <ul className='notes'>{notes.map(({ id, editing, task }) => 
    <li key={ id }>
      <Note
        editing={ editing }
        className="note" id={id}
        onClick={ onNoteClick.bind(null, id) }
        onMove={ LaneActions.move }
      >

        <Editable
          className='editable'
          editing={ editing }
          value={ task }
          onEdit={ onEdit.bind(null, id) }
        />
        <button className='delete' onClick={ onDelete.bind(null, id) }>x</button>
      </Note>
    </li>
  )}</ul>
);