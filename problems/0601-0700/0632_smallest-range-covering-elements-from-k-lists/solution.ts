function smallestRange(nums: number[][]): number[] {
    // min-heap of nodes: [value, listIndex, elemIndex]
    const heap: number[][] = [];
    const cmp = (a: number[], b: number[]): number => a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
    const push = (node: number[]): void => {
        heap.push(node);
        let c = heap.length - 1;
        while (c > 0) {
            const p = (c - 1) >> 1;
            if (cmp(heap[c], heap[p]) < 0) {
                const t = heap[c];
                heap[c] = heap[p];
                heap[p] = t;
                c = p;
            } else break;
        }
    };
    const pop = (): number[] => {
        const top = heap[0];
        const last = heap.pop() as number[];
        if (heap.length > 0) {
            heap[0] = last;
            let p = 0;
            const n = heap.length;
            for (;;) {
                let smallest = p;
                const l = 2 * p + 1,
                    r = 2 * p + 2;
                if (l < n && cmp(heap[l], heap[smallest]) < 0) smallest = l;
                if (r < n && cmp(heap[r], heap[smallest]) < 0) smallest = r;
                if (smallest === p) break;
                const t = heap[p];
                heap[p] = heap[smallest];
                heap[smallest] = t;
                p = smallest;
            }
        }
        return top;
    };

    // Seed the heap with every list's head; the k-way merge sweeps candidate
    // ranges in order as the selection's minimum advances.
    let curMax = -Infinity;
    for (let i = 0; i < nums.length; i++) {
        push([nums[i][0], i, 0]);
        if (nums[i][0] > curMax) curMax = nums[i][0];
    }
    let bestLo = -Infinity,
        bestHi = Infinity;
    while (true) {
        const top = pop();
        const lo = top[0],
            i = top[1],
            j = top[2];
        // [lo, curMax] covers all k lists: prefer smaller width, then
        // the smaller left endpoint on ties.
        if (curMax - lo < bestHi - bestLo || (curMax - lo === bestHi - bestLo && lo < bestLo)) {
            bestLo = lo;
            bestHi = curMax;
        }
        if (j + 1 === nums[i].length) {
            // The popped list is exhausted: no later selection can still
            // include it, so every further candidate would be worse.
            return [bestLo, bestHi];
        }
        const nxt = nums[i][j + 1];
        // The next element may raise the tracked maximum.
        if (nxt > curMax) curMax = nxt;
        push([nxt, i, j + 1]);
    }
}
