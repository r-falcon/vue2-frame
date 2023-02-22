<template>
  <div class="app-container">
    <Table :total="6" :columns="columns" :dataSource="dataSource" />
  </div>
</template>

<script>
import { Table } from "@/components/self/Table";

export default {
  name: "useTable",
  components: { Table },
  data() {
    return {
      columns: [
        {
          dataIndex: "id",
          title: "ID",
        },
        {
          dataIndex: "name",
          title: "姓名",
        },
        {
          dataIndex: "sex",
          title: "性别",
        },
        {
          dataIndex: "age",
          title: "年龄",
          render: (record) => record.age + "岁",
        },
      ],
      dataSource: [
        {
          id: 1,
          name: "falcon",
          sex: "female",
          age: 20,
        },
        {
          id: 2,
          name: "falcon",
          sex: "female",
          age: 20,
        },
        {
          id: 3,
          name: "falcon",
          sex: "female",
          age: 20,
        },
        {
          id: 4,
          name: "falcon",
          sex: "female",
          age: 20,
        },
        {
          id: 5,
          name: "falcon",
          sex: "female",
          age: 20,
        },
        {
          id: 6,
          name: "falcon",
          sex: "female",
          age: 20,
        },
      ],
    };
  },
};
</script>
