function findIndices(nums: number[], indexDifference: number, valueDifference: number): number[] {
    // For each later index j, every legal partner t satisfies
    // t <= j - indexDifference, and the largest |nums[t] - nums[j]| over
    // that window is attained at its minimum or maximum, so remembering
    // the first index of each extreme as the window grows is enough.
    // Testing the minimum candidate before the maximum, and keeping
    // first occurrences on ties, pins one deterministic answer out of
    // the many the statement permits.
    const n = nums.length;
    let minIdx = -1;
    let maxIdx = -1;
    for (let j = 0; j < n; ++j) {
        const t = j - indexDifference;
        if (t < 0) {
            continue;
        }
        if (minIdx === -1 || nums[t] < nums[minIdx]) {
            minIdx = t;
        }
        if (maxIdx === -1 || nums[t] > nums[maxIdx]) {
            maxIdx = t;
        }
        if (Math.abs(nums[j] - nums[minIdx]) >= valueDifference) {
            return [minIdx, j];
        }
        if (Math.abs(nums[j] - nums[maxIdx]) >= valueDifference) {
            return [maxIdx, j];
        }
    }
    return [-1, -1];
}
