<template>
    <div class="cart-item">
        <div class="cart-item__content">
            <div class="cart-item__img">
                <div class="typical-img">
                    <img :src="require('@/assets/img/' + product.image)" alt="">
                </div>
            </div>
            <div class="cart-item__info">
                <div class="cart-item__info-title">
                    <h2>{{product.name}}</h2>
                    <p>Кол-во: <span>{{product.quantity}}</span></p>
                </div>
                <div class="cart-item__info-text">
                    <h3>Состав:</h3>
                    <div class="list">
                        <span v-for="prop in product.comp" :key='prop'>
                            {{prop}}
                        </span>
                    </div>
                    
                </div>
            </div>
            <div class="cart-item__buy">
                <span class="price" >{{formatPrice}}</span>
                <button class="btn" @click="deleteToCart()">Удалить</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CartItem',
    props: ['product'],
    computed: {
        formatPrice() {
             let price = this.product.price;
            if(!parseInt(price)) {
                return '';
            }
            if(price > 99) {
                var priceString = price.toFixed(2)
                var priceArray = priceString.split('').reverse();
                var index = 3;
                while(priceArray.length > index + 3) {
                    priceArray.splice(index + 3,0, ' ');
                    index += 4;
                }
                return priceArray.reverse().join('') + '₽'
            } else {
                return price + '₽'
            }
           
        }
    },
    methods: {
        deleteToCart() {
            return this.$store.commit('DELETE_CART', this.product)
        }
    }
}
</script>
<style lang="sass" scoped>
.cart-item
    position: relative
    width: 100%
    background: $block-color
    margin: .78125rem 0
    padding: .625rem 0
    max-height: 13.75rem
    z-index: 2
    border-radius: 1.25rem
    box-shadow: 0 0 1.25rem rgba(51, 34, 133, .25)
    display: block
  
    &__content
        height: 100%
        display: flex
        justify-content: space-between
        
    &__img
        width: 10.0625rem
        height: 10.0625rem
        margin: 0 auto
        display: block
        margin: 0 0 0 .75rem
        background: $dark-color
        padding: 1.25rem 1.25rem
        border-radius: 100%
        align-self: center
        img
            width: 100%
            height: 100%
    &__info
        flex: 1
        display: flex
        flex-direction: column
        margin: 0 0 0 1.25rem
        align-self: center
        &-title
            h2
                font:
                    size: 1.5rem
                    weight: 400
                    family: "Rubik", sans-serif
                line-height: 1.25
                margin: 0 0 .125rem 0
            p
                display: inline-flex
                align-items: center
                justify-content: center
                margin: 0 0 1.25rem
                font:
                    size: .875rem
                opacity: .75
            span
                margin: 0 0 0 .3125rem
                display: block
                font:
                    weight: 700
                .icon
                    color: $border-color
                    font:
                        size: 1rem
                    margin: 0 .3125rem 0 0
        &-text
            h3
                font:
                    size: 1.0625rem
            .list
                line-height: 1.4
                margin: .3125rem 0 0 0
                opacity: .65
                display: flex
                flex-direction: row
                flex-wrap: wrap
                font-size: .75rem
                padding: 0 3.125rem 0 0 
                &:last-child::after
                    content: ' '
                span
                    margin: 0 .15625rem
                    &:not(&:last-child)::after
                        content: ','
                    &:last-child::after
                        content: '.'

        
    &__buy
        align-self: center
        display: flex
        justify-content: center
        align-items: center
        flex-direction: column
        margin: 0 1.375rem 0 0
        flex: .65
        .price
            margin: 0 0 1.25rem 0
            font:
                size: 1.25rem
                weight: 400
            display: block
</style>