function countDistinctIntegers(nums: number[]): number {
    // The final array holds the originals plus one reversal per original,
    // so its distinct values are exactly the set {originals} ∪
    // {reversals}. Reversal never changes the digit count, so every value
    // stays <= 10^6 < 2^53 and stays an exact double. Leading zeros vanish
    // because Number() re-parses "01" as 1.
    const seen = new Set(nums);
    for (const value of nums) {
        seen.add(Number([...String(value)].reverse().join("")));
    }
    return seen.size;
}
