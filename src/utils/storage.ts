export const saveData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadData = (key: string, p0?: number) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
