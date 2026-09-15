/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxGCDScore = function (nums, k) {
    // Only the 2-adic tier t = v2(value) and the odd part of each element
    // matter: doubling bumps one element's tier by 1 and never touches
    // odd parts, so a window's gcd is 2^M * g where g = gcd of odd parts
    // and M is the promoted minimum tier. Every score is <= n * 2 * max
    // value <= 3e12 < 2^53, so Numbers stay exact.
    const gcdOf = (a, b) => {
        while (b !== 0) {
            const t = a % b;
            a = b;
            b = t;
        }
        return a;
    };
    const n = nums.length;
    const odd = new Array(n);
    const tier = new Array(n);
    for (let i = 0; i < n; ++i) {
        const low = nums[i] & -nums[i];
        odd[i] = nums[i] / low;
        tier[i] = 31 - Math.clz32(low);
    }
    const p2 = new Array(34);
    p2[0] = 1;
    for (let i = 1; i < 34; ++i) p2[i] = p2[i - 1] * 2;
    let best = 0;
    for (let l = 0; l < n; ++l) {
        let g = 0;
        const cnt = new Array(32).fill(0);
        let m = 32;
        for (let r = l; r < n; ++r) {
            g = gcdOf(g, odd[r]);
            const t = tier[r];
            ++cnt[t];
            if (t < m) m = t;
            // Each element doubles at most once, so every element sits at
            // tier t or t+1: raising the minimum past m would need the
            // tier-m elements promoted twice — impossible. M is m + 1
            // only when the budget covers every tier-m element.
            const M = cnt[m] <= k ? m + 1 : m;
            const score = (r - l + 1) * p2[M] * g;
            if (score > best) best = score;
            // Windows further right from l: len <= n - l, g only drops,
            // M <= m + 1; stop once that bound can't beat best.
            if (p2[m + 1] * g * (n - l) <= best) break;
        }
    }
    return best;
};
