const dict = {
  namespaced: true,
  state: {
    statusOptions: [
      {
        label: "富强",
        value: "F",
      },
      {
        label: "民主",
        value: "M",
      },
      {
        label: "文明",
        value: "W",
      },
      {
        label: "和谐",
        value: "H",
      },
    ],
    levelOptions: [
      {
        id: 11,
        label: "组织架构1-1",
        children: [
          {
            id: 21,
            label: "组织架构2-1",
            children: [
              {
                id: 31,
                label: "组织架构3-1",
              },
              {
                id: 32,
                label: "组织架构3-2",
              },
            ],
          },
          {
            id: 22,
            label: "组织架构2-1",
          },
        ],
      },
      {
        id: 12,
        label: "组织架构1-2",
        children: [
          {
            id: 23,
            label: "组织架构2-3",
          },
        ],
      },
    ],
  },
  mutations: {
    setStatusOptions(state, payload) {
      state.statusOptions = payload;
    },
    setLevelOptions(state, payload) {
      state.levelOptions = payload;
    },
  },
};

export { dict };
