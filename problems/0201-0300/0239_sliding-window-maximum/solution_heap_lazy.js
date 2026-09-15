/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
    // max-heap of [value, index] records
    const heap = [];
    const push = (item) => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p][0] >= heap[i][0]) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = () => {
        const top = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1,
                    r = 2 * i + 2;
                let m = i;
                if (l < heap.length && heap[l][0] > heap[m][0]) m = l;
                if (r < heap.length && heap[r][0] > heap[m][0]) m = r;
                if (m === i) break;
                [heap[m], heap[i]] = [heap[i], heap[m]];
                i = m;
            }
        }
        return top;
    };

    const result = [];
    for (let i = 0; i < nums.length; i++) {
        push([nums[i], i]);
        // Lazy deletion: pop records whose index has slid out of the window.
        while (heap[0][1] <= i - k) pop();
        // The top is now the largest value still inside the window.
        if (i >= k - 1) result.push(heap[0][0]);
    }
    return result;
};
