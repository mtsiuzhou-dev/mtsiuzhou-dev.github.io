import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { setFilter, selectCurrentFilter } from '../../store/TasksSlice';
import Button from '../atoms/Button';
import { FilterNames } from '../../constants/Filters';
import style from './FilterButtonList.module.scss';

const FilterButtonList = () => {
  const currentFilter = useSelector(selectCurrentFilter);
  const dispatch = useDispatch();

  return (
    <div className={style.filters}>
      {FilterNames.map(name => (
        <Button
          text={name}
          isPressed={name === currentFilter}
          onClick={() => dispatch(setFilter(name))}
          key={`filter-${name}-${nanoid()}`}
        />
      ))}
    </div>
  );
};

export default FilterButtonList;
