function maxValue(n: number, index: number, maxSum: number): number {
    // Binary-search the peak m = nums[index]: any valid array with that
    // peak has nums[i] >= max(m - |i - index|, 1), and the array sitting
    // exactly on those bounds is itself valid, so its sum decides
    // feasibility. Number is exact only below 2^53 ~ 9*10^15, and a probed
    // side can truly reach ~5*10^17 — but such a side is also far over
    // budget on its own, so RAMP caps the clipped staircase at
    // 63245 * 63246 / 2 <= 2*10^9 >= 2*maxSum and reports Infinity without
    // multiplying. Every value actually computed stays at or below
    // 63245 * 10^9 + 10^9 < 2^53, so it is exact.
    const RAMP = 63245;
    const side = (m: number, width: number): number => {
        if (Math.min(width, m - 1) > RAMP) {
            return Infinity;
        }
        if (width < m) {
            return width * m - (width * (width + 1)) / 2;
        }
        return (m * (m - 1)) / 2 + (width - m + 1);
    };
    let lo = 1;
    let hi = maxSum;
    while (lo < hi) {
        const mid = Math.floor((lo + hi + 1) / 2);
        if (mid + side(mid, index) + side(mid, n - 1 - index) <= maxSum) {
            lo = mid;
        } else {
            hi = mid - 1;
        }
    }
    return lo;
}
