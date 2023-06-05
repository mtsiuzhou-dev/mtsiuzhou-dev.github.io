import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import renderer from 'react-test-renderer';
import ActionList from './ActionList';
import TasksReducer from '../../store/TasksSlice';

describe('ActionList:', () => {
  const store = configureStore({
    reducer: {
      todo: TasksReducer,
    },
  });
  const actionList = (
    <Provider store={store}>
      <ActionList />
    </Provider>
  );

  test('renders correctly', () => {
    const actionListJson = renderer.create(actionList).toJSON();
    expect(actionListJson).toMatchSnapshot();
  });
});
