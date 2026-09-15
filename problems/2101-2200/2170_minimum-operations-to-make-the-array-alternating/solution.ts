function minimumOperations(nums: number[]): number {
    // An alternating array is fixed by one value for even indices and one
    // different value for odd indices, so the kept elements are exactly
    // the most frequent value on each side. Count both parities in one
    // pass, then keep the best of the four top-1/top-2 combinations.
    const n = nums.length;
    if (n === 1) {
        return 0;
    }
    const evenCounts = new Map<number, number>();
    const oddCounts = new Map<number, number>();
    nums.forEach((value, index) => {
        const counts = index % 2 === 0 ? evenCounts : oddCounts;
        counts.set(value, (counts.get(value) ?? 0) + 1);
    });
    // Top values per parity plus a fresh fill value worth nothing: the
    // optimal partner need not occur anywhere in nums.
    let freshValue = 0;
    for (const value of nums) {
        if (value > freshValue) {
            freshValue = value;
        }
    }
    freshValue += 1;
    const candidates = (counts: Map<number, number>): [number, number][] =>
        [...counts.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 2)
            .concat([[freshValue, 0]]);
    let best = n;
    for (const [evenValue, evenKept] of candidates(evenCounts)) {
        for (const [oddValue, oddKept] of candidates(oddCounts)) {
            if (evenValue === oddValue) {
                continue;
            }
            best = Math.min(best, n - evenKept - oddKept);
        }
    }
    return best;
}
