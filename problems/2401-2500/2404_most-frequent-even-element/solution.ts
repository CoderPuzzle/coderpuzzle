function mostFrequentEven(nums: number[]): number {
    const counts = new Map<number, number>();
    for (const num of nums) {
        if (num % 2 === 0) {
            counts.set(num, (counts.get(num) || 0) + 1);
        }
    }
    let bestValue = -1;
    let bestCount = 0;
    for (const [value, count] of counts) {
        if (count > bestCount || (count === bestCount && value < bestValue)) {
            bestCount = count;
            bestValue = value;
        }
    }
    return bestValue;
}
