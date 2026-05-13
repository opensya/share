export const getApiUrl = () => {
  return API_BASE_URL;
};

export const isBrowser = () => {
  return typeof window !== "undefined";
};
