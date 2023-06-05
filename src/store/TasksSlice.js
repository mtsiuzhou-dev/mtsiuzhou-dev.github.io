/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { FilterMap, FilterNames } from '../constants/Filters';
import Storage from '../data/Storage';

const getTasksByFilter = state =>
  state.taskList.filter(FilterMap[state.filterName]);

const initialState = Storage.load() || {
  filterName: FilterMap.All.name,
  taskList: [],
};

const TasksSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTask: (state, { payload }) => {
      state.taskList.unshift({ ...payload });
    },
    deleteTask: (state, { payload }) => {
      state.taskList = state.taskList.filter(task => task.id !== payload);
    },
    toggleTask: (state, { payload }) => {
      const targetTask = state.taskList.find(task => task.id === payload);
      if (targetTask) {
        targetTask.isCompleted = !targetTask.isCompleted;
      }
    },
    editTask: (state, { payload }) => {
      const targetTask = state.taskList.find(task => task.id === payload.id);
      if (targetTask) {
        targetTask.name = payload.newName;
      }
    },
    clearCompletedTasks: state => {
      state.taskList = state.taskList.filter(task => !task.isCompleted);
    },
    setFilter: (state, { payload }) => {
      if (FilterNames.some(filter => filter === payload)) {
        state.filterName = payload;
      }
    },
    reorderTasks: (state, { payload }) => {
      const { source, destination } = payload;
      if (
        !destination ||
        (source.droppableId === destination.droppableId &&
          source.index === destination.index)
      ) {
        return;
      }
      const filteredTasks = getTasksByFilter(state);
      const sourceIndex = state.taskList.findIndex(
        task => task.id === filteredTasks[source.index].id
      );
      const destIndex = state.taskList.findIndex(
        task => task.id === filteredTasks[destination.index].id
      );
      const [movedTask] = state.taskList.splice(sourceIndex, 1);
      state.taskList.splice(destIndex, 0, movedTask);
    },
  },
});

const selectCurrentFilter = state => state.todo.filterName;
const selectTasksByFilter = state => getTasksByFilter(state.todo);
const selectActiveTasksLength = state =>
  state.todo.taskList.filter(FilterMap.Active).length;

export { selectCurrentFilter, selectTasksByFilter, selectActiveTasksLength };
export const {
  addTask,
  deleteTask,
  toggleTask,
  editTask,
  clearCompletedTasks,
  reorderTasks,
  setFilter,
} = TasksSlice.actions;
export default TasksSlice.reducer;
