/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxKelements = function (nums, k) {
    // Greedy on the live maximum: picking anything other than the largest
    // element both gains less now and leaves that giant intact, so
    // swapping the order never helps. Array-backed binary max-heap with
    // iterative sifts; JS numbers stay exact because every value is
    // <= 10^9 and the score is bounded by k * 10^9 = 10^14 << 2^53.
    const heap = nums.slice();
    const siftDown = (start) => {
        let pos = start;
        while (2 * pos + 1 < heap.length) {
            let child = 2 * pos + 1;
            if (child + 1 < heap.length && heap[child + 1] > heap[child]) ++child;
            if (heap[pos] >= heap[child]) break;
            [heap[pos], heap[child]] = [heap[child], heap[pos]];
            pos = child;
        }
    };
    const siftUp = () => {
        let pos = heap.length - 1;
        while (pos > 0) {
            const parent = (pos - 1) >> 1;
            if (heap[parent] >= heap[pos]) break;
            [heap[parent], heap[pos]] = [heap[pos], heap[parent]];
            pos = parent;
        }
    };
    for (let start = (heap.length >> 1) - 1; start >= 0; --start) siftDown(start);
    let score = 0;
    for (let op = 0; op < k; ++op) {
        const value = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            siftDown(0);
        }
        score += value;
        // ceil(value / 3): integer division means the floor here stays
        // exact — every operand is well under 2^53.
        heap.push(Math.floor((value + 2) / 3));
        siftUp();
    }
    return score;
};
