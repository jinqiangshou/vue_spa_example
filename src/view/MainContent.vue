<template>
    <div class="main">
        <div class="news-list">
            <div class="news-item" v-for="item in itemList">
                <p class="item-title">{{item.title}}</p>
                <p class="item-author">{{item.author}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Firebase from 'firebase'

    const fb = Firebase.initializeApp({
        databaseURL: 'https://hacker-news.firebaseio.com/'
    }).database().ref('v0')

    export default {
        name: 'main-content',
        data () {
            return {
                idList: [],
                currentLastId: 0,
                itemList: []
            }
        },
        created () {
            let self = this
            fb.child('topstories').on('value', function (val) {
                let list = val.val()
                if (typeof list !== 'object' || !list.length) {
                    return
                }
                self.idList = list
                self.currentLastId = 10
                for (let index = 0; index < 10 && index < self.idList.length; index++) {
                    let currentId = self.idList[index]
                    let itemRef = fb.child('item').child(currentId)
                    itemRef.on('value', function (val) {
                        let content = val.val()
                        if (content.type && content.type === 'story') {
                            self.itemList.push({
                                title: content.title || 'Title Unknown',
                                author: content.by || 'Author Unknown'
                            })
                        }
                    })
                }
            })
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