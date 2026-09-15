function findMaximizedCapital(k: number, w: number, profits: number[], capital: number[]): number {
    const n = profits.length;
    const projects: number[][] = [];
    for (let i = 0; i < n; i++) projects.push([capital[i], profits[i]]);
    projects.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    // max-heap of profits
    const heap: number[] = [];
    const push = (v: number): void => {
        heap.push(v);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p] >= heap[i]) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = (): number => {
        const top = heap[0];
        const last = heap.pop()!;
        if (heap.length) {
            heap[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1,
                    r = l + 1;
                let s = i;
                if (l < heap.length && heap[l] > heap[s]) s = l;
                if (r < heap.length && heap[r] > heap[s]) s = r;
                if (s === i) break;
                [heap[s], heap[i]] = [heap[i], heap[s]];
                i = s;
            }
        }
        return top;
    };
    let index = 0;
    let current = w;
    // Greedy: each round finish the affordable project with the largest
    // profit — finishing only adds capital, so the affordable set never
    // shrinks. At most min(k, n) picks: only n distinct projects exist.
    const limit = Math.min(k, n);
    for (let iter = 0; iter < limit; iter++) {
        // Sweep every newly affordable project into the heap once; a
        // project affordable now stays affordable forever.
        while (index < n && projects[index][0] <= current) {
            push(projects[index][1]);
            index++;
        }
        // Heap empty: capital is too low to start anything left.
        if (heap.length === 0) break;
        current += pop();
    }
    return current;
}
