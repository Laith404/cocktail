<template>
    <div class="sidebar">
        <div class="price">
            <h1>Цена</h1>
        <div class="range-slider">
            <Slider v-model="value" :merge="merge" :format='format' />
        </div>
        </div>
        <div class="type-cockteil">
            <div class="list">
                <h1 class='sidebar-title'>Тип коктейлий</h1>
                <Multiselect
                v-model="typeSelected"
                :options="options"/>
            </div>
            
           <!-- <select v-model="typeSelected">
            <option value="all">Все</option>
            <option value="alcohol">Алкогольные коктейли</option>
            <option value="notAlcohol">Без алкогольные коктейли</option>
            </select> -->
            <!-- <div class="list">
                <div class="list-input"><input type="checkbox" v-model="typeSelected" value="notAlcohol" id="notAlcohol"><label for="notAlcohol">Без алкогольные коктейли</label></div>
                <div class="list-input"><input type="checkbox" v-model="typeSelected" value="alcohol" id="alcohol"><label for="alcohol">Алкогольные коктейли</label></div>
            </div> -->
            
            <div class="list">
                <h1 class='sidebar-title'>Ингридиенты</h1>
                <div class="list-input"
                     v-for="(value,key) in compProduct"
                     :key="key">
                    <input type="checkbox" 
                    class="checkbox-comp"
                    :value="value"
                    v-model="compSelected" 
                    :id="key"><label :for="key">{{value}}</label>
                </div>
            </div>
            <button v-if='TYPE_PRODUCT.length || typeSelected.length'
            class="btn"
            @click="TypeSelected()">Применить</button>
    
        </div>
    </div>
</template>

<script>
import Slider from '@vueform/slider'
import Multiselect from '@vueform/multiselect' 
import '@vueform/multiselect/themes/default.css' 
import "@vueform/slider/themes/default.css"
import { mapGetters,mapActions } from 'vuex'

export default {
    name: 'Sidebar',
    components: {
        Slider,
        Multiselect
    },
    data: () => ({
        value: [0,100],
        merge: 20,
        step: -1,
        typeSelected: 'all',
        options: {
          all: 'Все',
          notAlcohol: 'Без алкогольные коктейли',
          alcohol: 'Алкогольные коктейли'
        },
        compSelected: [],
        format: function(value){
            return `${value * 10}`
        }
    }),
    computed: {
        ...mapGetters([
            "PRICE",
            "PRODUCTS",
            "TYPE_PRODUCT"
        ]),
        compProduct() {
            let sorted = new Set();
            [...this.PRODUCTS].filter(({comp}) => {
                for(let key of comp) {
                    sorted.add(key);
                }
            })
            return sorted;
        }
    },
    methods: {
    ...mapActions([
        'SET_PRICE_FILTER',
        "SET_TYPE_PRODUCT",
      ]),
        PriceFilter(value) {
            this.SET_PRICE_FILTER(value);
        },
        TypeSelected() {
            let array = [];
            array.push(this.typeSelected);
            array = array.concat(Array.from(this.compSelected));
            this.SET_TYPE_PRODUCT(array);
        }
    },
    watch: {
        value() {
            this.PriceFilter(this.value);
        }
    },
    mounted() {
        this.PriceFilter(this.value);
    }
}
</script>

<style lang="sass">
.checkbox-comp
    position: absolute
    z-index: -1
    opacity: 0
    &+label
        display: inline-flex
        align-items: center
        user-select: none
        &::before
            content: ''
            display: inline-block
            width: 1rem
            height: 1rem
            flex-shrink: 0
            flex-grow: 0
            border: 1px solid $border-color
            border-radius: .25rem
            margin: 0 .5rem 0 0
            background-repeat: no-repeat
            background-position: center center
            background-size: 50% 50%
    &:checked+label::before
        border-color: $border-color
        background-color: $border-color
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e")
.sidebar .price .range-slider
    margin: auto!important
    padding: 0 1.25rem
    box-sizing: border-box
    width: 100%!important

.multiselect-dropdown
    background: $blue-color
    overflow: hidden
    border: 3px solid $border-color
.multiselect-option.is-pointed
    background: $border-color
    color: #fff

.multiselect-option.is-selected, .multiselect-option.is-selected.is-pointed
    background: $border-color

.multiselect-clear
    display: none
    overflow: hidden
.multiselect.is-active
    box-shadow: none
.multiselect-caret
    background-color: #fff
.multiselect
    background: $blue-color
    border: .125rem solid
    border-color: $border-color
.slider-handle
    background: $border-color

.slider-connect
    background: $blue-color
.slider-tooltip
    background: $border-color
    border-color: $border-color
.slider-handle:focus
    box-shadow: 0 0 0 3px rgba(134, 132, 224, .32),.5px .5px 2px 1px rgba(0,0,0,.32)
.sidebar
    width: 16.875rem
    height: 100%
    margin: 0 1.375rem 0 0
    background: $block-color
    box-shadow: 0 0 20px rgba(51, 34, 133, .25)
    padding: 1.25rem .625rem
    box-sizing: border-box
    border-radius: .9375rem
    &-title
        font:
            size: 1.25rem
        margin: 0 0 .625rem 0!important
    .price
        margin: 0 0 2.5rem 0
        h1
            margin: 0 0 3.125rem 0
        .range-slider
            width: 200px
            margin: auto 16px
            text-align: center
            position: relative
    .list
        display: flex
        flex-direction: column
        margin: 0 0 .625rem
        &-input
            display: flex
            align-items: center
            flex: 1
            margin: .15625rem 0
            input
                margin: 0 .3125rem 0 0


.slider-horizontal
    height: var(--slider-height,5px)

</style>

<style lang="sass" scoped>
.btn
    max-width: 100%
</style>