import update from 'react-addons-update';
import LaneActions from '../actions/LaneActions';

export default class LaneStore {
  constructor(){
    this.bindActions(LaneActions);
    this.lanes = [];
  }

  create(lane) {
    lane.notes = lane.notes || [];
    this.setState({
      lanes: this.lanes.concat(lane)
    })
  }

  update(updateLane) {
    this.setState({
      lanes: this.lanes.map(lane => {
        if(lane.id === updateLane.id){
          return Object.assign({}, lane, updateLane)
        }

        return lane;
      })
    })
  }

  delete(id) {
    this.setState({
      lanes: this.lanes.filter(lane => lane.id !== id)
    })
  }

  attachToLane({ laneId, noteId }) {
    this.setState({
      lanes: this.lanes.map(lane => {
        if(lane.notes.includes(noteId)) {
          lane.notes =lane.notes.filter(note => note !== noteId);
        }

        if(lane.id === laneId) {
          lane.notes = lane.notes.concat([noteId]);
        }

        return lane;
      })
    })
  }

  detachFromLane({ laneId, noteId }) {
    this.setState({
      lanes: this.lanes.map(lane => {
        if(lane.id === laneId) {
          lane.notes = lane.notes.filter(note => note !== noteId);
        }

        return lane;
      })
    })
  }

  move({ sourceId, targetId }) {
    const lanes = this.lanes;
    const sourceLane = lanes.filter(lane => lane.notes.includes(sourceId))[0];
    const targetLane = lanes.filter(lane => lane.notes.includes(targetId))[0];
    const sourceNoteIdx = sourceLane.notes.indexOf(sourceId);
    const targetNoteIdx = targetLane.notes.indexOf(targetId);

    if(sourceLane === targetLane){
      sourceLane.notes = update(sourceLane.notes, {
        $splice: [
          [sourceNoteIdx, 1],
          [targetNoteIdx, 0, sourceId]
        ]
      });
    } else {
      sourceLane.notes.splice(sourceNoteIdx, 1);
      targetLane.notes.splice(targetNoteIdx, 0, sourceId);
    }
    this.setState({ lanes });
  }
}