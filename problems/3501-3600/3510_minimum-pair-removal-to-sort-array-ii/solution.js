/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumPairRemoval = function (nums) {
    // Simulate with a doubly linked list over the original indices and a
    // min-heap of (sum, left, right). A pair is valid only if its left node
    // is still alive and still points at its recorded right neighbour; stale
    // entries are discarded when popped. A "bad count" of adjacent descents
    // tells us when the array is non-decreasing.
    const n = nums.length;
    const val = nums.map((v) => v);
    const prev = new Array(n);
    const nxt = new Array(n);
    for (let i = 0; i < n; i++) {
        prev[i] = i - 1;
        nxt[i] = i + 1;
    }
    nxt[n - 1] = -1;
    const alive = new Array(n).fill(true);
    let bad = 0;
    for (let i = 0; i < n - 1; i++) {
        if (val[i] > val[nxt[i]]) bad++;
    }
    if (bad === 0) return 0;
    // Explicit binary min-heap on (sum, left, right).
    const heap = [];
    const less = (x, y) => x[0] < y[0] || (x[0] === y[0] && x[1] < y[1]);
    const push = (e) => {
        heap.push(e);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (less(heap[p], heap[i])) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = () => {
        const top = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            const m = heap.length;
            for (;;) {
                const l = 2 * i + 1;
                const r = 2 * i + 2;
                let s = i;
                if (l < m && less(heap[l], heap[s])) s = l;
                if (r < m && less(heap[r], heap[s])) s = r;
                if (s === i) break;
                [heap[s], heap[i]] = [heap[i], heap[s]];
                i = s;
            }
        }
        return top;
    };
    for (let i = 0; i < n - 1; i++) {
        push([val[i] + val[i + 1], i, i + 1]);
    }
    let ops = 0;
    while (bad > 0) {
        const top = pop();
        const s = top[0];
        const a = top[1];
        const b = top[2];
        if (!alive[a] || nxt[a] !== b || val[a] + val[b] !== s) continue;
        const pa = prev[a];
        const nb = nxt[b];
        // Folding b into a replaces the three adjacencies (pa,a), (a,b) and
        // (b,nb) with (pa,a) and (a,nb), so adjust bad around them.
        if (pa !== -1 && val[pa] > val[a]) bad--;
        if (val[a] > val[b]) bad--;
        if (nb !== -1 && val[b] > val[nb]) bad--;
        val[a] += val[b];
        alive[b] = false;
        nxt[a] = nb;
        if (nb !== -1) prev[nb] = a;
        if (pa !== -1 && val[pa] > val[a]) bad++;
        if (nb !== -1 && val[a] > val[nb]) bad++;
        ops++;
        if (bad === 0) break;
        if (pa !== -1) push([val[pa] + val[a], pa, a]);
        if (nb !== -1) push([val[a] + val[nb], a, nb]);
    }
    return ops;
};
