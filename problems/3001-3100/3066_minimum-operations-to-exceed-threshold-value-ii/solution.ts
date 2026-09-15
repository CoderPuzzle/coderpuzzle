function minOperations(nums: number[], k: number): number {
    const h = nums.slice();
    const n = h.length;

    function siftDown(i: number, size: number): void {
        while (true) {
            let smallest = i;
            const l = 2 * i + 1,
                r = 2 * i + 2;
            if (l < size && h[l] < h[smallest]) smallest = l;
            if (r < size && h[r] < h[smallest]) smallest = r;
            if (smallest === i) break;
            const tmp = h[i];
            h[i] = h[smallest];
            h[smallest] = tmp;
            i = smallest;
        }
    }

    for (let i = (n >>> 1) - 1; i >= 0; i--) siftDown(i, n);

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
        siftDown(0, size);
        const y = h[0];
        // x and y are the two smallest by heap order, so the merge is min*2+max.
        h[0] = x * 2 + y;
        siftDown(0, size);
        operations++;
    }
    return operations;
}
