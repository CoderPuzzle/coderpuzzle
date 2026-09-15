function minimumSize(nums: number[], maxOperations: number): number {
    // A bag of v must end as ceil(v/penalty) pieces; each division creates
    // exactly one new bag, so it costs ceil(v/penalty) - 1 =
    // floor((v - 1) / penalty) operations — achievable with near-equal
    // splits, all of size <= penalty.
    const needed = (penalty: number): number => {
        let total = 0;
        for (const balls of nums) {
            total += Math.floor((balls - 1) / penalty);
        }
        return total;
    };

    // Achievability is monotone in the penalty, so binary search the
    // smallest feasible value; max(nums) needs zero operations.
    let lo = 1;
    let hi = 0;
    for (const balls of nums) {
        if (balls > hi) hi = balls;
    }
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (needed(mid) <= maxOperations) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}
