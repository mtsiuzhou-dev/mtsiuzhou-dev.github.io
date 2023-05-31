import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask, toggleTask } from '../../store/TasksSlice';
import { usePrevious } from '../../utils/Utils';
import Button from '../atoms/Button';
import Checkbox from '../atoms/Checkbox';
import InputText from '../atoms/InputText';
import style from './Task.module.scss';

function Task({ id, name, isCompleted }) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsEditing(false);
    const trimmedNewName = newName.trim();
    if (!trimmedNewName) {
      return;
    }
    dispatch(editTask({ id, newName: trimmedNewName }));
    setNewName('');
  }

  const editingTemplate = (
    <form className={style.todoContainer} onSubmit={handleSubmit}>
      <Checkbox id={id} className={style.hidden} />
      <InputText
        id={id}
        value={newName || name}
        onChange={e => setNewName(e.target.value)}
        onBlur={() => {
          setIsEditing(false);
          setNewName('');
        }}
        innerRef={editFieldRef}
      />
      <Button isSubmit text="Save" className={style.hidden} />
    </form>
  );

  const viewTemplate = (
    <div className={style.todoContainer}>
      <Checkbox
        id={id}
        isChecked={isCompleted}
        onChange={() => dispatch(toggleTask(id))}
      />
      <label className={isCompleted ? style.crossout : ''} htmlFor={id}>
        {name}
      </label>
      <div className={style.todoActions}>
        <Button
          className={style.editBtn}
          onClick={() => setIsEditing(true)}
          innerRef={editButtonRef}
          text="Edit"
        />
        <Button
          className={style.deleteBtn}
          onClick={() => dispatch(deleteTask(id))}
          text="Delete"
        />
      </div>
    </div>
  );

  return <li>{isEditing ? editingTemplate : viewTemplate}</li>;
}
Task.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
};
export default Task;
