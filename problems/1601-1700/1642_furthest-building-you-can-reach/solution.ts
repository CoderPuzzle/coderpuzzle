function furthestBuilding(heights: number[], bricks: number, ladders: number): number {
    // Min-heap of the climbs covered by ladders
    const heap: number[] = [];
    const push = (v: number): void => {
        heap.push(v);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p] <= heap[i]) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = (): number => {
        const top = heap[0];
        const last = heap.pop() as number;
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1;
                const r = l + 1;
                let m = i;
                if (l < heap.length && heap[l] < heap[m]) m = l;
                if (r < heap.length && heap[r] < heap[m]) m = r;
                if (m === i) break;
                [heap[m], heap[i]] = [heap[i], heap[m]];
                i = m;
            }
        }
        return top;
    };

    for (let i = 0; i < heights.length - 1; i++) {
        const climb = heights[i + 1] - heights[i];
        if (climb <= 0) {
            continue;
        }
        push(climb);
        if (heap.length > ladders) {
            bricks -= pop();
            if (bricks < 0) {
                return i;
            }
        }
    }
    return heights.length - 1;
}
