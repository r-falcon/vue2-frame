export default {
  data() {
    return {
      username: "alice",
      lesson: {
        hour: 3,
        teacher: "Mr. Li",
      },
    };
  },
  created() {
    console.log("混入对象");
  },
  methods: {
    sayHi() {
      return "hello world";
    },
  },
};
