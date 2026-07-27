export function useFilterData(searchVal, data) {
  if (!searchVal) return data;

  return data.filter((item) =>
    item.task_title.toLowerCase().includes(searchVal.toLowerCase())||item.task_description.toLowerCase().includes(searchVal.toLowerCase()),
  );
}
