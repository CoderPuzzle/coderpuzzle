class Solution {

    public int maxAbsoluteSum(int[] nums) {
        // The max of |subarray sum| is realized at one of the two
        // extremes: the max subarray sum or the negated min subarray
        // sum. Track both running extremes in one sweep, each starting
        // fresh whenever extending the run would only hurt it.
        long best = 0,
            worst = 0,
            curMax = 0,
            curMin = 0;
        for (int v : nums) {
            curMax = Math.max(curMax + v, (long) v);
            best = Math.max(best, curMax);
            curMin = Math.min(curMin + v, (long) v);
            worst = Math.min(worst, curMin);
        }
        return (int) Math.max(best, -worst);
    }
}
