function minimizeSet(divisor1: number, divisor2: number, uniqueCnt1: number, uniqueCnt2: number): number {
    // Binary search the smallest feasible maximum m. For a candidate m:
    //   m - floor(m/d1) numbers arr1 can take, m - floor(m/d2) for arr2,
    //   and m - floor(m/lcm) blocked by neither. Every value stays below
    //   4e9 < 2^53, so plain numbers are exact throughout.
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const shared = (divisor1 / gcd(divisor1, divisor2)) * divisor2;
    const total = uniqueCnt1 + uniqueCnt2;
    const feasible = (m: number): boolean =>
        m - Math.floor(m / divisor1) >= uniqueCnt1 &&
        m - Math.floor(m / divisor2) >= uniqueCnt2 &&
        m - Math.floor(m / shared) >= total;
    let lo = 1;
    let hi = 2 * total;
    while (lo < hi) {
        // Plain division, not >>: lo + hi can pass 2^31 and would wrap.
        const mid = Math.floor((lo + hi) / 2);
        if (feasible(mid)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
