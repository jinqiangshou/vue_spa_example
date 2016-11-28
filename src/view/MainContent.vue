<template>
    <div class="main">
        <div
            class="news-list"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="disableScroll"
            infinite-scroll-distance="1"
        >
            <transition-group name="newsitem" tag="div">
                <div
                    v-for="(item, index) in itemList"
                    v-bind:key="index"
                    class="news-item"
                >
                    <p class="item-title">
                        <template v-if="item.url.length > 0">
                            <a :href="item.url" target="_blank">{{item.title}}</a>
                        </template>
                        <template v-else>
                            {{item.title}}
                        </template>
                    </p>
                    <p class="item-bottomline">
                        by
                        <span class="item-author">{{item.author}}</span>
                        with score:
                        <span class="item-score">{{item.score}}</span>
                    </p>
                </div>
            </transition-group>
        </div>
        <loading-icon v-show="loadingCount>0 || idList.length===0"></loading-icon>
    </div>
</template>

<script>
    import Firebase from 'firebase'
    import LoadingIcon from 'components/common/LoadingIcon1'

    let infiniteScroll = require('vue-infinite-scroll')

    const fb = Firebase.initializeApp({
        databaseURL: 'https://hacker-news.firebaseio.com/'
    }).database().ref('v0')

    export default {
        name: 'main-content',
        data () {
            return {
                idList: [],
                currentLastId: 0,
                itemList: [],
                loadingCount: 0
            }
        },
        computed () {
            return {
                disableScroll () {
                    return this.loadingCount > 0
                }
            }
        },
        directives: {
            infiniteScroll
        },
        components: {
            LoadingIcon
        },
        created () {
            let self = this
            fb.child('topstories').on('value', function (val) {
                let list = val.val()
                if (typeof list !== 'object' || !list.length) {
                    return
                }
                self.idList = list
            })
        },
        methods: {
            loadMore () {
                if (this.loadingCount > 0) {
                    return
                }
                if (this.idList.length <= 0) {
                    setTimeout(this.loadMore, 500)
                    return
                }
                if (this.currentLastId >= this.idList.length) {
                    console.log('no more content')
                    return
                }
                for (let index = this.currentLastId;
                    index < this.currentLastId + 10 && index < this.idList.length;
                    index++) {
                    let currentId = this.idList[index]
                    let itemRef = fb.child('item').child(currentId)
                    this.loadData(itemRef)
                    this.loadingCount++
                }
                this.currentLastId = Math.min(this.currentLastId + 10, this.idList.length)
            },
            loadData (itemRef) {
                let self = this
                itemRef.on('value', function (val) {
                    self.loadingCount--
                    let content = val.val()
                    if (content.type && content.type === 'story') {
                        self.itemList.push({
                            title: content.title || 'Title Unknown',
                            author: content.by || 'Author Unknown',
                            score: content.score || 'Score Unknown',
                            url: content.url || ''
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
    a {
        color: #FFF;
    }
    a:hover {
        color: #DDD;
    }
    .main {
        margin-top: 2.3rem;
    }
    .news-item {
        display: block;
        height: auto;
        background-color: #1ABC9C;
        padding: .5rem .2rem;
        border-radius: .2rem;
        margin: .2rem;
        transition: all 1s;
    }

    .news-item p {
        margin: 0;
        color: #FFF;
    }

    .news-item p.item-title {
        font-size: .65rem;
    }
    .news-item p.item-bottomline {
        font-size: .41rem;
        margin-top: .3rem;
        text-align: right;
    }
    .item-author {
        font-style: italic;
    }

    .newsitem-enter {
        opacity: 0;
        transform: translateY(30px);
    }
</style>