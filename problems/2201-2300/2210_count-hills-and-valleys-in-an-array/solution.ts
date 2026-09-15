function countHillValley(nums: number[]): number {
    // A whole run of equal neighbors shares one pair of closest
    // non-equal neighbors, so collapsing each maximal run of equal
    // values to a single representative turns "count hills and
    // valleys, once per run" into "count interior local extrema" of
    // the compressed sequence. The endpoints of the compressed
    // sequence are missing a non-equal neighbor on one side, which
    // the interior-only loop encodes exactly.
    const compressed: number[] = [nums[0]];
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== compressed[compressed.length - 1]) {
            compressed.push(nums[i]);
        }
    }
    let count = 0;
    for (let i = 1; i < compressed.length - 1; i++) {
        const left = compressed[i - 1];
        const mid = compressed[i];
        const right = compressed[i + 1];
        if ((mid > left && mid > right) || (mid < left && mid < right)) {
            count++;
        }
    }
    return count;
}
