/**
 * @param {number[]} costs
 * @param {number} k
 * @param {number} candidates
 * @return {number}
 */
var totalCost = function (costs, k, candidates) {
    const n = costs.length;
    // Min-heap of [cost, idx] pairs, ordered lexicographically.
    const heap = () => ({ a: [] });
    const less = (x, y) => (x[0] !== y[0] ? x[0] < y[0] : x[1] < y[1]);
    const push = (h, v) => {
        h.a.push(v);
        let i = h.a.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (less(h.a[i], h.a[p])) {
                const t = h.a[i];
                h.a[i] = h.a[p];
                h.a[p] = t;
                i = p;
            } else break;
        }
    };
    const pop = (h) => {
        const top = h.a[0];
        const last = h.a.pop();
        if (h.a.length > 0) {
            h.a[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1,
                    r = 2 * i + 2;
                let m = i;
                if (l < h.a.length && less(h.a[l], h.a[m])) m = l;
                if (r < h.a.length && less(h.a[r], h.a[m])) m = r;
                if (m === i) break;
                const t = h.a[i];
                h.a[i] = h.a[m];
                h.a[m] = t;
                i = m;
            }
        }
        return top;
    };
    const peek = (h) => h.a[0];

    // Windows overlap => every remaining worker is always eligible, so the
    // greedy is just "hire the k cheapest overall".
    if (2 * candidates >= n) {
        const sorted = costs.slice().sort((a, b) => a - b);
        let total = 0;
        for (let i = 0; i < k; i++) total += sorted[i];
        return total;
    }
    // left = front window, right = back window; less() breaks cost ties
    // by the smaller index.
    const left = heap(),
        right = heap();
    for (let i = 0; i < candidates; i++) push(left, [costs[i], i]);
    for (let i = n - candidates; i < n; i++) push(right, [costs[i], i]);
    // i feeds left and j feeds right from the untouched middle; i <= j
    // guards against inserting a middle worker twice.
    let i = candidates,
        j = n - candidates - 1;
    let total = 0;
    for (let t = 0; t < k; t++) {
        // Cheaper top wins; !less(right, left) also prefers left on ties.
        if (right.a.length === 0 || (left.a.length > 0 && !less(peek(right), peek(left)))) {
            const cost = pop(left)[0];
            if (i <= j) {
                push(left, [costs[i], i]);
                i++;
            }
            total += cost;
        } else {
            const cost = pop(right)[0];
            if (i <= j) {
                push(right, [costs[j], j]);
                j--;
            }
            total += cost;
        }
    }
    return total;
};
