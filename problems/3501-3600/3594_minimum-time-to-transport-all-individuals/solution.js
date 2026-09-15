/**
 * @param {number} n
 * @param {number} k
 * @param {number} m
 * @param {number[]} time
 * @param {number[]} mul
 * @return {number}
 */
var minTime = function (n, k, m, time, mul) {
    // Dijkstra over (people-at-base mask, stage, boat side). Every leg has
    // a positive duration, so the first pop of a state is optimal. Base
    // side: cross any subgroup of size <= k; the stage advances by
    // floor(cross) % m. Destination side: one of the people already across
    // rows back while anyone remains at the base.
    const full = (1 << n) - 1;
    // groups[mask] = subgroups of mask holding 1..k people.
    const groups = Array.from({ length: full + 1 }, () => []);
    for (let mask = 0; mask <= full; ++mask) {
        for (let sub = mask; sub; sub = (sub - 1) & mask) {
            let count = 0;
            for (let i = 0; i < n; ++i) if ((sub >> i) & 1) count++;
            if (count <= k) groups[mask].push(sub);
        }
    }
    // mx[s] = largest time among s's members: it sets the crossing time.
    const mx = new Array(full + 1).fill(0);
    for (let i = 0; i < n; ++i) mx[1 << i] = time[i];
    for (let s = 1; s <= full; ++s) {
        const low = s & -s;
        if (s !== low) mx[s] = Math.max(mx[low], mx[s ^ low]);
    }
    // State key: mask * 10 + stage * 2 + side (mask <= 4095, stage <= 4).
    // Binary min-heap of [dist, key, mask, stage, side] entries.
    const keyOf = (mask, j, side) => mask * 10 + j * 2 + side;
    const heap = [[0, keyOf(full, 0, 0), full, 0, 0]];
    const push = (item) => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const parent = (i - 1) >> 1;
            if (heap[parent][0] <= heap[i][0]) break;
            const tmp = heap[parent];
            heap[parent] = heap[i];
            heap[i] = tmp;
            i = parent;
        }
    };
    const pop = () => {
        const top = heap[0];
        const last = heap.pop();
        if (heap.length) {
            heap[0] = last;
            let i = 0;
            for (;;) {
                let small = i;
                const l = 2 * i + 1;
                const r = 2 * i + 2;
                if (l < heap.length && heap[l][0] < heap[small][0]) small = l;
                if (r < heap.length && heap[r][0] < heap[small][0]) small = r;
                if (small === i) break;
                const tmp = heap[small];
                heap[small] = heap[i];
                heap[i] = tmp;
                i = small;
            }
        }
        return top;
    };
    const dist = new Map();
    let ans = null;
    while (heap.length) {
        const [d, key, mask, j, side] = pop();
        const seen = dist.get(key);
        if (seen !== undefined && seen < d) continue;
        if (side === 0) {
            for (const s of groups[mask]) {
                const cross = mx[s] * mul[j];
                const nd = d + cross;
                const rest = mask ^ s;
                if (rest === 0) {
                    // final crossing: nobody left behind, no return
                    if (ans === null || nd < ans) ans = nd;
                } else {
                    const nj = (j + Math.floor(cross)) % m;
                    const nkey = keyOf(rest, nj, 1);
                    if (nd < (dist.get(nkey) ?? Infinity)) {
                        dist.set(nkey, nd);
                        push([nd, nkey, rest, nj, 1]);
                    }
                }
            }
        } else {
            for (let r = 0; r < n; ++r) {
                if ((mask >> r) & 1) continue;
                const ret = time[r] * mul[j];
                const nj = (j + Math.floor(ret)) % m;
                const nkey = keyOf(mask | (1 << r), nj, 0);
                const nd = d + ret;
                if (nd < (dist.get(nkey) ?? Infinity)) {
                    dist.set(nkey, nd);
                    push([nd, nkey, mask | (1 << r), nj, 0]);
                }
            }
        }
    }
    return ans === null ? -1 : ans;
};
