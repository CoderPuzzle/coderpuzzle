function leastInterval(tasks: string[], n: number): number {
    const counts = new Map<string, number>();
    for (const t of tasks) {
        counts.set(t, (counts.get(t) || 0) + 1);
    }
    // Max-heap of remaining counts for labels free to run right now; only the
    // counts matter, because the cooldown rule treats every label alike.
    const heap: number[] = [];
    const push = (v: number): void => {
        heap.push(v);
        let c = heap.length - 1;
        while (c > 0) {
            const p = (c - 1) >> 1;
            if (heap[p] >= heap[c]) {
                break;
            }
            [heap[p], heap[c]] = [heap[c], heap[p]];
            c = p;
        }
    };
    const pop = (): number => {
        const top = heap[0];
        const last = heap.pop() as number;
        if (heap.length > 0) {
            heap[0] = last;
            let c = 0;
            for (;;) {
                const l = 2 * c + 1;
                const r = l + 1;
                let s = c;
                if (l < heap.length && heap[l] > heap[s]) {
                    s = l;
                }
                if (r < heap.length && heap[r] > heap[s]) {
                    s = r;
                }
                if (s === c) {
                    break;
                }
                [heap[c], heap[s]] = [heap[s], heap[c]];
                c = s;
            }
        }
        return top;
    };
    for (const v of counts.values()) {
        push(v);
    }
    // FIFO of runs still cooling: [slot when the label may run again,
    // remaining count]. Free slots arrive in order, so the front pops.
    const cooling: number[][] = [];
    let time = 0;
    while (heap.length > 0 || cooling.length > 0) {
        // Release everything whose cooldown has expired by now.
        while (cooling.length > 0 && cooling[0][0] <= time) {
            push(cooling.shift()![1]);
        }
        if (heap.length === 0) {
            // Nothing can run: jump the clock straight to the next release
            // instead of counting idle slots one by one.
            time = cooling[0][0];
            continue;
        }
        // Run one job of the largest remaining count.
        const top = pop();
        if (top > 1) {
            cooling.push([time + n + 1, top - 1]);
        }
        time++;
    }
    return time;
}
