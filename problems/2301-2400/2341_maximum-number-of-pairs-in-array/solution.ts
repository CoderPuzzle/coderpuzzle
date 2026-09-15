function numberOfPairs(nums: number[]): number[] {
    const counts = new Map<number, number>();
    for (const num of nums) {
        counts.set(num, (counts.get(num) || 0) + 1);
    }
    let pairs = 0;
    let leftovers = 0;
    for (const count of counts.values()) {
        pairs += Math.floor(count / 2);
        leftovers += count % 2;
    }
    return [pairs, leftovers];
}
