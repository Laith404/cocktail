import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    product: [],
    cart: [],
    price: [],
    typeProduct: [],
    searchValue: ''
  },
  mutations: {
    SET_STORE: (state, products) => {
      state.product = products;
    },
    SET_CART: (state, product) => {
      let item = state.cart.find( i => i.id === product.id)

      if(item) {
        item.quantity++
      } else {
        state.cart.push({...product, quantity: 1})
      }
    },
    DELETE_CART: (state, product) => {
      let item = state.cart.find( i => i.id === product.id);
      if(item) {
        if(item.quantity > 1) {
          item.quantity--
        }else {
          state.cart = state.cart.filter(i => i.id !== product.id)
        }
      }
    },
    SET_SEARCH_PRODUCT: (state, value) => {
      state.searchValue = value;
    },
    SET_PRICE_FILTER: (state, value) => {
      state.price = value;
    },
    SET_TYPE_PRODUCT: (state, value) => {
      state.typeProduct = value;
    }

  },
  actions: {
    GET_STORE_API({commit}) {
      return axios('http://localhost:3000/products', {
      method: "GET"
    })
      .then((products) => {
        commit('SET_STORE', products.data);
        return products;
      })
      .catch((error) => {
        console.log(error)
        return error;
      })
    },
    SET_SEARCH_PRODUCT({commit}, value) {
      commit('SET_SEARCH_PRODUCT', value)
    },
    SET_PRICE_FILTER({commit}, value) {
      commit('SET_PRICE_FILTER', value)
    },
    SET_TYPE_PRODUCT({commit}, value) {
      commit('SET_TYPE_PRODUCT', value)
    }
  },
  getters: {
    PRODUCTS: state => {
      return state.product
    },
    CARTS: state => {
      return state.cart
      },
    SEARCH_VALUE: state => {
      return state.searchValue
    },
    PRICE: state => {
      return state.price
    },
    TYPE_PRODUCT: state => {
      return state.typeProduct
    }
  }
})
