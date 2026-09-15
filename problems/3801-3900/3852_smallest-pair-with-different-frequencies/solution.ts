function minDistinctFreqPair(nums: number[]): number[] {
    // Values and frequencies are at most 100, so plain numbers hold every
    // integer here exactly, far inside 2^53.
    const freq = new Map<number, number>();
    for (const x of nums) {
        freq.set(x, (freq.get(x) || 0) + 1);
    }
    const values = [...freq.keys()].sort((a, b) => a - b);
    // If any valid pair exists, its x is always the smallest distinct
    // value: if every larger value shared freq[x], all of nums would
    // share one frequency and no pair could differ. So one scan past
    // values[0] finds the smallest qualifying y.
    const x = values[0];
    for (const y of values) {
        if (y > x && freq.get(y)! !== freq.get(x)!) {
            return [x, y];
        }
    }
    return [-1, -1];
}
