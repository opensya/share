export const getApiUrl = () => {
  return apiBaseUrl;
};

export const isBrowser = () => {
  return typeof window !== "undefined";
};
