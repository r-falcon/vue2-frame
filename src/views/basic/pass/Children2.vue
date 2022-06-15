<template>
  <div>
    <p>children2,count2 is:{{$attrs.count2}}</p>
    <p>children2,count3 is:{{$attrs.count3}}</p>
    <button @click='handleAdd2'>count2++</button>
    <button @click='handleAdd3'>count3++</button>
  </div>
</template>

<script>
export default {
  methods:{
    handleAdd2(){
      this.$emit('addCount2')
    },
    handleAdd3(){
      this.$emit('addCount3')
    }
  }
}
</script>