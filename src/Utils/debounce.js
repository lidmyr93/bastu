export const debounce = (callback, time) => {
  let interval;
  console.log("called");
  return (...args) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;
      callback(...args);
    }, time);
  };
};
