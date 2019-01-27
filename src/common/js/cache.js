import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LENGTH = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 200

/**
 * @description 将元素插入数组第一个位置
 * @param arr 要插入的目标数组
 * @param val 要插入的元素
 * @param compare 比较函数
 * @param maxLen 数组最大长度
 * @return 返回插入后的数组
 */
function insertArray(arr, val, compare, maxLen) {
    const index = arr.findIndex(compare)
    // 如果在第一个位置，就不用操作
    if(index === 0) {
        return
    }
    // 如果不是第一个位置，就先删除，再插入到第一个位置
    if(index > 0) {
        arr.splice(index, 1)
    }
    arr.unshift(val)
    // 如果大于限制长度，就pop最后一个元素
    if(maxLen && arr.length > maxLen) {
        arr.pop()
    }
}

function deleteFromArray(arr, compare) {
    if(!arr.length) {
        return
    }
    console.log(arr)
    const index = arr.findIndex(compare)

    if(index > -1) {
        arr.splice(index, 1)
    }
}

export function saveSearch(query) {
    let searches = storage.get(SEARCH_KEY, [])
    insertArray(searches, query, (item) => {
        return item === query
    }, SEARCH_MAX_LENGTH)
    storage.set(SEARCH_KEY, searches)

    return searches
}

export function loadSearch() {
    return storage.get(SEARCH_KEY, [])
}

export function deleteSearch(query) {
    let searches = storage.get(SEARCH_KEY, [])

    deleteFromArray(searches, (item) => {
        return item === query
    })

    storage.set(SEARCH_KEY, searches)

    return searches
}

export function clearSearch() {
    storage.remove(SEARCH_KEY)
    return []
}

export function savePlay(song) {
    let songs = storage.get(PLAY_KEY, [])
    insertArray(songs, song, (item) => {
        return item.id === song.id
    }, PLAY_MAX_LENGTH)

    storage.set(PLAY_KEY, songs)
    return songs
}

export function loadPlay() {
    return storage.get(PLAY_KEY, [])
}

export function saveFavorite(song) {
    let songs = storage.get(FAVORITE_KEY, [])
    insertArray(songs, song, (item) => {
        return song.id === item.id
    }, FAVORITE_MAX_LENGTH)
    storage.set(FAVORITE_KEY, songs)

    return songs
}

export function deleteFavorite(song) {
    let songs = storage.get(FAVORITE_KEY, [])
    deleteFromArray(songs, (item) => {
        return song.id === item.id
    })

    storage.set(FAVORITE_KEY, songs)
    return songs
}

export function loadFavorite() {
    return storage.get(FAVORITE_KEY, [])
}
