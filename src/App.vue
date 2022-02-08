<template>
  <Navbar/>
  <router-view/>
</template>

<style lang="scss">

</style>


<script>
import Navbar from '@/components/navbar/Navbar'

export default {
  components: {Navbar}
}
</script>