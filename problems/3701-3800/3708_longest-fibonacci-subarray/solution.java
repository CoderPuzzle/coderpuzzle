class Solution {

    public int longestSubarray(int[] nums) {
        // One sweep carrying a run counter: any adjacent pair is a valid
        // Fibonacci array, so runs start at length 2; each later element
        // extends the run when it equals the sum of the two before it and
        // snaps the counter back to 2 when it does not. The sum is taken
        // in 64 bits: two elements reach 2e9, at the edge of int range.
        int best = 2;
        int current = 2;
        for (int i = 2; i < nums.length; ++i) {
            long sum = (long) nums[i - 1] + nums[i - 2];
            if (sum == nums[i]) {
                ++current;
            } else {
                current = 2;
            }
            if (current > best) {
                best = current;
            }
        }
        return best;
    }
}
