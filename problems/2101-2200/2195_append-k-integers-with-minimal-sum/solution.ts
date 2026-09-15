function minimalKSum(nums: number[], k: number): number {
    // Take the k smallest missing positives: sort distinct values,
    // consume each gap with an arithmetic-series sum, then spill into the
    // tail. The series form keeps every intermediate exact within the
    // safe-integer range.
    const ordered = Array.from(new Set(nums)).sort((a, b) => a - b);
    let total = 0;
    let taken = 0;
    let previous = 0;
    for (const value of ordered) {
        if (taken >= k) {
            break;
        }
        const gap = value - previous - 1;
        if (gap > 0) {
            const use = Math.min(gap, k - taken);
            total += use * (previous + 1) + (use * (use - 1)) / 2;
            taken += use;
        }
        previous = value;
    }
    if (taken < k) {
        const use = k - taken;
        total += use * (previous + 1) + (use * (use - 1)) / 2;
    }
    return total;
}
