function minInterval(intervals: number[][], queries: number[]): number[] {
    const sorted = [...intervals].sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));
    // Sweep queries in ascending order so each interval's life is a contiguous
    // stretch of the sweep: live from its left end, dead past its right end.
    const order = queries.map((_, j) => j).sort((a, b) => queries[a] - queries[b]);
    // Min-heap of [size, right] pairs.
    const heap: [number, number][] = [];
    const less = (a: [number, number], b: [number, number]) => (a[0] !== b[0] ? a[0] < b[0] : a[1] < b[1]);
    const push = (item: [number, number]) => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (less(heap[i], heap[p])) {
                [heap[i], heap[p]] = [heap[p], heap[i]];
                i = p;
            } else {
                break;
            }
        }
    };
    const pop = (): [number, number] => {
        const top = heap[0];
        const last = heap.pop()!;
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            while (true) {
                const l = 2 * i + 1,
                    r = 2 * i + 2;
                let m = i;
                if (l < heap.length && less(heap[l], heap[m])) m = l;
                if (r < heap.length && less(heap[r], heap[m])) m = r;
                if (m === i) break;
                [heap[i], heap[m]] = [heap[m], heap[i]];
                i = m;
            }
        }
        return top;
    };
    const answers: number[] = new Array(queries.length);
    let i = 0;
    const n = sorted.length;
    for (const j of order) {
        const q = queries[j];
        // Intervals whose left end has been reached are now live (size, right).
        while (i < n && sorted[i][0] <= q) {
            push([sorted[i][1] - sorted[i][0] + 1, sorted[i][1]]);
            i += 1;
        }
        // Lazy deletion: the top dies past its right end, and since queries only
        // grow it fails every later query too — discarding it is permanent.
        while (heap.length > 0 && heap[0][1] < q) {
            pop();
        }
        // Surviving top = smallest interval containing q.
        answers[j] = heap.length > 0 ? heap[0][0] : -1;
    }
    return answers;
}
