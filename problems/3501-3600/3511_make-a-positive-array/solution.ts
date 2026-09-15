function makeArrayPositive(nums: number[]): number {
    // Only windows of length 3, 4 and 5 can break the rule: every longer
    // subarray splits into consecutive chunks of length 3, 4 or 5, each
    // of which is a subarray itself. Scan the right endpoint left to
    // right, with replaced slots holding 5e9 (within the allowed +/-1e18
    // and more than four untouched elements of magnitude 1e9 combined).
    // The first endpoint with a non-positive window must be replaced at
    // that endpoint itself — the earliest-ending bad window is best
    // stabbed at its rightmost slot — and the new value also fixes every
    // other bad window containing this slot.
    const BIG = 5000000000;
    const val = nums.slice();
    let ops = 0;
    for (let i = 2; i < val.length; i++) {
        // Window sums for the lengths 3, 4 and 5 ending at i; a length
        // that does not fit yet duplicates the previous sum, and the
        // matching i >= guard below keeps it out of the test.
        const s3 = val[i] + val[i - 1] + val[i - 2];
        const s4 = i >= 3 ? val[i - 3] + s3 : s3;
        const s5 = i >= 4 ? val[i - 4] + s4 : s4;
        if (s3 <= 0 || (i >= 3 && s4 <= 0) || (i >= 4 && s5 <= 0)) {
            val[i] = BIG;
            ops++;
        }
    }
    return ops;
}
