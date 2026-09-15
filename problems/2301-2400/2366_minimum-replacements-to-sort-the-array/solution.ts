function minimumReplacement(nums: number[]): number {
    // Splitting only shrinks numbers, so never touch the last element:
    // keep `bound` = max value allowed here given a sorted suffix.
    let ops = 0;
    let bound = nums[nums.length - 1];
    for (let i = nums.length - 2; i >= 0; i--) {
        const x = nums[i];
        if (x <= bound) {
            // Already fits the sorted suffix; it tightens the bound.
            bound = x;
        } else {
            // Fewest pieces covering sum x with each <= bound; k even
            // pieces leave the largest at ceil(x/k) <= bound.
            const k = Math.floor((x + bound - 1) / bound);
            ops += k - 1;
            // Even split maximizes the smallest piece (floor(x/k)),
            // leaving the most room for elements further left.
            bound = Math.floor(x / k);
        }
    }
    return ops;
}
