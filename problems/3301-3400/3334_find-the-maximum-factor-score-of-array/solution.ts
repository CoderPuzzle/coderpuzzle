// Exclusive prefix/suffix folds: pre[i] folds nums[0..i-1] and suf[i]
// folds nums[i..n-1] for both GCD (identity 0) and LCM (identity 1).
// Removing index i leaves the fold of the two joins; the full-array fold
// covers removing nothing, and removing every element folds to score 0
// through the identities.
//
// Number exactness: every LCM computed here divides
// LCM(1..30) = 2329089562800 < 2^38, the GCD is at most 30, and the
// division a / gcd(a, b) is exact, so every intermediate stays an integer
// below 2329089562800 * 30 = 6987268688400 < 2^53 — all arithmetic is
// exact in IEEE doubles.
function maxScore(nums: number[]): number {
    const n = nums.length;
    const gcdOf = (a: number, b: number): number => {
        while (b !== 0) {
            const t = a % b;
            a = b;
            b = t;
        }
        return a;
    };
    const preG: number[] = new Array(n + 1).fill(0);
    const preL: number[] = new Array(n + 1).fill(1);
    const sufG: number[] = new Array(n + 1).fill(0);
    const sufL: number[] = new Array(n + 1).fill(1);
    for (let i = 0; i < n; i += 1) {
        preG[i + 1] = gcdOf(preG[i], nums[i]);
        preL[i + 1] = (preL[i] / gcdOf(preL[i], nums[i])) * nums[i];
    }
    for (let i = n - 1; i >= 0; i -= 1) {
        sufG[i] = gcdOf(sufG[i + 1], nums[i]);
        sufL[i] = (sufL[i + 1] / gcdOf(sufL[i + 1], nums[i])) * nums[i];
    }
    let best = preG[n] * preL[n];
    for (let i = 0; i < n; i += 1) {
        const g = gcdOf(preG[i], sufG[i + 1]);
        const l = (preL[i] / gcdOf(preL[i], sufL[i + 1])) * sufL[i + 1];
        if (g * l > best) best = g * l;
    }
    return best;
}
