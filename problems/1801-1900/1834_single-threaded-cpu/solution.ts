function getOrder(tasks: number[][]): number[] {
    const n = tasks.length;
    const byEnqueue: number[] = [];
    for (let i = 0; i < n; i++) byEnqueue.push(i);
    // Indices pre-sorted by (enqueueTime, index): the arrival stream only moves forward.
    byEnqueue.sort((a, b) => (tasks[a][0] !== tasks[b][0] ? tasks[a][0] - tasks[b][0] : a - b));
    // Min-heap of [processingTime, index] pairs.
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
    const order: number[] = [];
    let time = 0;
    let i = 0;
    while (i < n || heap.length > 0) {
        if (heap.length === 0) {
            // CPU idle: jump straight to the next arrival instead of ticking.
            time = Math.max(time, tasks[byEnqueue[i]][0]);
        }
        // Enqueue everything available at this instant BEFORE popping, so all
        // contenders compete under the same (processingTime, index) order.
        while (i < n && tasks[byEnqueue[i]][0] <= time) {
            const j = byEnqueue[i];
            push([tasks[j][1], j]);
            i += 1;
        }
        const [proc, j] = pop(); // winner: shortest processing time, smallest index on ties
        order.push(j);
        time += proc; // clock advances by exactly the winner's duration
    }
    return order;
}
