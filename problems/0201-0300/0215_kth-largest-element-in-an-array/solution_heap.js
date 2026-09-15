/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    // min-heap of the k largest values seen so far; its root is the
    // smallest of them — the current kth largest.
    const heap = [];
    const push = (value) => {
        heap.push(value);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p] <= heap[i]) break;
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
                if (l < heap.length && heap[l] < heap[m]) m = l;
                if (r < heap.length && heap[r] < heap[m]) m = r;
                if (m === i) break;
                [heap[m], heap[i]] = [heap[i], heap[m]];
                i = m;
            }
        }
        return top;
    };
    for (let i = 0; i < k; i++) {
        push(nums[i]);
    }
    for (let i = k; i < nums.length; i++) {
        // Peek first: only values strictly greater than the root earn
        // a pop-and-push, keeping the pass O(n log k).
        if (nums[i] > heap[0]) {
            pop();
            push(nums[i]);
        }
    }
    // When the scan ends the root is the smallest of the top k — the
    // kth largest by rank, duplicates counted.
    return heap[0];
};
