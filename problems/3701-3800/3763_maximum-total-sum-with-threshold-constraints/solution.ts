function maxSum(nums: number[], threshold: number[]): number {
    // An element unlocks when step reaches its threshold and stays usable
    // forever after. Bucket indices by unlock step; everything at
    // threshold 1 starts in the max-heap of usable values. Totals reach
    // 10^14 — exact in doubles.
    const n = nums.length;
    const waiting: number[][] = Array.from({ length: n + 1 }, () => []);
    const live: [number, number][] = [];
    for (let i = 0; i < n; i++) {
        if (threshold[i] <= 1) {
            live.push([-nums[i], i]);
        } else {
            waiting[threshold[i]].push(i);
        }
    }
    const less = (a: [number, number], b: [number, number]) => (a[0] !== b[0] ? a[0] < b[0] : a[1] < b[1]);
    let size = live.length;
    const siftDown = () => {
        let index = 0;
        while (true) {
            let smallest = index;
            const left = index * 2 + 1;
            const right = left + 1;
            if (left < size && less(live[left], live[smallest])) smallest = left;
            if (right < size && less(live[right], live[smallest])) smallest = right;
            if (smallest === index) break;
            [live[index], live[smallest]] = [live[smallest], live[index]];
            index = smallest;
        }
    };
    const push = (entry: [number, number]) => {
        live[size++] = entry;
        let index = size - 1;
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (less(live[parent], live[index])) break;
            [live[parent], live[index]] = [live[index], live[parent]];
            index = parent;
        }
    };
    let total = 0;
    let step = 1;
    while (true) {
        // Fold in this step's unlocks, then stop if nothing is usable.
        if (step <= n) {
            for (const i of waiting[step]) {
                push([-nums[i], i]);
            }
        }
        if (size === 0) break;
        total += -live[0][0];
        live[0] = live[--size];
        live.length = size;
        siftDown();
        step++;
    }
    return total;
}
