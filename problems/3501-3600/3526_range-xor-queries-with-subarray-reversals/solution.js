/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
var getResults = function (nums, queries) {
    // implicit treap in an index arena
    const val = [],
        prio = [],
        size = [],
        xr = [],
        rev = [],
        lc = [],
        rc = [];
    let top = 0;
    let seed = 123456789;
    function make(v) {
        seed = (seed * 1103515245 + 12345) % 2147483648;
        const t = top++;
        val[t] = v;
        prio[t] = seed;
        size[t] = 1;
        xr[t] = v;
        rev[t] = false;
        lc[t] = -1;
        rc[t] = -1;
        return t;
    }
    function sz(t) {
        return t < 0 ? 0 : size[t];
    }
    function xxor(t) {
        return t < 0 ? 0 : xr[t];
    }
    function push(t) {
        if (t >= 0 && rev[t]) {
            rev[t] = false;
            const tmp = lc[t];
            lc[t] = rc[t];
            rc[t] = tmp;
            if (lc[t] >= 0) rev[lc[t]] = !rev[lc[t]];
            if (rc[t] >= 0) rev[rc[t]] = !rev[rc[t]];
        }
    }
    function pull(t) {
        if (t >= 0) {
            size[t] = 1 + sz(lc[t]) + sz(rc[t]);
            xr[t] = val[t] ^ xxor(lc[t]) ^ xxor(rc[t]);
        }
    }
    function merge(a, b) {
        if (a < 0) return b;
        if (b < 0) return a;
        push(a);
        push(b);
        if (prio[a] < prio[b]) {
            rc[a] = merge(rc[a], b);
            pull(a);
            return a;
        }
        lc[b] = merge(a, lc[b]);
        pull(b);
        return b;
    }
    // split into (first k nodes, the rest)
    function split(t, k) {
        if (t < 0) return [-1, -1];
        push(t);
        const left = sz(lc[t]);
        if (k <= left) {
            const [a, b] = split(lc[t], k);
            lc[t] = b;
            pull(t);
            return [a, t];
        }
        const [a, b] = split(rc[t], k - left - 1);
        rc[t] = a;
        pull(t);
        return [t, b];
    }

    let root = -1;
    for (const value of nums) root = merge(root, make(value));

    const out = [];
    for (const q of queries) {
        if (q[0] === 1) {
            const [a, b] = split(root, q[1]);
            const [mid, c] = split(b, 1);
            val[mid] = q[2];
            xr[mid] = q[2];
            root = merge(a, merge(mid, c));
        } else if (q[0] === 2) {
            const [a, b] = split(root, q[1]);
            const [mid, c] = split(b, q[2] - q[1] + 1);
            out.push(xxor(mid));
            root = merge(a, merge(mid, c));
        } else {
            const [a, b] = split(root, q[1]);
            const [mid, c] = split(b, q[2] - q[1] + 1);
            rev[mid] = !rev[mid];
            root = merge(a, merge(mid, c));
        }
    }
    return out;
};
