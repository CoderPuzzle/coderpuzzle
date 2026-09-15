/**
 * @param {number} n
 * @param {number[][]} logs
 * @param {number} x
 * @param {number[]} queries
 * @return {number[]}
 */
var countServers = function (n, logs, x, queries) {
    // In the time-sorted logs each query's hits form a contiguous run
    // (times in [q - x, q]). Answering queries in increasing order lets
    // one window serve them all; sorting indices keeps answers in place.
    logs.sort((a, b) => a[1] - b[1]);
    const order = queries.map((_, i) => i).sort((a, b) => queries[a] - queries[b]);
    const cnt = new Array(n + 1).fill(0);
    const arr = new Array(queries.length).fill(0);
    let distinct = 0;
    let lo = 0;
    let hi = 0;
    for (const i of order) {
        const top = queries[i];
        const bottom = top - x;
        // <= admits a log at exactly q; strict < keeps q - x inside,
        // so both interval edges stay inclusive.
        while (hi < logs.length && logs[hi][1] <= top) {
            if (++cnt[logs[hi][0]] === 1) distinct++;
            hi++;
        }
        while (lo < hi && logs[lo][1] < bottom) {
            if (--cnt[logs[lo][0]] === 0) distinct--;
            lo++;
        }
        arr[i] = n - distinct;
    }
    return arr;
};
