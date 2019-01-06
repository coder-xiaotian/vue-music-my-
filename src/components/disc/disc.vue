<template>
    <transition name="slider">
        <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
    </transition>
</template>

<script>
    import MusicList from 'components/music-list/music-list'
    import {mapGetters} from 'vuex'
    import {getSongList} from 'api/recommend'
    import {ERR_OK} from 'api/config'
    import {createSong, processSongsUrl} from 'common/js/song'

    export default {
        computed: {
            title() {
                return this.disc.dissname
            },
            bgImage() {
                return this.disc.imgurl
            },
            ...mapGetters([
                'disc'
            ])
        },
        data() {
            return {
                songs: []
            }
        },
        created() {
            this._getSongList()
        },
        methods: {
            _getSongList() {
                if(!this.disc.dissid) {
                    this.$router.push({
                        path: '/recommend'
                    })
                    return
                }
                getSongList(this.disc.dissid).then((res) => {
                    if(res.code === ERR_OK) {
                        processSongsUrl(this._normalizeSongs(res.cdlist[0].songlist)).then((songs) => {
                            this.songs = songs
                        })
                    }
                })
            },
            _normalizeSongs(list) {
                let ret = []
                list.forEach((musicData) => {
                    if(musicData.songid && musicData.albumid) {
                        ret.push(createSong(musicData))
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
    .slider-enter, .slider-leave-to
        transform: translate3d(100%, 0, 0)
    .slider-enter-active, .slider-leave-active
        transition: all 0.3s
</style>
