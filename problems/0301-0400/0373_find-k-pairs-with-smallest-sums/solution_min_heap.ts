function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
    if (nums1.length === 0 || nums2.length === 0 || k <= 0) return [];
    // min-heap of [sum, i, j] ordered lexicographically
    const heap: number[][] = [];
    const less = (a: number[], b: number[]): boolean => {
        if (a[0] !== b[0]) return a[0] < b[0];
        if (a[1] !== b[1]) return a[1] < b[1];
        return a[2] < b[2];
    };
    const swap = (i: number, j: number): void => {
        const t = heap[i];
        heap[i] = heap[j];
        heap[j] = t;
    };
    const up = (i: number): void => {
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (less(heap[i], heap[p])) {
                swap(i, p);
                i = p;
            } else break;
        }
    };
    const down = (i: number): void => {
        const n = heap.length;
        while (true) {
            const l = 2 * i + 1,
                r = 2 * i + 2;
            let m = i;
            if (l < n && less(heap[l], heap[m])) m = l;
            if (r < n && less(heap[r], heap[m])) m = r;
            if (m === i) break;
            swap(i, m);
            i = m;
        }
    };
    const push = (item: number[]): void => {
        heap.push(item);
        up(heap.length - 1);
    };
    const pop = (): number[] => {
        const top = heap[0];
        const last = heap.pop() as number[];
        if (heap.length > 0) {
            heap[0] = last;
            down(0);
        }
        return top;
    };
    // Seed each active row's minimum (nums1[i], nums2[0]); rows past
    // min(len(nums1), k) can never reach the k smallest.
    const limit = Math.min(nums1.length, k);
    for (let i = 0; i < limit; i++) push([nums1[i] + nums2[0], i, 0]);
    const result: number[][] = [];
    while (heap.length > 0 && result.length < k) {
        const top = pop();
        const i = top[1],
            j = top[2];
        // The popped pair's only unexplored successor in its row is
        // (i, j+1); pushing it keeps the heap holding the minimum of
        // every active row, so each pop yields the global minimum left.
        result.push([nums1[i], nums2[j]]);
        if (j + 1 < nums2.length) push([nums1[i] + nums2[j + 1], i, j + 1]);
    }
    return result;
}
