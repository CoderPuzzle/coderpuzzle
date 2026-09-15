function maximumSum(nums: number[]): number {
    const squarefreePart = (x: number): number => {
        // Product of primes with odd exponent in x, e.g. P(18) = 2. Trial
        // division suffices: only indices are factored. Anything surviving
        // the loop is one leftover prime with exponent one.
        let result = 1;
        let d = 2;
        while (d * d <= x) {
            if (x % d === 0) {
                let count = 0;
                while (x % d === 0) {
                    x = Math.floor(x / d);
                    count++;
                }
                if (count % 2 === 1) result *= d;
            }
            d++;
        }
        if (x > 1) result *= x;
        return result;
    };

    // Writing each index as (squarefree part) x (perfect square), the
    // product of two indices is a perfect square exactly when their
    // squarefree parts match — so complete subsets are precisely the indices
    // sharing one squarefree part. Sum per group, take the max; singletons
    // qualify since the pair condition is vacuous.
    const groups = new Map<number, number>();
    for (let i = 1; i <= nums.length; i++) {
        const key = squarefreePart(i);
        groups.set(key, (groups.get(key) || 0) + nums[i - 1]);
    }
    let best = -Infinity;
    for (const v of groups.values()) {
        if (v > best) best = v;
    }
    return best;
}
