export default {
  data() {
    return {
      // 性别
      sexOptions: [
        {
          value: "1",
          label: "男",
        },
        {
          value: "2",
          label: "女",
        },
      ],
      FKXB: {
        1: "男",
        2: "女",
      },

      houseTypeList: [
        {
          value: "1",
          label: "两室一厅",
        },
        {
          value: "2",
          label: "三室一厅",
        },
        {
          value: "3",
          label: "三室两厅",
        },
      ],
      FWLX: {
        1: "两室一厅",
        2: "三室一厅",
        3: "三室两厅",
      },

      currentList: [
        {
          value: "1",
          label: "预售",
        },
        {
          value: "2",
          label: "在售",
        },
        {
          value: "3",
          label: "已售出",
        },
      ],
      DQZT: {
        1: "预售",
        2: "在售",
        3: "已售出",
      },
    };
  },
};
