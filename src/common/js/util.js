// 工具js

// 打乱array
export function shuffle(arr) {
    // 不直接操作arr，而是取他的副本
    let _arr = arr.slice()
    for(let i = 0; i < _arr.length; i++) {
        let j = getRandomInt(0, i)
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
    }

    return _arr
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function debounce(func, delay) {
    let timer

    return function(...args) {
        // 防止多次调用导致函数被执行多次，所以每次调用都检查是否有timer，如果有就清空
        if(timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}
