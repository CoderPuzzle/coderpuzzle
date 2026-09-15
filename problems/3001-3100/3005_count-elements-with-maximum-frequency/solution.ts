function maxFrequencyElements(nums: number[]): number {
    // One pass builds the value -> frequency map; every value whose
    // frequency equals the maximum contributes that many elements.
    const frequencies = new Map<number, number>();
    for (const num of nums) {
        frequencies.set(num, (frequencies.get(num) ?? 0) + 1);
    }
    let maximum = 0;
    for (const count of frequencies.values()) {
        maximum = Math.max(maximum, count);
    }
    let total = 0;
    for (const count of frequencies.values()) {
        if (count === maximum) {
            total += count;
        }
    }
    return total;
}
