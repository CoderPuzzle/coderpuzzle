function topKFrequent(nums: number[], k: number): number[] {
    // One counting pass over the array.
    const counts = new Map<number, number>();
    for (const x of nums) {
        counts.set(x, (counts.get(x) || 0) + 1);
    }
    // min-heap of [value, count] whose root is the weakest keeper:
    // smallest count, and among equal counts the largest value —
    // eviction order mirrors the final ranking.
    const less = (a: [number, number], b: [number, number]): boolean => (a[1] !== b[1] ? a[1] < b[1] : a[0] > b[0]);
    const heap: [number, number][] = [];
    const push = (item: [number, number]): void => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (!less(heap[i], heap[p])) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = (): [number, number] => {
        const top = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1,
                    r = 2 * i + 2;
                let m = i;
                if (l < heap.length && less(heap[l], heap[m])) m = l;
                if (r < heap.length && less(heap[r], heap[m])) m = r;
                if (m === i) break;
                [heap[m], heap[i]] = [heap[i], heap[m]];
                i = m;
            }
        }
        return top;
    };
    for (const [value, count] of counts) {
        const item: [number, number] = [value, count];
        if (heap.length < k) {
            push(item);
            continue;
        }
        const root = heap[0];
        // Replace the root only when the newcomer outranks it: higher
        // count, or equal count and smaller value.
        if (count > root[1] || (count === root[1] && value < root[0])) {
            pop();
            push(item);
        }
    }
    // Survivors are exactly the top k by (higher count, then smaller
    // value); emit them in that order.
    heap.sort((a, b) => (a[1] !== b[1] ? b[1] - a[1] : a[0] - b[0]));
    return heap.slice(0, k).map(([value]) => value);
}
