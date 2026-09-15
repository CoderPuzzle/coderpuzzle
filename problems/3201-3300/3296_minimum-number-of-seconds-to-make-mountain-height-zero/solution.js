/**
 * @param {number} mountainHeight
 * @param {number[]} workerTimes
 * @return {number}
 */
var minNumberOfSeconds = function (mountainHeight, workerTimes) {
    // Integer square root of a non-negative BigInt (exact).
    const isqrt = (n) => {
        let r = BigInt(Math.floor(Math.sqrt(Number(n))));
        if (r < 0n) r = 0n;
        while (r * r > n) r -= 1n;
        while ((r + 1n) * (r + 1n) <= n) r += 1n;
        return r;
    };

    // largest x such that wt * x*(x+1)/2 <= t
    const units = (wt, t) => {
        const c = (2n * t) / wt;
        return (isqrt(1n + 4n * c) - 1n) / 2n;
    };

    const H = BigInt(mountainHeight);
    let maxW = 0;
    for (const wt of workerTimes) {
        if (wt > maxW) maxW = wt;
    }
    let hi = (BigInt(maxW) * H * (H + 1n)) / 2n;
    let lo = 0n;
    while (lo < hi) {
        const mid = lo + (hi - lo) / 2n;
        let total = 0n;
        for (const wt of workerTimes) {
            total += units(BigInt(wt), mid);
            if (total >= H) break;
        }
        if (total >= H) {
            hi = mid;
        } else {
            lo = mid + 1n;
        }
    }
    return Number(lo);
};
