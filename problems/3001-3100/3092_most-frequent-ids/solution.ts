function mostFrequentIDs(nums: number[], freq: number[]): number[] {
    // Only one ID's count moves per step, so a lazy max-heap of [count, id]
    // snapshots answers "most frequent" without ever hunting down the
    // previous snapshot: push the touched ID's new count, then pop entries
    // whose count no longer matches the live table. A count can reach
    // 10^5 * 10^5 = 10^10, far below 2^53, so Number arithmetic stays exact.
    const counts = new Map<number, number>();
    // Hand-sifted max-heap of [count, id] pairs, ordered by count.
    const siftUp = (heap: number[][], i: number) => {
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p][0] >= heap[i][0]) {
                break;
            }
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const siftDown = (heap: number[][], i: number) => {
        for (;;) {
            const l = 2 * i + 1;
            const r = l + 1;
            let m = i;
            if (l < heap.length && heap[l][0] > heap[m][0]) {
                m = l;
            }
            if (r < heap.length && heap[r][0] > heap[m][0]) {
                m = r;
            }
            if (m === i) {
                break;
            }
            [heap[m], heap[i]] = [heap[i], heap[m]];
            i = m;
        }
    };
    const heap: number[][] = [];
    const answer: number[] = [];
    for (let i = 0; i < nums.length; ++i) {
        const ident = nums[i];
        counts.set(ident, (counts.get(ident) || 0) + freq[i]);
        heap.push([counts.get(ident)!, ident]);
        siftUp(heap, heap.length - 1);
        while (heap[0][0] !== counts.get(heap[0][1])) {
            heap[0] = heap[heap.length - 1];
            heap.pop();
            siftDown(heap, 0);
        }
        answer.push(heap[0][0]);
    }
    return answer;
}
