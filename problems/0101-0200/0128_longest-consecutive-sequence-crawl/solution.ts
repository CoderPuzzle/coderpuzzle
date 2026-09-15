function longestConsecutive(nums: number[]): number {
    // A hash set answers "is this value present?" in O(1); iterating the set
    // itself also collapses duplicates before any walking starts.
    const values = new Set<number>(nums);
    let longest = 0;
    for (const value of values) {
        // value - 1 absent means value is where its maximal run begins.
        // Skipping every non-initial member is what keeps the walk linear:
        // without the check, each run would be re-traversed by all of its
        // members and the nested loops would go quadratic.
        if (!values.has(value - 1)) {
            let length = 0;
            while (values.has(value + length)) length++;
            longest = Math.max(longest, length);
        }
    }
    return longest;
}
