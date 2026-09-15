/**
 * @param {number[]} nums
 * @return {number}
 */
var subsequencesWithMiddleMode = function (nums) {
    // Fix the middle index m and count (left pair, right pair) combos where
    // x = nums[m] is the unique mode. With a+b >= 2 side copies of x its
    // frequency 1+a+b is untouchable; with exactly one side copy the 3
    // non-x picks must be pairwise distinct. Per-middle terms stay below
    // ~4 * 10^12, exact in Number, reduced modulo 10^9 + 7 each middle.
    const MOD = 1000000007;
    const n = nums.length;
    const c2 = (t) => (t * (t - 1)) / 2;
    const ids = new Map();
    const comp = new Int32Array(n);
    for (let i = 0; i < n; ++i) {
        let id = ids.get(nums[i]);
        if (id === undefined) {
            id = ids.size;
            ids.set(nums[i], id);
        }
        comp[i] = id;
    }
    const d = ids.size;
    const cntL = new Int32Array(d);
    const cntR = new Int32Array(d);
    let SL = 0;
    let SR = 0;
    for (let i = 1; i < n; ++i) {
        SR += cntR[comp[i]];
        cntR[comp[i]] += 1;
    }
    let ans = 0;
    for (let m = 0; m < n; ++m) {
        const x = comp[m];
        if (m > 0) {
            // advance: nums[m-1] joins the left, nums[m] leaves the right
            const y = comp[m - 1];
            SL += cntL[y];
            cntL[y] += 1;
            SR -= cntR[x] - 1;
            cntR[x] -= 1;
        }
        const l = cntL[x];
        const r = cntR[x];
        const ml = m - l;
        const mr = n - 1 - m - r;
        const cl = c2(l);
        const cr = c2(r);
        // pair sums over non-x values only: x contributes cl / cr itself
        const SxL = SL - cl;
        const SxR = SR - cr;
        // exactly one side copy of x: the right pair avoids the left pick's
        // value (T_R), or mirrored (T_L)
        let TR = 0;
        for (let u = 0; u < d; ++u) {
            const lu = cntL[u];
            if (lu > 0 && u !== x) {
                const cR = cntR[u];
                TR += lu * (c2(mr - cR) - SxR + c2(cR));
            }
        }
        let TL = 0;
        for (let u = 0; u < d; ++u) {
            const ru = cntR[u];
            if (ru > 0 && u !== x) {
                const cL = cntL[u];
                TL += ru * (c2(ml - cL) - SxL + c2(cL));
            }
        }
        const total =
            cl * c2(mr) + cl * r * mr + cl * cr + l * ml * r * mr + l * ml * cr + c2(ml) * cr + l * TR + r * TL;
        ans = (ans + total) % MOD;
    }
    return ans;
};
