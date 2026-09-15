function pickGifts(gifts: number[], k: number): number {
    // Live-maximum simulation: each second the richest pile shrinks to
    // floor(sqrt(value)), which only ever lowers it, so an array-backed
    // binary max-heap with iterative sifts replays the process; ties
    // change nothing because any pick order yields the same multiset.
    // Every probed square stays <= ~10^9 and the total <= 10^12 <<
    // 2^53, so plain numbers stay exact throughout.
    const heap: number[] = gifts.slice();
    const floorSqrt = (value: number): number => {
        let r = Math.floor(Math.sqrt(value));
        while (r * r > value) --r;
        while ((r + 1) * (r + 1) <= value) ++r;
        return r;
    };
    const siftDown = (start: number): void => {
        let pos = start;
        while (2 * pos + 1 < heap.length) {
            let child = 2 * pos + 1;
            if (child + 1 < heap.length && heap[child + 1] > heap[child]) ++child;
            if (heap[pos] >= heap[child]) break;
            [heap[pos], heap[child]] = [heap[child], heap[pos]];
            pos = child;
        }
    };
    const siftUp = (): void => {
        let pos = heap.length - 1;
        while (pos > 0) {
            const parent = (pos - 1) >> 1;
            if (heap[parent] >= heap[pos]) break;
            [heap[parent], heap[pos]] = [heap[pos], heap[parent]];
            pos = parent;
        }
    };
    for (let start = (heap.length >> 1) - 1; start >= 0; --start) siftDown(start);
    let total = 0;
    for (let s = 0; s < k; ++s) {
        const value = heap[0];
        const last = heap.pop() as number;
        if (heap.length > 0) {
            heap[0] = last;
            siftDown(0);
        }
        heap.push(floorSqrt(value));
        siftUp();
    }
    for (const v of heap) total += v;
    return total;
}
