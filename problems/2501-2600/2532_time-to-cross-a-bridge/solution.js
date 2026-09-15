/**
 * @param {number} n
 * @param {number} k
 * @param {number[][]} time
 * @return {number}
 */
var findCrossingTime = function (n, k, time) {
    // Priority is static per worker: least efficient = larger left+right,
    // ties to the larger index. Encoded as min-key (-eff, -i).
    const lessKey = (a, b) => a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);
    const left = [];
    for (let i = 0; i < k; i++) {
        left.push([-(time[i][0] + time[i][2]), -i]);
    }
    for (let c = (left.length >> 1) - 1; c >= 0; c--) {
        siftDown(left, c, lessKey);
    }
    const right = []; // boxed workers waiting on the right bank
    const pending = []; // [readyTime, join-side 1=right 0=left, i]
    let cur = 0; // instant the bridge becomes free again
    let sent = 0;
    let delivered = 0;
    let ans = 0;
    while (delivered < n) {
        while (pending.length > 0 && pending[0][0] <= cur) {
            const done = pending[0];
            popHeap(pending, byReady);
            const who = [-(time[done[2]][0] + time[done[2]][2]), -done[2]];
            if (done[1] === 1) {
                pushHeap(right, who, lessKey);
            } else {
                pushHeap(left, who, lessKey);
            }
        }
        if (right.length > 0) {
            // A boxed worker on the right bank always has priority.
            const i = -right[0][1];
            popHeap(right, lessKey);
            cur += time[i][2];
            delivered++;
            if (cur > ans) ans = cur; // the box reaches the left bank here
            if (delivered === n) break; // the final put never delays anything
            pushHeap(pending, [cur + time[i][3], 0, i], byReady);
        } else if (left.length > 0 && sent < n) {
            const i = -left[0][1];
            popHeap(left, lessKey);
            cur += time[i][0];
            sent++;
            pushHeap(pending, [cur + time[i][1], 1, i], byReady);
        } else {
            // Nobody can cross yet: jump to the next readiness instant.
            cur = pending[0][0];
        }
    }
    return ans;
};

const byReady = (a, b) => a[0] < b[0];

function pushHeap(arr, item, less) {
    arr.push(item);
    siftUp(arr, arr.length - 1, less);
}

function popHeap(arr, less) {
    const top = arr[0];
    arr[0] = arr[arr.length - 1];
    arr.pop();
    if (arr.length > 0) siftDown(arr, 0, less);
    return top;
}

function siftUp(arr, start, less) {
    let c = start;
    while (c > 0) {
        const p = (c - 1) >> 1;
        if (!less(arr[c], arr[p])) break;
        const t = arr[p];
        arr[p] = arr[c];
        arr[c] = t;
        c = p;
    }
}

function siftDown(arr, start, less) {
    const n = arr.length;
    let p = start;
    for (;;) {
        const l = 2 * p + 1;
        const r = l + 1;
        let s = p;
        if (l < n && less(arr[l], arr[s])) s = l;
        if (r < n && less(arr[r], arr[s])) s = r;
        if (s === p) break;
        const t = arr[p];
        arr[p] = arr[s];
        arr[s] = t;
        p = s;
    }
}
