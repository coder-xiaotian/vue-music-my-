<template>
    <transition name="slide">
        <music-list :rank="rank" :title="title" :bgImage="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
    import MusicList from 'components/music-list/music-list'
    import {mapGetters} from 'vuex'
    import {getMusicList} from 'api/rank'
    import {ERR_OK} from 'api/config'
    import {createSong, processSongsUrl} from 'common/js/song'

    const FOR_FREE = 0
    export default {
        computed: {
            title() {
                return this.topList.topTitle
            },
            bgImage() {
                if(this.songs.length) {
                    return this.songs[0].image
                }
            },
            ...mapGetters([
                'topList'
            ])
        },
        data() {
            return {
                songs: [],
                rank: true
            }
        },
        created() {
            this._getMusicList()
        },
        methods: {
            _getMusicList() {
                if(!this.topList.id) {
                    this.$router.push('/rank')
                    return
                }
                getMusicList(this.topList.id).then((res) => {
                    if(res.code === ERR_OK) {
                        processSongsUrl(this._normalizeSongs(res.songlist)).then((songs) => {
                            this.songs = songs
                        })
                    }
                })
            },
            _normalizeSongs(list) {
                let ret = []
                list.forEach((item) => {
                    const musicData = item.data
                    if(musicData.songid && musicData.albumid) {
                        // 过滤掉付费播放的歌曲
                        if(musicData.pay.payalbum === FOR_FREE) {
                            ret.push(createSong(musicData))
                        }
                    }
                })

                return ret
            }
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
