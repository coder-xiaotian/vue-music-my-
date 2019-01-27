<template>
    <div class="search-list" v-show="searches.length">
        <transition-group tag="ul" name="list">
            <li @click="selectItem(item)"
                class="search-item"
                v-for="item in searches"
                :key="item"
            >
                <span class="text">{{item}}</span>
                <span class="icon" @click.stop="deleteOne(item)">
                    <i class="icon-delete"></i>
                </span>
            </li>
        </transition-group>
    </div>
</template>

<script>
    export default {
        props: {
            searches: {
                type: Array,
                default: () => [],
                required: true
            }
        },
        methods: {
            selectItem(item) {
                this.$emit('select', item)
            },
            deleteOne(item) {
                this.$emit('delete', item)
            }
        }
    }
</script>

<style scoped lang="stylus">
    @import "~common/stylus/variable"

    .search-list
        .search-item
            display: flex
            align-items: center
            height: 40px
            .text
                flex: 1
                color: $color-text-l
            .icon
                extend-click()
                .icon-delete
                    font-size: $font-size-small
                    color: $color-text-d
            &.list-enter-active, &.list-leave-active
                animation: rightSlide 0.4s

    @keyframes rightSlide
        0%
            transform: translate3d(0, 0, 0)
        25%
            transform: translate3d(-5%, 0, 0)
        100%
            transform: translate3d(100%, 0, 0)
</style>
