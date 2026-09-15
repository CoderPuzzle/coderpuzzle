class Solution {

    // Each range answers four questions at once: total sum, best prefix,
    // best suffix, and best interior subarray. Merging two halves glues
    // them together, so one recursion describes the whole array.
    private long[] solve(int[] nums, int lo, int hi) {
        // A single element is its own total, prefix, suffix, and best.
        if (hi - lo == 1) {
            long x = nums[lo];
            return new long[] { x, x, x, x };
        }
        int mid = (lo + hi) >>> 1;
        long[] left = solve(nums, lo, mid);
        long[] right = solve(nums, mid, hi);
        // The best subarray either stays in one half or is the seam of the
        // left half's best suffix and the right half's best prefix.
        long total = left[0] + right[0];
        long prefix = Math.max(left[1], left[0] + right[1]);
        long suffix = Math.max(right[2], right[0] + left[2]);
        long best = Math.max(left[3], Math.max(right[3], left[2] + right[1]));
        return new long[] { total, prefix, suffix, best };
    }

    public int maxSubArray(int[] nums) {
        return (int) solve(nums, 0, nums.length)[3];
    }
}
