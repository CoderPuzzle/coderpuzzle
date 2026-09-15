class SwapBIT {
    constructor(n) {
        this.n = n;
        this.c = new Int32Array(n + 1);
        this.s = new Float64Array(n + 1);
    }
    add(p, x, y) {
        for (p++; p <= this.n; p += p & -p) {
            this.c[p] += x;
            this.s[p] += y;
        }
    }
    pref(p) {
        let x = 0,
            y = 0;
        for (; p; p -= p & -p) {
            x += this.c[p];
            y += this.s[p];
        }
        return [x, y];
    }
    kth(k) {
        let p = 0,
            z = 1;
        while (z * 2 <= this.n) z *= 2;
        for (; z; z >>= 1)
            if (p + z <= this.n && this.c[p + z] < k) {
                k -= this.c[p + z];
                p += z;
            }
        return p;
    }
    small(k, v) {
        if (!k) return 0;
        const p = this.kth(k),
            [c, s] = this.pref(p);
        return s + (k - c) * v[p];
    }
}
var maxSum = function (a, k) {
    const n = a.length,
        v = [...new Set(a)].sort((x, y) => x - y),
        p = a.map((x) => {
            let l = 0,
                r = v.length - 1;
            while (l < r) {
                const m = (l + r) >> 1;
                if (v[m] < x) l = m + 1;
                else r = m;
            }
            return l;
        });
    let best = -Infinity;
    for (let l = 0; l < n; l++) {
        const inside = new SwapBIT(v.length),
            outside = new SwapBIT(v.length);
        for (let i = 0; i < n; i++) outside.add(p[i], 1, a[i]);
        let sum = 0;
        for (let r = l; r < n; r++) {
            outside.add(p[r], -1, -a[r]);
            inside.add(p[r], 1, a[r]);
            sum += a[r];
            const oc = n - (r - l + 1);
            let lo = 0,
                hi = Math.min(k, r - l + 1, oc);
            while (lo < hi) {
                const t = Math.ceil((lo + hi) / 2);
                if (v[outside.kth(oc - t + 1)] > v[inside.kth(t)]) lo = t;
                else hi = t - 1;
            }
            const gain = outside.small(oc, v) - outside.small(oc - lo, v) - inside.small(lo, v);
            best = Math.max(best, sum + gain);
        }
    }
    return best;
};
