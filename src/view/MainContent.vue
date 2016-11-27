<template>
    <div class="main">
        <div
            class="news-list"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="disableScroll"
            infinite-scroll-distance="10"
        >
            <div class="news-item" v-for="item in itemList">
                <p class="item-title">{{item.title}}</p>
                <p class="item-author">{{item.author}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Firebase from 'firebase'
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
                            author: content.by || 'Author Unknown'
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .news-item {
        height: 4rem;
        background-color: blue;
        padding: .5rem .2rem;
        border: .1rem solid red;
    }

    .news-item p {
        margin: 0;
    }
</style>