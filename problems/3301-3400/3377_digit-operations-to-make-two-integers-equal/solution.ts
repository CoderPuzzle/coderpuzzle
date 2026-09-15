function minOperations(n: number, m: number): number {
    // Every value n takes must be non-prime and keeps exactly len(n)
    // digits — decrementing a leading 1 is not a legal op — so the
    // states form a tiny graph: fewer than 1e4 nodes, at most 8
    // single-digit +-1 moves each. Dijkstra with the destination value
    // as the edge weight and the start value as the initial cost sums
    // every value n takes, original included (the example path
    // 10 -> 20 -> 21 -> 22 -> 12 costs 10+20+21+22+12 = 85). Each
    // state contributes its value at most once and weights are < 1e4,
    // so costs stay under 1e8 — exact as a plain JS number.
    const LIMIT = 10000;
    const isComp = new Uint8Array(LIMIT);
    for (let i = 2; i < LIMIT; i++) {
        if (!isComp[i]) {
            for (let j = i * i; j < LIMIT; j += i) isComp[j] = 1;
        }
    }
    const isPrime = (v: number): boolean => v >= 2 && !isComp[v];
    if (isPrime(n) || isPrime(m)) return -1;
    const top = 10 ** (String(n).length - 1);
    const dist: number[] = new Array(LIMIT).fill(-1);
    // min-heap of [cost, value] ordered by cost, then value
    const heap: number[][] = [];
    const less = (a: number[], b: number[]): boolean => a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);
    const push = (item: number[]): void => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (!less(heap[i], heap[p])) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = (): number[] => {
        const topItem = heap[0];
        const last = heap.pop()!;
        if (heap.length) {
            heap[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1,
                    r = l + 1;
                let s = i;
                if (l < heap.length && less(heap[l], heap[s])) s = l;
                if (r < heap.length && less(heap[r], heap[s])) s = r;
                if (s === i) break;
                [heap[s], heap[i]] = [heap[i], heap[s]];
                i = s;
            }
        }
        return topItem;
    };
    const relax = (d: number, y: number): void => {
        if (!isPrime(y) && (dist[y] < 0 || d + y < dist[y])) {
            dist[y] = d + y;
            push([d + y, y]);
        }
    };
    dist[n] = n;
    push([n, n]);
    while (heap.length) {
        const [d, u] = pop();
        if (d > dist[u]) continue;
        if (u === m) return d;
        for (let p = top; p >= 1; p = (p / 10) | 0) {
            const digit = Math.floor(u / p) % 10;
            if (digit < 9) relax(d, u + p);
            if (digit > 0 && !(p === top && digit === 1)) relax(d, u - p);
        }
    }
    return -1;
}
