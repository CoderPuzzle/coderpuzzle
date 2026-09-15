/**
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
var canReach = function (arr, start) {
    // BFS over indexes: from i, the only successors are i +/- arr[i]. Each
    // index is visited once, so cycles cannot loop forever and a chain of
    // 5*10^4 indexes never touches the recursion stack.
    const n = arr.length;
    const visited = new Array(n).fill(false);
    const queue = [start];
    visited[start] = true;
    for (let head = 0; head < queue.length; ++head) {
        const i = queue[head];
        if (arr[i] === 0) return true;
        for (const nxt of [i + arr[i], i - arr[i]]) {
            if (nxt >= 0 && nxt < n && !visited[nxt]) {
                visited[nxt] = true;
                queue.push(nxt);
            }
        }
    }
    return false;
};
