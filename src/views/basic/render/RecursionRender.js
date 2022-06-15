export default {
  name: "RecursionRender",

  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    loopH(h, list) {
      return h(
        "div",
        {
          attrs: {
            class: "list-item",
          },
          props: {
            list: list,
          },
        },
        [
          h(
            "div",
            {
              attrs: {
                class: "item-name",
              },
            },
            [h("span", list.name)]
          ),
          (() => {
            if (!list.children || !list.children.length) return [];
            return list.children.map((item) => {
              return this.loopH(h, item);
            });
          })(),
        ]
      );
    },
  },
  mounted() {},
  render(h) {
    return this.loopH(h, this.list[0]);
  },
};
