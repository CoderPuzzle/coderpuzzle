/**
 * @param {number[][]} items
 * @param {number} k
 * @return {number}
 */
var findMaximumElegance = function (items, k) {
    // sort descending lexicographically (profit, then category)
    items = items.slice().sort((a, b) => b[0] - a[0] || b[1] - a[1]);
    let total = 0;
    const counts = new Map();
    for (let i = 0; i < k; i++) {
        total += items[i][0];
        counts.set(items[i][1], (counts.get(items[i][1]) || 0) + 1);
    }
    let distinct = counts.size;
    let ans = total + distinct * distinct;

    // min-heap of (profit, category) for duplicated categories among top-k;
    // the heap is never pushed to after construction, so a sorted list with
    // a moving pointer reproduces the pop order exactly.
    const heap = [];
    for (let i = 0; i < k; i++) {
        if (counts.get(items[i][1]) > 1) {
            heap.push([items[i][0], items[i][1]]);
        }
    }
    heap.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    let h = 0;

    for (let i = k; i < items.length; i++) {
        const p = items[i][0],
            c = items[i][1];
        if (counts.has(c)) {
            continue;
        }
        while (h < heap.length && counts.get(heap[h][1]) <= 1) {
            h++;
        }
        if (h >= heap.length) {
            break;
        }
        const minP = heap[h][0],
            minC = heap[h][1];
        h++;
        total = total - minP + p;
        counts.set(minC, counts.get(minC) - 1);
        counts.set(c, 1);
        distinct += 1;
        ans = Math.max(ans, total + distinct * distinct);
    }
    return ans;
};
