function firstUniqueEven(nums: number[]): number {
    // A value qualifies only when it is even and its count in nums is
    // exactly one. Counting all values first turns each "is this the
    // first unique even?" test into a constant-time lookup, so a single
    // left-to-right scan over nums returns the earliest match.
    const counts = new Map<number, number>();
    for (const value of nums) counts.set(value, (counts.get(value) || 0) + 1);
    for (const value of nums) {
        if (value % 2 === 0 && counts.get(value) === 1) return value;
    }
    return -1;
}
