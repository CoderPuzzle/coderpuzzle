/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOperations = function (nums, k) {
    const h = nums.slice();
    const n = h.length;
    for (let i = (n >>> 1) - 1; i >= 0; i--) siftDown(h, i, n);

    function siftDown(a, i, size) {
        while (true) {
            let smallest = i;
            const l = 2 * i + 1,
                r = 2 * i + 2;
            if (l < size && a[l] < a[smallest]) smallest = l;
            if (r < size && a[r] < a[smallest]) smallest = r;
            if (smallest === i) break;
            const tmp = a[i];
            a[i] = a[smallest];
            a[smallest] = tmp;
            i = smallest;
        }
    }

    let size = n;
    let operations = 0;
    // Each operation must consume the two smallest values, so the process
    // is fully deterministic once the array sits in a min-heap.
    // Done when the minimum reaches k (then every element has) or fewer
    // than two elements remain.
    while (size >= 2 && h[0] < k) {
        const x = h[0];
        h[0] = h[size - 1];
        size--;
        siftDown(h, 0, size);
        const y = h[0];
        // x and y are the two smallest by heap order, so the merge is min*2+max.
        h[0] = x * 2 + y;
        siftDown(h, 0, size);
        operations++;
    }
    return operations;
};
