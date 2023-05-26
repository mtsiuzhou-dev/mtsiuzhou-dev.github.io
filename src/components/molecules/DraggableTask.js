/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import Task from './Task';
import style from './DraggableTask.module.scss';

const DraggableTask = ({ id, name, isCompleted, index }) => (
  <Draggable draggableId={id} key={id} index={index}>
    {(provided, snapshot) => (
      <div
        {...provided.dragHandleProps}
        {...provided.draggableProps}
        className={snapshot.isDragging ? style.dragging : ''}
        ref={provided.innerRef}
      >
        <Task id={id} name={name} isCompleted={isCompleted} key={id} />
      </div>
    )}
  </Draggable>
);
DraggableTask.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

export default DraggableTask;
