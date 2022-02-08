<template>
    <router-link :to="to" class="link" :class="{active: isActive}">
        <slot />
    </router-link>
</template>


<script>
import {computed} from 'vue'
import {useRoute} from 'vue-router'

export default {
    name: 'navbarlink',
    props: {
        to: {type: String, required: true}
    },
    setup(props) {
        const route = useRoute()
        const isActive = computed(() => route.path === props.to)
        return {isActive}
    }
}
</script>

<style lang="sass">
.link
    color: #fff
    margin: 0 .625rem
    position: relative
    &.active
        &::after
            content: ''
            width: 100%
            height: .1875rem
            background: $border-color
            position: absolute
            bottom: -28px
            left: 0
</style>