function sortByReflection(nums: number[]): number[] {
    // Reflect every value once — reverse its binary string and parse it
    // back, which drops any leading zeros the reversal produced — then
    // sort on the composite key (reflection, value) so ties break by
    // ascending original value regardless of sort stability.
    const reflection = new Map<number, number>();
    for (const value of nums) {
        reflection.set(value, parseInt(value.toString(2).split("").reverse().join(""), 2));
    }
    return [...nums].sort((a, b) => reflection.get(a)! - reflection.get(b)! || a - b);
}
