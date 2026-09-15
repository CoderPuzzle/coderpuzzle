function numSubarrayBoundedMax(nums: number[], left: number, right: number): number {
    // One-sided count of subarrays whose max is <= bound; the
    // answer follows by subtracting the two bounds.
    function countBelow(bound: number): number {
        let total = 0;
        let run = 0;
        for (const v of nums) {
            if (v <= bound) {
                // run = length of the current streak of in-bounds
                // elements: this element ends exactly run new
                // subarrays, each counted once at its right end.
                run += 1;
                total += run;
            } else {
                // Above the bound: no valid subarray crosses here.
                run = 0;
            }
        }
        return total;
    }

    // Max in [left, right] iff at most right but not at most
    // left - 1; with left = 0 the subtracted count is empty.
    return countBelow(right) - countBelow(left - 1);
}
