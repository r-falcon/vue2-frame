import "intersection-observer";
// 图片懒加载
const lazyLoad = {
  bind: function (el, binding) {
    let observer = new IntersectionObserver((entries) => {
      for (let i of entries) {
        // 如果元素处于可视区域
        if (i.isIntersecting > 0) {
          // 获取该元素
          let img = i.target;
          // 重新设置src值
          img.src = binding.value;
          // 取消对该元素的观察
          observer.unobserve(img);
        }
      }
    });
    // 为img标签添加一个观察
    observer.observe(el);
  },
};

export default lazyLoad;
