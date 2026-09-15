/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var modeWeight = function (nums, k) {
    // cnt holds each value's frequency inside the window; bucket counts how
    // many distinct values sit at each frequency, so the top frequency
    // tracks entries and exits in O(1). Heap entries are (-frequency,
    // value) pairs ordered on both coordinates, so the heap top is the
    // smallest value of the top frequency; stale entries (their recorded
    // frequency has since moved) are skimmed off when they reach the top —
    // every revisit of a state pushes a fresh copy, so discarding them
    // early is safe. Weights reach 10^10 and the total stays near 2.5 *
    // 10^14, exact in doubles.
    const cnt = new Map();
    const bucket = new Map();
    const heap = [];
    const less = (a, b) => (a[0] !== b[0] ? a[0] < b[0] : a[1] < b[1]);
    const push = (entry) => {
        heap.push(entry);
        let index = heap.length - 1;
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (less(heap[parent], heap[index])) break;
            [heap[parent], heap[index]] = [heap[index], heap[parent]];
            index = parent;
        }
    };
    const pop = () => {
        const root = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            let index = 0;
            while (true) {
                let smallest = index;
                const left = index * 2 + 1;
                const right = left + 1;
                if (left < heap.length && less(heap[left], heap[smallest])) smallest = left;
                if (right < heap.length && less(heap[right], heap[smallest])) smallest = right;
                if (smallest === index) break;
                [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
                index = smallest;
            }
        }
        return root;
    };
    let topFreq = 0;
    let total = 0;
    for (let right = 0; right < nums.length; right++) {
        // Enter: lift the arriving value one frequency up.
        const entering = (cnt.get(nums[right]) ?? 0) + 1;
        cnt.set(nums[right], entering);
        bucket.set(entering, (bucket.get(entering) ?? 0) + 1);
        if (entering > 1) {
            bucket.set(entering - 1, bucket.get(entering - 1) - 1);
        }
        topFreq = Math.max(topFreq, entering);
        push([-entering, nums[right]]);
        if (right >= k) {
            // Leave: drop the exiting value one frequency down; only a
            // one-step fall of the top frequency is ever possible.
            const leaving = nums[right - k];
            const exiting = cnt.get(leaving) - 1;
            cnt.set(leaving, exiting);
            bucket.set(exiting + 1, bucket.get(exiting + 1) - 1);
            if (exiting > 0) {
                bucket.set(exiting, (bucket.get(exiting) ?? 0) + 1);
                push([-exiting, leaving]);
            }
            if (bucket.get(topFreq) === 0) {
                topFreq--;
            }
        }
        if (right >= k - 1) {
            // Skim stale tops, then score mode * top frequency.
            while (cnt.get(heap[0][1]) !== -heap[0][0]) {
                pop();
            }
            total += heap[0][1] * topFreq;
        }
    }
    return total;
};
