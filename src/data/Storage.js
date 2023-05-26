import { LocalStorageKey } from '../constants/Keys';

const Storage = {
  save: taskList =>
    localStorage.setItem(LocalStorageKey, JSON.stringify(taskList)),
  load: () => JSON.parse(localStorage.getItem(LocalStorageKey)),
};

export default Storage;
