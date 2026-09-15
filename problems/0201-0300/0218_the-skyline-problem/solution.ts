function getSkyline(buildings: number[][]): number[][] {
    // events: [x, kind, key, right]; key = -height for start, +height for end
    const events: number[][] = [];
    for (const [left, right, height] of buildings) {
        events.push([left, 0, -height, right]);
        events.push([right, 1, height, right]);
    }
    // The 4-field comparison encodes the tie-breaking: starts (kind 0)
    // before ends (kind 1) at equal x so adjacent buildings hand off without
    // a dip to ground; taller starts first (-height); shorter ends first so
    // a tall building survives until its own right edge.
    events.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2] || a[3] - b[3]);

    // max-heap of (height, right) with lazy removal
    const heap: number[][] = [[0, Infinity]];
    const push = (item: number[]): void => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p][0] >= heap[i][0]) break;
            const tmp = heap[p];
            heap[p] = heap[i];
            heap[i] = tmp;
            i = p;
        }
    };
    const pop = (): void => {
        const last = heap.pop() as number[];
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1,
                    r = l + 1;
                let m = i;
                if (l < heap.length && heap[l][0] > heap[m][0]) m = l;
                if (r < heap.length && heap[r][0] > heap[m][0]) m = r;
                if (m === i) break;
                const tmp = heap[m];
                heap[m] = heap[i];
                heap[i] = tmp;
                i = m;
            }
        }
    };

    const result: number[][] = [];
    let previousHeight = 0;
    for (const [x, kind, key, right] of events) {
        // Lazy removal: pop top entries whose building has ended; stale
        // entries below the top are harmless until they surface.
        while (heap.length > 0 && heap[0][1] <= x) {
            pop();
        }
        if (kind === 0) {
            push([-key, right]);
        }
        const currentHeight = heap[0][0];
        // Emit a key point only when the contour height actually changes,
        // which also merges consecutive equal-height segments.
        if (currentHeight !== previousHeight) {
            result.push([x, currentHeight]);
            previousHeight = currentHeight;
        }
    }
    return result;
}
