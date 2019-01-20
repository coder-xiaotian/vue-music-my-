<template>
    <scroll @scrollToEnd="searchMore"
            @beforeScroll="listScroll"
            :pullup="pullup"
            :data="result"
            :beforeScroll="beforeScroll"
            class="suggest"
            ref="suggest"
    >
        <ul class="suggest-list">
            <li @click.stop="selectItem(item)" class="suggest-item" v-for="item in result">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
            <loading v-show="hasMore" title=""></loading>
        </ul>
        <div v-show="!hasMore && !result.length" class="no-result-wrapper">
            <no-result title="抱歉，暂无搜索结果"></no-result>
        </div>
    </scroll>
</template>

<script>
    import {search} from 'api/search'
    import {ERR_OK} from 'api/config'
    import {createSong, processSongsUrl} from 'common/js/song'
    import Scroll from 'base/scroll/scroll'
    import Loading from 'base/loading/loading'
    import Singer from 'common/js/singer'
    import {mapMutations, mapActions} from 'vuex'
    import NoResult from 'base/no-result/no-result'

    const TYPE_SINGER = 'singer'
    const PER_PAGE = 20

    export default {
        props: {
            query: {
                type: String,
                default: ''
            },
            showSinger: {
                Type: Boolean,
                default: true
            }
        },
        data() {
            return {
                page: 1,
                result: [],
                pullup: true,
                hasMore: true,
                beforeScroll: true
            }
        },
        components: {
            Scroll,
            Loading,
            NoResult
        },
        methods: {
            refresh() {
                this.$refs.suggest.refresh()
            },
            listScroll() {
                this.$emit('listScroll')
            },
            selectItem(item) {
                if(item.type === TYPE_SINGER) {
                    const singer = new Singer({
                        id: item.singermid,
                        name: item.singername
                    })
                    this.$router.push({
                        path: `/search/${singer.id}`
                    })

                    this.setSinger(singer)
                } else {
                    this.insertSong(item)
                }

                this.$emit('select')
            },
            getDisplayName(item) {
                if(item.type === TYPE_SINGER) {
                    return item.singername
                } else {
                    return `${item.name}-${item.singer}`
                }
            },
            getIconCls(item) {
                if(item.type === TYPE_SINGER) {
                    return 'icon-mine'
                } else {
                    return 'icon-music'
                }
            },
            search() {
                // 每次query改变是搜索都要把这几个值重置
                this.page = 1
                this.hasMore = true
                this.$refs.suggest.scrollTo(0, 0)

                if(this.query.trim() !== '') {
                    search(this.query, this.page, this.showSinger, PER_PAGE).then((res) => {
                        if (res.code === ERR_OK) {
                            let result = this._getResult(res.data)
                            let songs = result.filter((item) => {
                                return item.type !== TYPE_SINGER
                            })
                            processSongsUrl(songs).then(() => {
                                this.result = result
                            })
                            this._checkMore(res.data)
                        }
                    })
                }
            },
            searchMore() {
                if(!this.hasMore) {
                    return
                }

                this.page++
                search(this.query, this.page, this.showSinger, PER_PAGE).then((res) => {
                    if(res.code === ERR_OK) {
                        let result = this._getResult(res.data)
                        // 过滤掉歌手
                        result = result.filter((item) => {
                            return item.type !== TYPE_SINGER
                        })
                        let songs = result.filter((item) => {
                            return item.type !== TYPE_SINGER
                        })
                        processSongsUrl(songs).then(() => {
                            this.result = this.result.concat(result)
                        })
                        this._checkMore(res.data)
                    }
                })
            },
            _checkMore(data) {
                const song = data.song
                if(!song.list.length || (song.curnum + song.curpage * 20) >= song.totalnum) {
                    this.hasMore = false
                }
            },
            _getResult(data) {
                let ret = []
                if(data.zhida && data.zhida.singerid) {
                    ret.push({...data.zhida, ...{type: TYPE_SINGER}})
                }
                if(data.song) {
                    ret = ret.concat(this._nomalizeSongs(data.song.list))
                }

                return ret
            },
            _nomalizeSongs(list) {
                let ret = []
                list.forEach((musicData) => {
                    if(musicData.songid && musicData.albumid) {
                        ret.push(createSong(musicData))
                    }
                })

                return ret
            },
            ...mapMutations({
                setSinger: 'SET_SINGER'
            }),
            ...mapActions(['insertSong'])
        },
        watch: {
            query() {
                this.search()
            }
        }
    }
</script>

<style scoped lang="stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"

    .suggest
        height: 100%
        overflow: hidden
        .suggest-list
            padding: 0 30px
            .suggest-item
                display: flex
                align-items: center
                padding-bottom: 20px
            .icon
                flex: 0 0 30px
                width: 30px
                [class^="icon-"]
                    font-size: 14px
                    color: $color-text-d
            .name
                flex: 1
                font-size: $font-size-medium
                color: $color-text-d
                overflow: hidden
                .text
                    no-wrap()
        .no-result-wrapper
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>
