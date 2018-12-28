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
                default: null
            },
            listenScroll: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            // 确保DOM已经渲染
            setTimeout(() => {
                this._initScroll()
            }, 20)
        },
        methods: {
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
            },
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
            }
        },
        watch: {
            data() {
                setTimeout(() => {
                    this.refresh()
                }, 20)
            }
        }
    }
</script>

<style scoped>

</style>
