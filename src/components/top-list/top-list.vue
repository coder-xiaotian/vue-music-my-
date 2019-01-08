<template>
    <transition name="slide">
        <music-list :title="title" :bgImage="bgImage"></music-list>
    </transition>
</template>

<script>
    import MusicList from 'components/music-list/music-list'
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            title() {
                return this.topList.topTitle
            },
            bgImage() {
                return this.topList.picUrl
            },
            ...mapGetters([
                'topList'
            ])
        },
        components: {
            MusicList
        }
    }
</script>

<style scoped lang="stylus">
    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s
</style>
