/**
 * @param {number[]} packages
 * @param {number[][]} boxes
 * @return {number}
 */
var minWastedSpace = function (packages, boxes) {
    // Per supplier: sorted boxes assign each package its smallest fitting
    // size; waste = count*(box) - range package sum via prefix sums.
    // Waste fits in 53-bit integers (<= ~1e10), exact as JS numbers;
    // reduce mod 1e9+7 only at return.
    const MOD = 1e9 + 7;
    const pkg = [...packages].sort((a, b) => a - b);
    const n = pkg.length;
    const pre = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        pre[i + 1] = pre[i] + pkg[i];
    }
    let best = -1;
    for (const supplier of boxes) {
        const s = [...supplier].sort((a, b) => a - b);
        if (s[s.length - 1] < pkg[n - 1]) {
            continue;
        }
        let waste = 0;
        let prev = 0;
        for (const b of s) {
            let lo = 0;
            let hi = n;
            while (lo < hi) {
                const mid = (lo + hi) >> 1;
                if (pkg[mid] <= b) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            const cnt = lo;
            if (cnt > prev) {
                waste += (cnt - prev) * b - (pre[cnt] - pre[prev]);
                prev = cnt;
            }
            if (prev === n) {
                break;
            }
        }
        if (best < 0 || waste < best) {
            best = waste;
        }
    }
    return best < 0 ? -1 : best % MOD;
};
