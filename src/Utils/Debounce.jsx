const Debounce = (fn, delay) => {
  let timer = 0;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
export { Debounce };
