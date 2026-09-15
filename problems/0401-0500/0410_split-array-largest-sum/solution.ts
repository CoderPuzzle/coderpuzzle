function splitArray(nums: number[], k: number): number {
    function feasible(limit: number): boolean {
        // Greedy piece count under the limit: extending each piece as far
        // as possible never forces more pieces later.
        let pieces = 1;
        let current = 0;
        for (const value of nums) {
            if (current + value > limit) {
                pieces++;
                if (pieces > k) {
                    return false;
                }
                current = value;
            } else {
                current += value;
            }
        }
        return true;
    }

    // Binary-search the answer: the smallest limit for which k pieces
    // suffice (the piece count only falls as the limit rises). Bounds:
    // no element can be split, and one piece covering everything works.
    let lo = -Infinity;
    let hi = 0;
    for (const value of nums) {
        if (value > lo) {
            lo = value;
        }
        hi += value;
    }
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (feasible(mid)) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}
