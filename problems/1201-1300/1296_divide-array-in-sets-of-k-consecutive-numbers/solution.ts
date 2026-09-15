function isPossibleDivide(nums: number[], k: number): boolean {
    // size-k sets can partition the array only if k divides n
    if (nums.length % k !== 0) return false;
    const counts = new Map<number, number>();
    for (const x of nums) {
        counts.set(x, (counts.get(x) || 0) + 1);
    }
    // walk distinct values smallest-first: the smallest remaining value
    // forces its run — every set containing it is exactly v..v+k-1
    const values = [...counts.keys()].sort((a, b) => a - b);
    for (const value of values) {
        const need = counts.get(value)!;
        // already fully consumed by runs started below
        if (need <= 0) continue;
        // each of the need copies of value starts its own run; any of the
        // next k values falling short means no valid division exists
        for (let i = value; i < value + k; i++) {
            const have = counts.get(i) || 0;
            if (have < need) return false;
            counts.set(i, have - need);
        }
    }
    return true;
}
