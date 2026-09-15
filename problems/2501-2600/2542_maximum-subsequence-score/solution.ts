function maxScore(nums1: number[], nums2: number[], k: number): number {
    const n = nums1.length;
    const merged: [number, number][] = [];
    for (let i = 0; i < n; i++) merged.push([nums2[i], i]);
    merged.sort((x, y) => y[0] - x[0]);
    const heap: number[] = [];
    const push = (v: number): void => {
        heap.push(v);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p] <= heap[i]) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = (): number => {
        const top = heap[0];
        const last = heap.pop()!;
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
    // merged sweeps pairs in descending nums2 order, so when it reaches a
    // pair, that pair's nums2 is the minimum of any set drawn from pairs seen
    // so far — the sweep enumerates the min provider.
    let total = 0;
    let best = 0;
    for (const [, j] of merged) {
        const a = nums1[j];
        push(a);
        total += a;
        // Min-heap of size k with a running sum holds the k largest nums1
        // seen so far; ejecting the smallest keeps the top-k sum correct.
        if (heap.length > k) {
            total -= pop();
        }
        // With k companions available, total * nums2[j] is the best score
        // under the assumption that nums2[j] is the minimum; take the max
        // over the sweep. Ties in nums2 are safe: the last of them still
        // sees all the others in the heap.
        if (heap.length === k) {
            const b = total * nums2[j];
            if (b > best) best = b;
        }
    }
    return best;
}
