/**
 * @param {number[]} servers
 * @param {number[]} tasks
 * @return {number[]}
 */
var assignTasks = function (servers, tasks) {
    // Two binary heaps: free keyed by (weight, index), busy keyed by
    // release time. Drain finished servers, wait for the earliest if
    // needed, then hand the task to the smallest free server. Values
    // stay far below 2^53, so plain numbers are exact.
    const lessFree = function (a, b) {
        return a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);
    };
    const free = [];
    for (let i = 0; i < servers.length; i++) {
        free.push([servers[i], i]);
    }
    for (let c = (free.length >> 1) - 1; c >= 0; c--) {
        siftDown(free, c, lessFree);
    }
    const busy = [];
    const ans = new Array(tasks.length);
    let cur = 0;
    for (let j = 0; j < tasks.length; j++) {
        cur = Math.max(cur, j);
        while (busy.length > 0 && busy[0][0] <= cur) {
            const done = busy[0];
            busy[0] = busy[busy.length - 1];
            busy.pop();
            if (busy.length > 0) {
                siftDown(busy, 0, byRelease);
            }
            free.push([done[1], done[2]]);
            siftUp(free, free.length - 1, lessFree);
        }
        if (free.length === 0) {
            cur = busy[0][0];
            while (busy.length > 0 && busy[0][0] <= cur) {
                const done = busy[0];
                busy[0] = busy[busy.length - 1];
                busy.pop();
                if (busy.length > 0) {
                    siftDown(busy, 0, byRelease);
                }
                free.push([done[1], done[2]]);
                siftUp(free, free.length - 1, lessFree);
            }
        }
        const pick = free[0];
        free[0] = free[free.length - 1];
        free.pop();
        if (free.length > 0) {
            siftDown(free, 0, lessFree);
        }
        busy.push([cur + tasks[j], pick[0], pick[1]]);
        siftUp(busy, busy.length - 1, byRelease);
        ans[j] = pick[1];
    }
    return ans;
};

const byRelease = function (a, b) {
    return a[0] < b[0];
};

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
