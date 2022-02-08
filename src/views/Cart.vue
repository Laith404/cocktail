<template>
    <div class="cart">
      <div class="container">
        <div class="header-title">
        <h1>Ваша корзина</h1>
        </div>
        <div class="content">
           <CartList />
        </div>
        
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import CartList from '@/components/cart/CartList'
import {mapGetters, mapActions} from "vuex"
export default {
  name: 'Cart',
  components: {
    CartList
  },
  computed: {
      ...mapGetters([
          'CARTS'
      ])
  }
}
</script>

<style lang="sass" scoped>
.header-title
    margin:
      bottom: 1.5625rem
.content
  width: 100%
</style>