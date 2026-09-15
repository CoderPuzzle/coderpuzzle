class Solution {

    public int maxIncreasingSubarrays(int[] nums) {
        // Split nums into maximal strictly increasing runs. Two adjacent
        // k-windows either sit inside one run of length l (then k <= l / 2
        // floored) or meet exactly at a run boundary, one in each of two
        // consecutive runs (then k <= min of the two lengths). The answer
        // is the largest of those candidates over all boundaries.
        int best = 1;
        int prev = 0;
        int cur = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > nums[i - 1]) {
                cur++;
            } else {
                best = Math.max(best, Math.max(Math.min(prev, cur), cur / 2));
                prev = cur;
                cur = 1;
            }
        }
        return Math.max(best, Math.max(Math.min(prev, cur), cur / 2));
    }
}
