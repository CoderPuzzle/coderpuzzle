function minOperations(nums: number[], x: number, y: number): number {
    // After t operations index i has absorbed t*y of decrement plus an
    // extra (x - y) every time it was picked, so candidate t is feasible
    // iff the required picks fit inside the t operations. Every value
    // below is bounded by max(nums) + y <= 2e9 < 2^53, so plain Numbers
    // stay exact.
    const feasible = (t: number): boolean => {
        const base = t * y;
        const gain = x - y;
        let used = 0;
        for (const value of nums) {
            if (value > base) {
                // integer ceiling division avoids float rounding at ties
                used += Math.floor((value - base - 1) / gain) + 1;
                if (used > t) {
                    return false;
                }
            }
        }
        return true;
    };
    let maxValue = 0;
    for (const value of nums) {
        maxValue = Math.max(maxValue, value);
    }
    let low = 1;
    let high = Math.floor((maxValue - 1) / y) + 1; // ceil(maxValue / y)
    while (low < high) {
        const mid = low + Math.floor((high - low) / 2);
        if (feasible(mid)) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    return low;
}
