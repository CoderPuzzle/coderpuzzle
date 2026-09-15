function connectSticks(sticks: number[]): number {
    if (sticks.length <= 1) return 0;
    const heap: number[] = sticks.slice();
    const siftDown = (i: number, size: number): void => {
        while (true) {
            let smallest = i;
            const l = 2 * i + 1;
            const r = 2 * i + 2;
            if (l < size && heap[l] < heap[smallest]) smallest = l;
            if (r < size && heap[r] < heap[smallest]) smallest = r;
            if (smallest === i) break;
            [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
            i = smallest;
        }
    };
    const size = heap.length;
    for (let i = Math.floor(size / 2) - 1; i >= 0; i--) siftDown(i, size);
    const pop = (): number => {
        const top = heap[0];
        heap[0] = heap[heap.length - 1];
        heap.pop();
        siftDown(0, heap.length);
        return top;
    };
    const push = (v: number): void => {
        heap.push(v);
        let i = heap.length - 1;
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (heap[p] <= heap[i]) break;
            [heap[i], heap[p]] = [heap[p], heap[i]];
            i = p;
        }
    };
    let total = 0;
    // Huffman-style exchange argument: a length is paid once per merge
    // above it, so always merging the two shortest is optimal
    while (heap.length > 1) {
        const combined = pop() + pop();
        total += combined;
        // the combined stick re-enters the pool for later merges
        push(combined);
    }
    return total;
}
