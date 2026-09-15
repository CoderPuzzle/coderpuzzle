function mostFrequent(nums: number[], key: number): number {
    // Count each value that immediately follows a key occurrence and take
    // the argmax; the input guarantees a unique winner.
    const counts = new Map<number, number>();
    for (let i = 0; i + 1 < nums.length; ++i) {
        if (nums[i] === key) {
            counts.set(nums[i + 1], (counts.get(nums[i + 1]) || 0) + 1);
        }
    }
    let bestValue = 0;
    let bestCount = -1;
    for (const [value, count] of counts) {
        if (count > bestCount) {
            bestCount = count;
            bestValue = value;
        }
    }
    return bestValue;
}
