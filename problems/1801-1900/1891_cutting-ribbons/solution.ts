function maxLength(ribbons: number[], k: number): number {
    // Monotone predicate: sum(floor(r/x)) >= k. Binary search the largest
    // feasible x; 0 when even x=1 fails. Piece counts reach ~1e10, exact
    // as JS numbers.
    let lo = 1;
    let hi = 0;
    for (const r of ribbons) {
        if (r > hi) {
            hi = r;
        }
    }
    let ans = 0;
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        let pieces = 0;
        for (const r of ribbons) {
            pieces += Math.floor(r / mid);
        }
        if (pieces >= k) {
            ans = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return ans;
}
