/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var kSum = function (nums, k) {
    // every subsequence sum = base - (subset sum of absolute values)
    let base = 0;
    for (const x of nums) {
        if (x > 0) base += x;
    }
    const costs = nums.map((x) => Math.abs(x));
    costs.sort((a, b) => a - b);
    if (k === 1) return base;
    const n = costs.length;

    // min-heap of (sum, idx)
    const heap = [];
    const push = (sum, idx) => {
        heap.push([sum, idx]);
        let c = heap.length - 1;
        while (c > 0) {
            const p = (c - 1) >> 1;
            if (heap[p][0] <= heap[c][0]) break;
            [heap[p], heap[c]] = [heap[c], heap[p]];
            c = p;
        }
    };
    const pop = () => {
        const top = heap[0];
        const last = heap.pop();
        if (heap.length) {
            heap[0] = last;
            let c = 0;
            for (;;) {
                const l = 2 * c + 1;
                const r = l + 1;
                let m = c;
                if (l < heap.length && heap[l][0] < heap[m][0]) m = l;
                if (r < heap.length && heap[r][0] < heap[m][0]) m = r;
                if (m === c) break;
                [heap[m], heap[c]] = [heap[c], heap[m]];
                c = m;
            }
        }
        return top;
    };

    push(costs[0], 0);
    let count = 1; // empty subset (sum 0) is the 1st smallest
    while (count < k) {
        const [cur, idx] = pop();
        count++;
        if (count === k) return base - cur;
        if (idx + 1 < n) {
            push(cur - costs[idx] + costs[idx + 1], idx + 1);
            push(cur + costs[idx + 1], idx + 1);
        }
    }
    return base;
};
