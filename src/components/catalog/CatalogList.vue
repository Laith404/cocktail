<template>
    <div class="catalog-list">
        <div class="sort">
            <div class="sort-button">
                <span>Сортировать по:</span>
            <button @click="sort('rating')"
                    type="rating"
                    :class="[sortBy === 'rating' ? sortDirection + ' active' : '']"
                    >Популярности</button>
            <button @click="sort('price')"
                    type="price"
                    :class="[sortBy === 'price' ? sortDirection + ' active' : '']"
                    v-if="sortBy !== 'price' || sortDirection === 'asc'"
                    >Цене <i class="fas fa-sort-amount-down-alt"></i></button>
            <button @click="sort('price')"
                    type="price"
                    :class="[sortBy === 'price' ? sortDirection + ' active' : '']"
                    v-else
                    >Цене <i class="fas fa-sort-amount-down"></i></button>
            <button @click="sort('name')" 
                    type="name"
                    :class="[sortBy === 'name' ? sortDirection + ' active' : '']"
                    v-if="sortBy !== 'name' || sortDirection === 'asc'"
                    >А-Я</button>
            <button @click="sort('name')"
                    type="name"
                    :class="[sortBy === 'name' ? sortDirection + ' active' : '']"
                    v-else
                    >Я-А</button>
            </div>
            
            <div class="product-length">{{renderProduct.length}} из {{this.sortedProducts.length}}</div>
        </div>
        <CatalogItem
        v-for="product in renderProduct"
        :key="product.id"
        :product="product"/>

        <div class="pagination"
             :class="{'hidden': this.sortedProducts.length < 8 || paginationPage < 2 }">
             <button class="btn"
                     @click="showMore()"
                     :class="{'hidden': this.pageNum === paginationPage}">загрузить ещё</button>
             <div class="pagination-num">
                    <div class="page back"
                    :class="{'hidden': this.pageNum === 1}"
                    @click="pageBack()"><i class="fas fa-arrow-left"></i></div>
                <div class="page"
                    v-for='page in paginationPage'
                    @click="pageClick(page)"
                    :class="{'page-active' : page === pageNum}"
                    :key='page'>{{page}}
                    </div>
                <div class="page go"
                    :class="{'hidden': this.pageNum === paginationPage}"
                    @click="pageGo()"><i class="fas fa-arrow-right"></i></div>
             </div>
            
        </div>
    </div>
</template>

<script>
import CatalogItem from './CatalogItem.vue'
import {mapGetters, mapActions} from "vuex"
export default {
    name: "CatalogList",
    components: {CatalogItem},
 
    data() {
        return {
            sortedProducts: [],
            sortBy: 'name',
            sortDirection: 'asc',
            perPage: 8,
            pageNum: 1
        }
    },
    computed: {
        ...mapGetters([
            'PRODUCTS',
            "SEARCH_VALUE",
            "PRICE",
            "TYPE_PRODUCT",
        ]),
        paginationPage() {
            return  Math.ceil(this.sortedProducts.length / this.perPage);

        },
        renderProduct() {
            let from = (this.pageNum - 1 ) * this.perPage;
            let to = from + this.perPage;
            return this.sortedProducts.slice(from, to)
        }
    },

    methods: {
        ...mapActions([
            "GET_STORE_API"
        ]),
        SearchProduct(value) {
            this.sortedProducts = [...this.PRODUCTS];
            this.sortedProducts = this.sortedProducts.filter(function ({name}) {
                return name.toLowerCase().includes(value.toLowerCase())
            })
        },
        sortPrice(value) {
            this.sortedProducts = [...this.PRODUCTS];
            this.sortedProducts = this.sortedProducts.filter(function({price}) {
                return price / 10 >= value[0] && price / 10 <= value[1]
            })
        },
        sortTypeProduct(typeProduct) {
            this.sortedProducts = [...this.PRODUCTS];
            if(typeProduct.length) {
                this.sortedProducts = this.sortedProducts.filter(({comp,type}) => {
                //    if(typeProduct.some(r => type.includes(r))) {
                //        return compProduct.every(r => comp.includes(r))
                //    }
                if(!typeProduct.includes('all')) {
                    return typeProduct.every( r => comp.includes(r) || r.includes(type.toString()))
                } else {
                    return typeProduct.every(r => comp.includes(r) || r.includes('all'))
                }
                    
                    // return compProduct.indexOf(type.toString() ) != -1 
                })
            } else {
                return this.sortedProducts;
            }
        },
        sort(el) {
            if(el === this.sortBy) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortBy = el;
            }
            return this.sortedProducts.sort((p1,p2) => {
                let modifier = 1;
                if(this.sortDirection ==='desc') modifier = -1;
                if(p1[this.sortBy] < p2[this.sortBy]) return -1 * modifier;
                if(p1[this.sortBy] > p2[this.sortBy]) return 1 * modifier;
                return 0;
            })
        },
        pageClick(page) {
            this.pageNum = page;
        },
        pageBack() {
            if(this.pageNum > 1) {
             this.pageNum -= 1;   
            }
        },
        pageGo() {
            if(this.pageNum < this.paginationPage) {
                this.pageNum += 1;
            }
        },
        showMore() {
            this.perPage += this.perPage;
            return this.perPage
        }
    },
    watch: {
        SEARCH_VALUE() {
            this.SearchProduct(this.SEARCH_VALUE);
        },
        PRICE() {
            this.sortPrice(this.PRICE);
        },
        TYPE_PRODUCT() {
            this.sortTypeProduct(this.TYPE_PRODUCT)
        }
    },
    mounted() {
        this.GET_STORE_API()
        .then((response) => {
            if(response.data) {
                this.SearchProduct(this.SEARCH_VALUE);
                this.sortPrice(this.PRICE, this.TYPE_PRODUCT);
            }
        })
    }
}
</script>

<style lang="sass">
.pagination
    position: relative
    width: 100%
    padding: 0 0 1.875rem 0
    .btn
        max-width: 100%!important
    &-num
        display: flex
        justify-content: center
        padding: 1.25rem 0 0 0 
    .page
        padding: .5rem
        margin: 0 .3125rem
        border: .125rem solid $border-color
        border-radius: .3125rem
        line-height: 1
        cursor: pointer
        font:
            size: .875rem
            weight: 600
        transition: all .15s ease-in-out
        &-active
            background: $border-color
        &:hover
            background: $border-color

</style>

<style lang="sass" scoped>
.catalog-list
    display: inline-block
    width: calc(100% - 16.875rem - 1.375rem)
    .product-length
        font:
            size: .875rem
            weigth: 200
        opacity: .65
    .sort
        width: 100%
        padding: 0 0 .3125rem 0
        margin: 0 0 1rem 0
        border-bottom: 2px solid $blue-color
        display: flex
        justify-content: space-between
        span
            margin: 0 .25rem 0 0
        button
            background: transparent
            border: 0
            color: #fff
            cursor: pointer
            margin: 0 0.125rem
            opacity: .6
            &.active
                font:
                    weight: 700
                opacity: .85
            &:hover
                opacity: .8

</style>