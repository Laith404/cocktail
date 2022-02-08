<template>
    <div class="navbar">
        <div class="container">
          <div class="navbar-content">
              <router-link to='/' class='navbar-logo'>
                <img src="@/assets/img/logo.png" alt="">
              </router-link>
            <div class="navbar_search">
              <input type="text" @keyup.enter="search(searchProduct)" placeholder="поиск..." class="navbar_search-input" v-model="searchProduct">
              <button @click="search(searchProduct)" class="navbar_search-button"><i class="fas fa-search"></i></button>
              <button @click="deleteSearch()" class="navbar_search-delete"
                      v-if='this.searchProduct !== ""'
              ><i class="fas fa-times"></i></button>
            </div>
            <nav class="navbar-nav">
              <NavbarLink to='/' class="navbar-nav__link">Коктейли</NavbarLink>
              <NavbarLink to='/cart' class="navbar-nav__link">Корзина <span class="cart-item" v-if="cartItemCount != 0">{{cartItemCount}}</span></NavbarLink>
            </nav>
          </div>
          
        </div>
    </div>
</template>

<script>
import NavbarLink from "./NavbarLink"
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'navbar',
  data() {
    return {searchProduct: ""}
  },
  components: {NavbarLink},
  methods: {
    ...mapActions([
        'SET_SEARCH_PRODUCT'
      ]),
      search(value) {
        this.SET_SEARCH_PRODUCT(value);
        if(this.$router.path !== '/') this.$router.push('/')
      },
      deleteSearch() {
        this.searchProduct = "";
        this.SET_SEARCH_PRODUCT("");
      }
  },
  computed: {
    ...mapGetters([
      "CARTS"
    ]),
    cartItemCount() {
      let result = 0;
        for(let i = 0; i < this.CARTS.length; i++) {
          result += this.CARTS[i].quantity;
        }
        return result || "";
      }
  }
}
</script>

<style lang="sass" scoped>
.navbar
  position: relative
  margin: 1.5625rem 0

  &-content
    width: auto
    display: flex
    flex-direction: row
    flex-wrap: wrap
    align-items: center
    justify-content: space-between
    background: $block-color
    padding: .6875rem 1.5rem
    border-radius: .625rem
    box-shadow: 0 0 20px rgba(51, 34, 133, .25)
  &-nav__link
    position: relative
  &-logo
    width: 3.3125rem
    height: 3.3125rem
    display: block
    img
      width: 100%
      height: 100%
  &_search
    position: relative
    max-width: 25rem
    width: 100%
    &-input
      width: 100%
      background: $dark-color
      border-radius: .3125rem
      padding: .4rem 4.1rem .4rem 1rem
      box-sizing: border-box
      border: 2px solid $blue-color
      color: #fff
      font-size: 1rem
      &::placeholder
        color: #fff
        opacity: .15
    &-button
      position: absolute
      right: 0
      top: 0%
      transform: translateY(0%)
      background: $blue-color
      border: 0
      border-radius: 0 .3125rem .3125rem 0
      width: 4rem
      height: 100%
      color: #fff
      font-size: 1rem
      text-align: center
      cursor: pointer
    &-delete
      position: absolute
      right: 4.375rem
      top: 50%
      transform: translateY(-50%)
      background: transparent 
      border: 0
      border-radius: 0 .3125rem .3125rem 0
      width: 2rem
      height: 2rem
      color: #fff
      font-size: 1rem
      text-align: center
      cursor: pointer
      opacity: .25

.cart-item
  position: absolute
  width: .9375rem
  height: .9375rem
  top: -0.75rem
  right: -0.75rem
  display: flex
  justify-content: center
  align-items: center
  font:
    size: .625rem
  background: $border-color
  border: 2px solid $blue-color
  border-radius: 100%
</style>

