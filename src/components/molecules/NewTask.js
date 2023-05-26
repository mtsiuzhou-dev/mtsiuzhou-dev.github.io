import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import Button from '../atoms/Button';
import { addTask } from '../../store/TasksSlice';
import style from './NewTask.module.scss';
import InputText from '../atoms/InputText';
import Checkbox from '../atoms/Checkbox';

function NewTask() {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    dispatch(
      addTask({ id: `todo-${nanoid()}`, name: name, isCompleted: false })
    );

    setName('');
  }

  return (
    <form className={style.todoContainer} onSubmit={handleSubmit}>
      <Checkbox id="newTaskCheckbox" className={style.hidden} />
      <InputText
        id="newTodoInput"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Type new task here"
      />
      <Button isSubmit className={style.hidden} text="Add" />
    </form>
  );
}
export default NewTask;
