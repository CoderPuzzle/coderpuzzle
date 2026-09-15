function maxScore(nums: number[]): number {
    // In descending order the first k elements are always the k largest
    // values, so every prefix sum is simultaneously maximal across all
    // rearrangements. Running totals stay within ±10^11 << 2^53, so plain
    // numbers remain exact.
    nums.sort((a, b) => b - a);
    let total = 0;
    let score = 0;
    for (const value of nums) {
        total += value;
        if (total > 0) score++;
    }
    return score;
}
