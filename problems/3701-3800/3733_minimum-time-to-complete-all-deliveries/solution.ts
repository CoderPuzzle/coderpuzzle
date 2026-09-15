function minimumTime(d: number[], r: number[]): number {
    const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
    // Least common multiple of the two recharge periods; dividing before
    // multiplying keeps the intermediate small.
    const period = (r[0] / gcd(r[0], r[1])) * r[1];
    // Hours each drone can work in: all t hours minus its recharge hours
    // (the multiples of its own period). The hours open to at least one
    // drone exclude multiples of both periods, which idle both at once.
    const fits = (t: number): boolean =>
        d[0] <= t - Math.floor(t / r[0]) &&
        d[1] <= t - Math.floor(t / r[1]) &&
        d[0] + d[1] <= t - Math.floor(t / period);
    // fits grows with t, so halve down to the smallest feasible horizon;
    // twice the combined load always suffices since periods are >= 2.
    let lo = 1,
        hi = 2 * (d[0] + d[1]);
    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        if (fits(mid)) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}
