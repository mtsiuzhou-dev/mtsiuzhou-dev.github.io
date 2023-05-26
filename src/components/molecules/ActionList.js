import { useDispatch } from 'react-redux';
import Button from '../atoms/Button';
import { clearCompletedTasks } from '../../store/TasksSlice';
import style from './ActionList.module.scss';

const ActionList = () => {
  const dispatch = useDispatch();
  return (
    <div className={style.actions}>
      <Button
        text="Clear completed"
        onClick={() => dispatch(clearCompletedTasks())}
      />
    </div>
  );
};
export default ActionList;
