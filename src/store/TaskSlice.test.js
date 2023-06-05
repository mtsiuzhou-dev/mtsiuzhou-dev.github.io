import { configureStore } from '@reduxjs/toolkit';
import TasksReducer, {
  addTask,
  deleteTask,
  toggleTask,
  editTask,
  clearCompletedTasks,
  setFilter,
  selectActiveTasksLength,
  selectCurrentFilter,
  selectTasksByFilter,
  reorderTasks,
} from './TasksSlice';
import { FilterMap } from '../constants/Filters';

describe('TaskSlice:', () => {
  const singleTaskList = [
    {
      id: '1',
      isCompleted: false,
      name: 'first',
    },
  ];

  test('addTask should add new task on first position', () => {
    const store = configureStore({
      reducer: TasksReducer,
      preloadedState: {
        filterName: '',
        taskList: singleTaskList,
      },
    });

    store.dispatch(addTask({ id: '2' }));

    const resultState = store.getState();
    const expectedState = {
      filterName: '',
      taskList: [{ id: '2' }, ...singleTaskList],
    };
    expect(resultState).toEqual(expectedState);
  });

  test('deleteTask should remove task by id', () => {
    const store = configureStore({
      reducer: TasksReducer,
      preloadedState: {
        filterName: '',
        taskList: singleTaskList,
      },
    });

    store.dispatch(deleteTask('1'));

    const resultState = store.getState();
    const expectedState = {
      filterName: '',
      taskList: [],
    };
    expect(resultState).toEqual(expectedState);
  });

  test('toggleTask should toggle isCompleted property', () => {
    const store = configureStore({
      reducer: TasksReducer,
      preloadedState: {
        filterName: '',
        taskList: singleTaskList,
      },
    });

    store.dispatch(toggleTask('1'));

    const resultState = store.getState();
    const expectedState = {
      filterName: '',
      taskList: [
        {
          id: '1',
          isCompleted: true,
          name: 'first',
        },
      ],
    };
    expect(resultState).toEqual(expectedState);
  });

  test('editTask should change name of task', () => {
    const store = configureStore({
      reducer: TasksReducer,
      preloadedState: {
        filterName: '',
        taskList: singleTaskList,
      },
    });

    store.dispatch(editTask({ id: '1', newName: 'one' }));

    const resultState = store.getState();
    const expectedState = {
      filterName: '',
      taskList: [
        {
          id: '1',
          isCompleted: false,
          name: 'one',
        },
      ],
    };
    expect(resultState).toEqual(expectedState);
  });

  test('clearCompletedTasks should remove completed task', () => {
    const store = configureStore({
      reducer: TasksReducer,
      preloadedState: {
        filterName: '',
        taskList: [
          ...singleTaskList,
          {
            id: '2',
            isCompleted: true,
            name: 'second',
          },
        ],
      },
    });

    store.dispatch(clearCompletedTasks());

    const resultState = store.getState();
    const expectedState = {
      filterName: '',
      taskList: singleTaskList,
    };
    expect(resultState).toEqual(expectedState);
  });

  test('setFilter should set active filter name', () => {
    const store = configureStore({
      reducer: TasksReducer,
      preloadedState: {
        filterName: FilterMap.All.name,
        taskList: [],
      },
    });

    store.dispatch(setFilter(FilterMap.Active.name));

    const resultState = store.getState();
    const expectedState = {
      filterName: FilterMap.Active.name,
      taskList: [],
    };
    expect(resultState).toEqual(expectedState);
  });

  test('setFilter should not set active filter when name is incorrect', () => {
    const store = configureStore({
      reducer: TasksReducer,
      preloadedState: {
        filterName: FilterMap.All.name,
        taskList: [],
      },
    });

    store.dispatch(setFilter('active'));

    const resultState = store.getState();
    const expectedState = {
      filterName: FilterMap.All.name,
      taskList: [],
    };
    expect(resultState).toEqual(expectedState);
  });

  test('reorderTasks should reorder correctly', () => {
    const store = configureStore({
      reducer: TasksReducer,
      preloadedState: {
        filterName: FilterMap.All.name,
        taskList: [
          ...singleTaskList,
          {
            id: '2',
            isCompleted: false,
            name: 'second',
          },
        ],
      },
    });

    store.dispatch(
      reorderTasks({
        source: {
          index: 1,
        },
        destination: {
          index: 0,
        },
      })
    );

    const resultState = store.getState();
    const expectedState = {
      filterName: FilterMap.All.name,
      taskList: [
        {
          id: '2',
          isCompleted: false,
          name: 'second',
        },
        ...singleTaskList,
      ],
    };
    expect(resultState).toEqual(expectedState);
  });

  test('selectCurrentFilter should return name of current filter', () => {
    const store = configureStore({
      reducer: TasksReducer,
      preloadedState: {
        todo: {
          filterName: FilterMap.All.name,
          taskList: [],
        },
      },
    });

    const result = selectCurrentFilter(store.getState());
    expect(result).toEqual(FilterMap.All.name);
  });

  test('selectTasksByFilter should return filtered tasks', () => {
    const store = configureStore({
      reducer: TasksReducer,
      preloadedState: {
        todo: {
          filterName: FilterMap.All.name,
          taskList: singleTaskList,
        },
      },
    });

    const result = selectTasksByFilter(store.getState());
    expect(result).toEqual(singleTaskList);
  });

  test('selectActiveTasksLength should return active tasks length', () => {
    const store = configureStore({
      reducer: TasksReducer,
      preloadedState: {
        todo: {
          filterName: FilterMap.Completed.name,
          taskList: singleTaskList,
        },
      },
    });

    const result = selectActiveTasksLength(store.getState());
    expect(result).toEqual(1);
  });
});
