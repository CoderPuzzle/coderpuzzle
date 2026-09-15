function minMoves(balance: number[]): number {
    const n = balance.length;
    let sum = 0;
    for (const x of balance) sum += x;
    if (sum < 0) return -1;
    if (n === 1) return 0;

    // Minimum flow cost on the path 0..n-2 with the wrap edge fixed at
    // signed flow t: sweep positions keeping the convex suffix-min envelope
    // of the DP as a constant plus rising-flank breakpoints (array min-heap;
    // stored breakpoints, true position = stored + delta).
    const lineCost = (t: number): number => {
        let cost = 0;
        let delta = 0;
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
            const last = heap.pop()!;
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
        for (let k = 0; k < n - 1; k++) {
            delta += balance[k];
            const cap = delta;
            const z = -t;
            if (heap.length > 0) {
                const low = heap[0] + delta;
                if (z <= low) {
                    push(z - delta);
                } else if (z <= cap) {
                    // valley below the current minimum: consume it and split
                    // the flank in two inside the support
                    cost += z - low;
                    pop();
                    push(z - delta);
                    push(z - delta);
                } else {
                    // valley beyond the capped support: lowest breakpoint is
                    // absorbed into the constant
                    cost += z - low;
                    pop();
                }
            } else if (z <= cap) {
                push(z - delta);
            } else {
                cost += z - cap;
            }
        }
        const limit = -balance[n - 1];
        while (heap.length > 0 && heap[0] + delta < limit) {
            cost += limit - (pop() + delta);
        }
        return cost;
    };

    // total cost is |t| plus the inner line cost; convex in t, so binary
    // search the integer minimizer
    const total = (t: number): number => Math.abs(t) + lineCost(t);

    let bound = total(0);
    let lo = -bound,
        hi = bound;
    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        if (total(mid) <= total(mid + 1)) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return total(lo);
}
