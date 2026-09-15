function mincostToHireWorkers(quality: number[], wage: number[], k: number): number {
    const workers: [number, number][] = wage.map((w, i) => [w, quality[i]] as [number, number]);
    workers.sort((a, b) => a[0] / a[1] - b[0] / b[1]);

    // Local max-heap of chosen qualities.
    const heap: number[] = [];
    const push = (q: number): void => {
        heap.push(q);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p] >= heap[i]) {
                break;
            }
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = (): number => {
        const top = heap[0];
        heap[0] = heap[heap.length - 1];
        heap.pop();
        let i = 0;
        while (true) {
            const l = 2 * i + 1;
            const r = 2 * i + 2;
            let m = i;
            if (l < heap.length && heap[l] > heap[m]) {
                m = l;
            }
            if (r < heap.length && heap[r] > heap[m]) {
                m = r;
            }
            if (m === i) {
                break;
            }
            [heap[i], heap[m]] = [heap[m], heap[i]];
            i = m;
        }
        return top;
    };

    let best = Infinity;
    let totalQuality = 0;
    for (const [w, q] of workers) {
        push(q);
        totalQuality += q;
        if (heap.length > k) {
            totalQuality -= pop();
        }
        if (heap.length === k) {
            const cost = totalQuality * (w / q);
            if (cost < best) {
                best = cost;
            }
        }
    }
    return best;
}
