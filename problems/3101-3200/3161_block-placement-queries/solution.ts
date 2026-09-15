function getResults(queries: number[][]): boolean[] {
    // d[i] is the free run at start i: the distance from i to the first
    // obstacle strictly after it. A block of size sz can be laid down at
    // start i exactly when d[i] >= sz -- an obstacle may be touched at
    // either end, so only one strictly inside the block forbids it.
    // Placing an obstacle at t rewrites that affine run across the gap it
    // splits, which this lazy assignment segment tree tracks; each type-2
    // query then asks whether the best run among starts [0, x - sz]
    // reaches sz.
    let span = 1;
    for (const q of queries) {
        if (q[0] === 2) {
            span = Math.max(span, q[1]);
        }
    }
    const candSet = new Set<number>();
    for (const q of queries) {
        if (q[0] === 1) {
            candSet.add(q[1]);
        }
    }
    const cands = [...candSet].sort((a, b) => a - b);
    const k = cands.length;
    const fen: number[] = new Array(k + 1).fill(0);

    const fenAdd = function (i: number): void {
        for (; i <= k; i += i & -i) {
            fen[i]++;
        }
    };

    const fenSum = function (i: number): number {
        let total = 0;
        for (; i > 0; i -= i & -i) {
            total += fen[i];
        }
        return total;
    };

    // Smallest rank whose prefix count reaches target.
    const fenKth = function (target: number): number {
        let pos = 0;
        for (let step = 1 << 16; step > 0; step >>= 1) {
            const next = pos + step;
            if (next <= k && fen[next] < target) {
                pos = next;
                target -= fen[next];
            }
        }
        return pos + 1;
    };

    const segMax: number[] = new Array(4 * span).fill(0);
    const segTag: number[] = new Array(4 * span).fill(0); // 0 = untagged; obstacles are >= 1

    const build = function (node: number, lo: number, hi: number): void {
        if (lo === hi) {
            // No obstacle yet: read the run as reaching past span, which
            // stays above any achievable sz without inventing blockage.
            segMax[node] = span - lo;
            return;
        }
        const mid = (lo + hi) >> 1;
        build(2 * node, lo, mid);
        build(2 * node + 1, mid + 1, hi);
        segMax[node] = Math.max(segMax[2 * node], segMax[2 * node + 1]);
    };

    const applyTo = function (node: number, lo: number, t: number): void {
        segTag[node] = t;
        // The run t - i shrinks as i grows, so the gap's best sits left.
        segMax[node] = t - lo;
    };

    const pushDown = function (node: number, lo: number, mid: number): void {
        if (segTag[node] !== 0) {
            applyTo(2 * node, lo, segTag[node]);
            applyTo(2 * node + 1, mid + 1, segTag[node]);
            segTag[node] = 0;
        }
    };

    const update = function (node: number, lo: number, hi: number, l: number, r: number, t: number): void {
        if (r < lo || hi < l) {
            return;
        }
        if (l <= lo && hi <= r) {
            applyTo(node, lo, t);
            return;
        }
        const mid = (lo + hi) >> 1;
        pushDown(node, lo, mid);
        update(2 * node, lo, mid, l, r, t);
        update(2 * node + 1, mid + 1, hi, l, r, t);
        segMax[node] = Math.max(segMax[2 * node], segMax[2 * node + 1]);
    };

    const query = function (node: number, lo: number, hi: number, l: number, r: number): number {
        if (r < lo || hi < l) {
            return 0;
        }
        if (l <= lo && hi <= r) {
            return segMax[node];
        }
        const mid = (lo + hi) >> 1;
        pushDown(node, lo, mid);
        return Math.max(query(2 * node, lo, mid, l, r), query(2 * node + 1, mid + 1, hi, l, r));
    };

    build(1, 0, span - 1);
    const result: boolean[] = [];
    for (const q of queries) {
        if (q[0] === 1) {
            const t = q[1];
            // Binary search the sorted candidates for t's rank (1-based).
            let low = 0;
            let high = cands.length;
            while (low < high) {
                const mid = (low + high) >> 1;
                if (cands[mid] < t) {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            const rank = low + 1;
            const below = fenSum(rank - 1);
            const previous = below > 0 ? cands[fenKth(below) - 1] : -1;
            fenAdd(rank);
            const lo = Math.max(previous, 0);
            const hi = Math.min(t - 1, span - 1);
            // Everything right of t keeps its old nearest obstacle.
            if (lo <= hi) {
                update(1, 0, span - 1, lo, hi, t);
            }
        } else {
            const x = q[1];
            const sz = q[2];
            const startHi = x - sz;
            const best = startHi >= 0 ? query(1, 0, span - 1, 0, startHi) : 0;
            result.push(best >= sz);
        }
    }
    return result;
}
