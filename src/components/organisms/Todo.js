/* eslint-disable react/jsx-props-no-spreading */
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import ActionList from '../molecules/ActionList';
import NewTask from '../molecules/NewTask';
import FilterButtonList from '../molecules/FilterButtonList';
import DraggableTask from '../molecules/DraggableTask';
import {
  reorderTasks,
  selectTasksByFilter,
  selectActiveTasksLength,
} from '../../store/TasksSlice';
import style from './Todo.module.scss';

const Todo = () => {
  const dispatch = useDispatch();

  const remainingTasks = useSelector(selectActiveTasksLength);
  const remainingTasksText = `${remainingTasks} ${
    remainingTasks !== 1 ? 'tasks' : 'task'
  } left`;

  const onDragEndHandler = ({ source, destination }) =>
    dispatch(reorderTasks({ source, destination }));

  const taskList = useSelector(selectTasksByFilter);

  return (
    <div className={style.appContainer}>
      <h2 className={style.header}>Todo</h2>
      <NewTask />
      <div className={style.todoListContainer}>
        <DragDropContext onDragEnd={onDragEndHandler}>
          <Droppable droppableId="todo-list-droppable-area" type="group">
            {provided => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={style.todoList}
              >
                {taskList.map((task, index) => (
                  <DraggableTask
                    id={task.id}
                    name={task.name}
                    isCompleted={task.isCompleted}
                    index={index}
                    key={task.id}
                  />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <div
          className={`${style.todoListFooter} ${
            taskList.length ? '' : style.empty
          }`}
        >
          <h2>{remainingTasksText}</h2>
          <FilterButtonList />
          <ActionList />
        </div>
      </div>
      <h3 className={style.footer}>Drag and drop to reorder list</h3>
    </div>
  );
};
export default Todo;
