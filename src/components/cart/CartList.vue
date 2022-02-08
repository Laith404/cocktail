<template>
    <div class="cart-list">
        <CartItem 
        v-for="product in productCart"
        :key="product.id"
        :product="product"/>
        
    </div>
</template>

<script>
import CartItem from "./CartItem.vue"
export default {
    name: 'cartlist',
    components: {CartItem},
    computed: {
        productCart() {
            return this.$store.getters.CARTS
        }
    }
}
</script>

<style lang="sass" scoped>
.cart-list
    width: 100%
</style>