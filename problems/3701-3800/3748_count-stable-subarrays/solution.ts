function countStableSubarrays(nums: number[], queries: number[][]): number[] {
    const n = nums.length;
    // left[i] is the smallest start s such that nums[s..i] reads
    // non-decreasing; it only ever moves right, which the per-query
    // binary search below relies on.
    const left: number[] = new Array(n).fill(0);
    const prefLeft: number[] = new Array(n + 1).fill(0);
    const prefBase: number[] = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        left[i] = i > 0 && nums[i] >= nums[i - 1] ? left[i - 1] : i;
        // Stable subarrays ending at i inside their own run.
        prefLeft[i + 1] = prefLeft[i] + left[i];
        prefBase[i + 1] = prefBase[i] + (i - left[i] + 1);
    }
    const result: number[] = [];
    for (const [l, r] of queries) {
        // First end whose run reaches back to l or earlier. Ends before it
        // sit past a drop at or after l and count their bare window
        // length; ends from there on count down to left[e].
        let lo = l,
            hi = r + 1;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (left[mid] < l) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        const answer = prefBase[r + 1] - prefBase[l] + prefLeft[lo] - prefLeft[l] - l * (lo - l);
        result.push(answer);
    }
    return result;
}
