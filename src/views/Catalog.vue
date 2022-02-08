<template>
    <div class="catalog">
      <div class="container">
          <div class="header-title">
            <h1>Меню коктейлей</h1>
          </div>
          <div class="content">
            <Sidebar/>
            <CatalogList></CatalogList>
          </div>
        
      </div>
    </div>
</template>

<script>

import CatalogList from '@/components/catalog/CatalogList'
import Sidebar from '@/components/sidebar/Sidebar'
export default {
  name: 'Catalog',
  components: {
    Sidebar,
    CatalogList
  }
}
</script>

<style lang="sass">
.content
    display: flex
    flex-wrap: wrap
    margin: 0 0 0 0

.header-title
    position: relative
    margin:
      top: 3.125rem
    padding: 0 0 1.25rem 0
    &::after
      content: ''
      width: 100%
      height: 3px
      background: $border-color
      position: absolute
      bottom: 0
      left: 0
      display: block
</style>

<style lang="sass" scoped>
.header-title
    margin:
      bottom: 3.5625rem

</style>