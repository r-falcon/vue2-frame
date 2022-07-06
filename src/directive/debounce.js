const debounce = {
  inserted: (el, binding) => {
    let delay = binding.args;
    if (!delay) {
      delay = 1000;
    }
    let time;
    el.addEventListener("click", () => {
      if (time) {
        clearTimeout(time);
      }
      time = setTimeout(() => {
        binding.value();
      }, delay);
    });
  },
};

export default debounce;
