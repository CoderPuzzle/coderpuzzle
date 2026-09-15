var subtreeInversionSum = function (edges, nums, k) {
    let n = nums.length,
        g = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        g[u].push(v);
        g[v].push(u);
    }
    let par = Array(n).fill(-1),
        ord = [0];
    for (let z = 0; z < ord.length; z++) {
        let u = ord[z];
        for (const v of g[u]) if (v !== par[u]) ((par[v] = u), ord.push(v));
    }
    let w = k + 1,
        hi = 1e18,
        lo = -hi,
        mx = new Float64Array(n * w),
        mn = new Float64Array(n * w);
    mx.fill(lo);
    mn.fill(hi);
    for (let z = n - 1; z >= 0; z--) {
        let u = ord[z],
            a = Array(w).fill(lo),
            b = Array(w).fill(hi),
            sm = -nums[u],
            sn = -nums[u];
        a[k] = b[k] = nums[u];
        for (const v of g[u])
            if (par[v] === u) {
                let o = v * w,
                    am = Math.max(mx[o + k - 1], mx[o + k]),
                    an = Math.min(mn[o + k - 1], mn[o + k]);
                sm -= an;
                sn -= am;
                let x = Array(w).fill(lo),
                    y = Array(w).fill(hi);
                for (let d = 0; d < k; d++) {
                    x[d + 1] = mx[o + d];
                    y[d + 1] = mn[o + d];
                }
                x[k] = Math.max(x[k], mx[o + k]);
                y[k] = Math.min(y[k], mn[o + k]);
                let ax = [...a],
                    ay = [...b],
                    xx = [...x],
                    xy = [...y];
                for (let d = k - 1; d >= 0; d--) {
                    ax[d] = Math.max(ax[d], ax[d + 1]);
                    ay[d] = Math.min(ay[d], ay[d + 1]);
                    xx[d] = Math.max(xx[d], xx[d + 1]);
                    xy[d] = Math.min(xy[d], xy[d + 1]);
                }
                let na = Array(w).fill(lo),
                    nb = Array(w).fill(hi);
                na[k] = a[k] + x[k];
                nb[k] = b[k] + y[k];
                for (let d = 1; d < k; d++) {
                    let t = Math.max(d, k - d);
                    na[d] = Math.max(a[d] + xx[t], x[d] + ax[t]);
                    nb[d] = Math.min(b[d] + xy[t], y[d] + ay[t]);
                }
                a = na;
                b = nb;
            }
        a[0] = sm;
        b[0] = sn;
        let o = u * w;
        for (let d = 0; d < w; d++) {
            mx[o + d] = a[d];
            mn[o + d] = b[d];
        }
    }
    let ans = lo;
    for (let d = 0; d < w; d++) ans = Math.max(ans, mx[d]);
    return ans;
};
