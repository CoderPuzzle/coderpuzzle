function partitionArray(nums: number[], k: number): boolean {
    // Whole groups of exactly k require n to divide evenly, and each
    // occurrence of a value consumes a group of its own, so no value may
    // occur more often than the number of groups.
    const n = nums.length;
    if (n % k !== 0) {
        return false;
    }
    const count = new Map<number, number>();
    let mostFrequent = 0;
    for (const value of nums) {
        const seen = (count.get(value) ?? 0) + 1;
        count.set(value, seen);
        mostFrequent = Math.max(mostFrequent, seen);
    }
    return mostFrequent <= n / k;
}
