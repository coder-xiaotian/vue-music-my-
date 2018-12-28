<template>
    <div class="loding">
        <img src="./loading.gif" width="24px" height="24px">
        <p class="desc">{{title}}</p>
    </div>
</template>

<script>
  export default {
    props: {
        title: {
            type: String,
            default: '加载中...'
        }
    }
  }
</script>

<style scoped lang="stylus">
    @import "~common/stylus/variable"

    .loding
        width: 100%
        text-align: center
        .desc
            line-height: 20px
            font-size: $font-size-small
            color: $color-text-l
</style>
