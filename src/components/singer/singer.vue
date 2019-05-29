<template>
    <div class="singer" ref="singer">
        <listview @select="selectSinger" :data="singers" ref="listview"></listview>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getSingerList} from 'api/singer'
    import {ERR_OK} from 'api/config'
    import Singer from 'common/js/singer'
    import Listview from 'base/listview/listview'
    import {mapMutations} from 'vuex'
    import {playlistMixin} from 'common/js/mixin'

    const HOT_NAME = '热门'
    const HOT_SINGER_LIST = 10

    export default {
        mixins: [playlistMixin],
        data() {
            return {
                singers: []
            }
        },
        methods: {
            handlePlaylist(playlist) {
                const bottom = playlist.length > 0 ? '60px' : ''
                this.$refs.singer.style.bottom = bottom
                this.$refs.listview.refresh()
            },
            selectSinger(singer) {
                this.$router.push({
                    path: `/singer/${singer.id}`
                })
                this.setSinger(singer)
            },
            _getSingerList() {
                getSingerList().then((res) => {
                    if(res.code === ERR_OK) {
                        this.singers = res.data.list
                        this.singers = this._normalizeSinger(res.data.list)
                    }
                })
            },
            _normalizeSinger(list) {
                let map = {
                    hot: {
                        title: HOT_NAME,
                        items: []
                    }
                }
                list.forEach((item, index) => {
                    if(index < HOT_SINGER_LIST) {
                        map.hot.items.push(new Singer({
                            id: item.Fsinger_mid,
                            name: item.Fsinger_name
                        }))
                    }
                    const key = item.Findex
                    if(!map[key]) {
                        map[key] = {
                            title: key,
                            items: []
                        }
                    }
                    map[key].items.push(new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name
                    }))
                })
                // 对map进行排序
                let hot = []
                let ret = []
                for(let key in map) {
                    let val = map[key]
                    if(val.title.match(/[a-zA-Z]/)) {
                        ret.push(val)
                    } else if(val.title === HOT_NAME) {
                        hot.push(val)
                    }
                }

                ret.sort((a, b) => {
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                })

                return hot.concat(ret)
            },
            ...mapMutations({
                setSinger: 'SET_SINGER'
            })
        },
        created() {
            console.log(this.singers)
            this._getSingerList()
        },
        components: {
            Listview
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .singer
        position: fixed
        top: 88px
        bottom: 0
        width: 100%
</style>
