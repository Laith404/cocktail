<template>
    <div class="catalog-item">
        <div class="catalog-item__content">
            <div class="catalog-item__img">
                <div class="typical-img">
                    <img :src="require('@/assets/img/' + product.image)" alt="">
                </div>
            </div>
            <div class="catalog-item__info">
                <div class="catalog-item__info-title">
                    <h2>{{product.name}}</h2>
                    <span><i class="fas fa-star icon"></i>{{formatRating}}</span>
                </div>
                <div class="catalog-item__info-text">
                    <h3>Состав:</h3>
                    <div class="list">
                        <span v-for="prop in product.comp" :key='prop'>
                            {{prop}}
                        </span>
                    </div>
                    
                </div>
            </div>
            <div class="catalog-item__buy">
                <span class="price" >{{formatPrice}}</span>
                <button class="btn" @click="addToCart()">В корзину</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CatalogItem',
    props: ['product'],
    methods: {
        addToCart() {
            this.$store.commit('SET_CART', this.product)
        }
        
    },
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
           
        },
        formatRating() {
            let rating = this.product.rating;
            if(!parseInt(rating)) {
                return ''
            }
            return rating.toFixed(1)
        }
    }
}
</script>

<style lang="sass" scoped>
.catalog-item
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
            span
                margin: 0 0 1.25rem
                display: block
                font:
                    size: .875rem
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