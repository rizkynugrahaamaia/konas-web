const KONAS_TOKEN = 'konas_web';

export const getLogged = () => {
  return JSON.parse(localStorage.getItem(KONAS_TOKEN));
};

export const setLogged = (value) => {
  localStorage.setItem(KONAS_TOKEN, JSON.stringify(value));
};

export const clearStorage = () => {
  localStorage.removeItem(KONAS_TOKEN);
};
