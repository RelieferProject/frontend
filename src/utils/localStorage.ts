export const setLocal = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

declare const global: any;

export const getLocal = (key: string) => {
  // if (!global.browser) return null;

  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  } else {
    return null;
  }
};

export const removeLocal = (key: string) => {
  localStorage.removeItem(key);
};

export const ClearLocal = () => {
  localStorage.clear();
};
