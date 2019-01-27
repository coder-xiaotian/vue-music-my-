<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        props: {
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            data: {
                type: Array,
                default: [],
                required: true
            },
            listenScroll: {
                type: Boolean,
                default: false
            },
            pullup: {
                type: Boolean,
                default: false
            },
            beforeScroll: {
                type: Boolean,
                default: false
            },
            refreshDelay: {
                type: Number,
                default: 20
            }
        },
        mounted() {
            // 确保DOM已经渲染
            setTimeout(() => {
                this._initScroll()
            }, 20)
        },
        methods: {
            enable() {
                // 代理调用this.scroll中的enable()方法
                this.scroll && this.scroll.enable()
            },
            disable() {
                // 代理调用this.scroll中的disable()方法
                this.scroll && this.scroll.disable()
            },
            refresh() {
                // 代理调用
                this.scroll && this.scroll.refresh()
            },
            scrollTo() {
                // 调用apply，为了直接传arguments
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
            },
            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            },
            _initScroll() {
                if(!this.$refs.wrapper) {
                    return
                }
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click
                })

                if(this.listenScroll) {
                    // 用me保留scroll实例，因为this.scroll中是只想this.scroll的
                    let me = this
                    this.scroll.on('scroll', (pos) => {
                        me.$emit('scroll', pos)
                    })
                }

                if(this.pullup) {
                    this.scroll.on('scrollEnd', () => {
                        if(this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                            this.$emit('scrollToEnd')
                        }
                    })
                }

                if(this.beforeScroll) {
                    this.scroll.on('beforeScrollStart', () => {
                        this.$emit('beforeScroll')
                    })
                }
            }
        },
        watch: {
            data(newData) {
                setTimeout(() => {
                    this.refresh()
                }, this.refreshDelay)
            }
        }
    }
</script>

<style scoped>

</style>
