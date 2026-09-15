// @ts-nocheck
var minOperations = function (a, k) {
    function costs(p) {
        let c = Array(k).fill(0);
        for (let i = p; i < a.length; i += 2) c[a[i] % k]++;
        let t = [...c, ...c, ...c],
            pc = [0],
            ps = [0];
        for (let i = 0; i < t.length; i++) {
            pc.push(pc[i] + t[i]);
            ps.push(ps[i] + t[i] * i);
        }
        let out = Array(k),
            h = Math.floor(k / 2);
        for (let x = 0; x < k; x++) {
            let m = x + k,
                l = m - h,
                r = m + k - 1 - h,
                lc = pc[m + 1] - pc[l],
                ls = ps[m + 1] - ps[l],
                rc = pc[r + 1] - pc[m + 1],
                rs = ps[r + 1] - ps[m + 1];
            out[x] = m * lc - ls + rs - m * rc;
        }
        return out;
    }
    let e = costs(0),
        o = costs(1),
        ix = [...Array(k).keys()].sort((x, y) => o[x] - o[y]).slice(0, 2),
        ans = Infinity;
    for (let x = 0; x < k; x++) ans = Math.min(ans, e[x] + o[ix[0] === x ? ix[1] : ix[0]]);
    return ans;
};
