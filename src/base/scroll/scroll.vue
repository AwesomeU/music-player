<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script type="text/javascript">
    import BScroll from 'better-scroll'

    export default{
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
            // scroll是否监听滚动事件
            listenscroll: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            setTimeout(() => {
                this._initScroll()
            }, 20)
        },
        methods: {
            _initScroll() {
                if (!this.$refs.wrapper) {
                    return false
                }
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click
                })
                // 监听scroll的滚动事件
                if (this.listenscroll) {
                    let me = this
                    // 获取当前位置
                    this.scroll.on('scroll', (pos) => {
                        me.$emit('scroll', pos)
                    })
                }
            },
            enable() {
                this.scroll && this.scroll.enable()
            },
            disable() {
                this.scroll && this.scroll.disable()
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            },
            scrollTo() {
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
            },
            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            }
        },
        watch: {
            // 监听data的变化
            data () {
                setTimeout(() => {
                    this.refresh()
                }, 20)
            }
        }
    }
</script>

<style type="stylesheet" scoped lang="stylus">

</style>