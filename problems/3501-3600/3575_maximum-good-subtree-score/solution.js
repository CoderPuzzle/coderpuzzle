/**
 * @param {number[]} vals
 * @param {number[]} par
 * @return {number}
 */
var goodSubtreeSum = function (vals, par) {
    const MOD = 1000000007;
    const NEG = -1e18;

    const n = vals.length;
    const children = Array.from({ length: n }, () => []);
    for (let i = 1; i < n; i++) {
        children[par[i]].push(i);
    }

    const umask = new Int32Array(n);
    const selectable = new Array(n);
    for (let i = 0; i < n; i++) {
        const str = String(vals[i]);
        let mask = 0;
        const seen = new Array(10).fill(false);
        let distinct = true;
        for (const ch of str) {
            const d = ch.charCodeAt(0) - 48;
            if (seen[d]) distinct = false;
            seen[d] = true;
            mask |= 1 << d;
        }
        umask[i] = mask;
        selectable[i] = distinct;
    }

    // res[c] = max over x subset of c of a[x] + b[c^x]
    const subsetConvolve = (a, b) => {
        const res = new Array(1024).fill(NEG);
        for (let c = 0; c < 1024; c++) {
            let best = NEG;
            let x = c;
            while (true) {
                const y = c ^ x;
                const v = a[x] + b[y];
                if (v > best) best = v;
                if (x === 0) break;
                x = (x - 1) & c;
            }
            res[c] = best;
        }
        return res;
    };

    // post-order
    const order = [];
    const stack = [0];
    while (stack.length > 0) {
        const u = stack.pop();
        order.push(u);
        for (const v of children[u]) stack.push(v);
    }

    const dp = new Array(n);
    let total = 0;
    for (let idx = n - 1; idx >= 0; idx--) {
        const u = order[idx];
        let comb = new Array(1024).fill(NEG);
        comb[0] = 0;
        for (const c of children[u]) {
            comb = subsetConvolve(comb, dp[c]);
        }

        const du = comb.slice();
        if (selectable[u]) {
            const mu = umask[u];
            for (let mask = 0; mask < 1024; mask++) {
                if ((mask & mu) === mu) {
                    const rest = mask ^ mu;
                    if (comb[rest] !== NEG) {
                        const val = comb[rest] + vals[u];
                        if (val > du[mask]) du[mask] = val;
                    }
                }
            }
        }
        dp[u] = du;
        let best = du[0];
        for (let m = 1; m < 1024; m++) {
            if (du[m] > best) best = du[m];
        }
        total += best;
    }
    return total % MOD;
};
