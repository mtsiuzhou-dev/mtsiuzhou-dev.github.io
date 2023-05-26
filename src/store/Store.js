import { configureStore } from '@reduxjs/toolkit';
import Storage from '../data/Storage';
import TasksReducer from './TasksSlice';

const Store = configureStore({
  reducer: {
    todo: TasksReducer,
  },
});

Store.subscribe(() => Storage.save(Store.getState().todo));

export default Store;
