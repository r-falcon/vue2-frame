import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      taskOptions: [
        { label: "待办", value: "do" },
        { label: "在办", value: "doing" },
        { label: "已完成", value: "done" },
      ],
    };
  },
  computed: {
    ...mapState({
      statusOptions: (state) => state.dict.statusOptions,
      roleOptions: (state) => state.dict.roleOptions,
    }),
  },
  methods: {
    ...mapMutations({
      setRoleOptions: "dict/setRoleOptions",
    }),

    dataFormat(arr) {
      var result = [];
      arr.map((item) => {
        if (item.level === "0") {
          result.push({
            label: item.authName,
            value: item.id,
          });
        }
      });
    },
  },
};
