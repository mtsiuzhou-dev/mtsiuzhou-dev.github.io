export const FilterMap = {
  All: () => true,
  Active: task => !task.isCompleted,
  Completed: task => task.isCompleted,
};

export const FilterNames = Object.keys(FilterMap);
