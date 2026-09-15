function longestConsecutive(nums: number[]): number {
    // The set collapses duplicates and makes membership an O(1) test.
    const values = new Set(nums);
    let best = 0;
    for (const value of values) {
        // Only a true run start (no value - 1 present) triggers a walk; each
        // maximal run has exactly one such start, which keeps the nested loop
        // linear: every element is touched at most twice.
        if (!values.has(value - 1)) {
            let length = 1;
            // Walk upward through the run without sorting anything.
            while (values.has(value + length)) {
                length++;
            }
            best = Math.max(best, length);
        }
    }
    return best;
}
