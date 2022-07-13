<template>
  <div class="app-container">
    <p>name:{{ user.name }}</p>
    <p>age:{{ user.age }}</p>
    <p>hobbies:{{ user.hobbies }}</p>
    <p>job:{{ user.job }}</p>
    <p>lesson:{{ lesson }}</p>
    <el-button @click="handleChange">change</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "falcon",
        age: 20,
        hobbies: ["1", "2", "3"],
        job: {
          name: "IT",
          salary: "3000",
        },
      },
      lesson: {
        title: "to be happy",
        page: 13,
      },
    };
  },
  /**
   * watch
   *  可以侦听到属性值和数组值的变化，侦听不到对象值的变化
   *  若想侦听到对象值的变化，启用深度侦听
   */
  watch: {
    "user.age": function (newVal, oldVal) {
      console.log("属性变化了", oldVal, newVal);
    },
    "user.hobbies": function (newVal, oldVal) {
      console.log("数组变化了", oldVal, newVal);
    },
    "user.job.salary": function (newVal, oldVal) {
      console.log("嵌套对象变化了", oldVal, newVal);
    },
    "lesson.page": function (newVal, oldVal) {
      console.log("对象变化了", oldVal, newVal);
    },
    deep: true,
  },
  methods: {
    handleChange() {
      this.user.age++;
      this.user.hobbies.push(this.user.hobbies.length + 1);
      this.user.job.salary = Number(this.user.job.salary) + 1000;
      this.lesson.page++;
    },
  },
};
</script>
