export const setToLS = (key: string, value: any): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLS = (key: string): any => {
  const value = window.localStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }
};
