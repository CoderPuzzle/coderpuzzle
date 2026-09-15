function numIdenticalPairs(nums: number[]): number {
    // For each value, the k-th time it is seen forms a good pair with each
    // of the k - 1 occurrences already counted, so adding the running
    // count before bumping it reproduces C(count, 2) per value.
    const seen = new Map<number, number>();
    let total = 0;
    for (const num of nums) {
        total += seen.get(num) || 0;
        seen.set(num, (seen.get(num) || 0) + 1);
    }
    return total;
}
