/**
 * @param {number[]} nums
 * @return {number}
 */
var subsequencesWithMiddleMode = function (nums) {
    const MOD = 1000000007;
    // Lossless modular product for non-negative operands below 2^53: the
    // first operand is split into 15-bit halves so every intermediate
    // stays under 2^53.
    const mul = (a, b) => {
        a %= MOD;
        b %= MOD;
        const ah = Math.floor(a / 32768);
        const al = a % 32768;
        return (((ah * b) % MOD) * 32768 + al * b) % MOD;
    };
    const c2 = (x) => (x >= 2 ? (x * (x - 1)) / 2 : 0);
    const norm = (x) => ((x % MOD) + MOD) % MOD;

    const n = nums.length;
    const total = new Map();
    for (const x of nums) {
        total.set(x, (total.get(x) || 0) + 1);
    }
    // Exact power-sum aggregates over left-side counts lw, kept as true
    // numbers (bounded by n^3 <= 5e15 < 2^53) so every division by 2
    // below happens on a genuine integer.
    const left = new Map();
    let S1 = 0,
        S2 = 0,
        S3 = 0; // sum lw, sum lw^2, sum lw^3
    let T1 = 0,
        T2 = 0,
        T3 = 0; // sum lw*cnt, lw*cnt^2, lw^2*cnt
    let SC2 = 0;
    for (const c of total.values()) {
        SC2 += c * c;
    }

    let answer = 0;
    for (let i = 0; i < n; ++i) {
        const v = nums[i];
        const cntv = total.get(v);
        const l = left.get(v) || 0;
        const r = cntv - l - 1; // the middle occurrence is on neither side
        const NL = i - l; // non-v elements left of i
        const NR = n - 1 - i - r; // non-v elements right of i

        // Per-value sums over w != v, rebuilt from the aggregates. For v
        // itself the moment value cnt - l still contains the middle
        // element, so its exclusion squares (r + 1).
        const sumLw2 = S2 - l * l;
        const sumLw = S1 - l;
        const sumRw2 = SC2 - 2 * T1 + S2 - (r + 1) * (r + 1);
        const sumRw = n - 1 - i - r;
        const sumLwRw = T1 - l * cntv - sumLw2;
        const sumLwRw2 = T2 - l * cntv * cntv - 2 * (T3 - l * l * cntv) + (S3 - l * l * l);
        const sumLw2Rw = T3 - l * l * cntv - (S3 - l * l * l);
        const sumC2rw = (sumRw2 - sumRw) / 2;
        const sumC2lw = (sumLw2 - sumLw) / 2;
        // sum_w lw*rw*(NR - rw) and sum_w rw*lw*(NL - lw)
        const d10 = NR * sumLwRw - sumLwRw2;
        const d01 = NL * sumLwRw - sumLw2Rw;

        // Count by f, the frequency of v inside the subsequence. With
        // f >= 3 no other value can catch up, so only f = 2 needs the
        // inclusion-exclusion on the three non-v fills.
        const c2l = c2(l),
            c2r = c2(r);
        let val = mul(c2l, c2r); // f = 5
        val += (mul(l, c2r) * NL + mul(c2l, r) * NR) % MOD; // f = 4
        val += mul(c2r, c2(NL)) + mul(mul(l, r), NL * NR) + mul(c2l, c2(NR)); // f = 3
        // f = 2: one more v on the left (or right), the three non-v fills
        // pairwise distinct.
        const g10 = norm(NL * c2(NR) - NL * sumC2rw - d10);
        val += (l * g10) % MOD;
        const g01 = norm(c2(NL) * NR - NR * sumC2lw - d01);
        val += (r * g01) % MOD;

        answer = (answer + val) % MOD;

        // nums[i] joins the left side for every later middle.
        const old = l;
        S1 += 1;
        S2 += 2 * old + 1;
        S3 += 3 * old * old + 3 * old + 1;
        T1 += cntv;
        T2 += cntv * cntv;
        T3 += cntv * (2 * old + 1);
        left.set(v, l + 1);
    }
    return answer;
};
