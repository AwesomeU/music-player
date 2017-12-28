<template>
    <div class="singer">
        <list-view :data="singerList"></list-view>
    </div>
</template>

<script type="text/javascript">
import ListView from 'base/listview/listview'
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
    data () {
        return {
            singerList: []
        }
    },
    components: {
        ListView
    },
    created () {
        this._getSingerList()
    },
    methods: {
        _getSingerList () {
            getSingerList().then((res) => {
                if (res.code === ERR_OK) {
                    this.singerList = this._normallizeSinger(res.data.list)
                    /* console.log(this._normallizeSinger(this.singerList)) */
                }
            })
        },
        _normallizeSinger(list) {
            let map = {
                hot: {
                    title: HOT_NAME,
                    items: []
                }
            }
            list.forEach((item, index) => {
                if (index < HOT_SINGER_LEN) {
                    map.hot.items.push(new Singer({
                        name: item.Fsinger_name,
                        id: item.Fsinger_mid
                    }))
                }
                const key = item.Findex
                if (!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    }
                }
                map[key].items.push(new Singer({
                    name: item.Fsinger_name,
                    id: item.Fsinger_mid
                }))
            })
            console.log(map)
            // 有序列表
            let hot = []
            let ret = []
            for (let key in map) {
                let val = map[key]
                if (val.title.match(/[a-zA-Z]/)) {
                    ret.push(val)
                } else if (val.title === HOT_NAME) {
                    hot.push(val)
                }
            }
            // 排序ret,按字母升序
            ret.sort((a, b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            // console.log(hot.concat(ret))
            return hot.concat(ret)
        }
    }
}
</script>

<style type="stylesheet" scoped lang="stylus">
    .singer{
        position: fixed;
        top: 88px;
        bottom: 0;
        width: 100%;
    }
</style>