class Solution {

    public long maximumTripletValue(int[] nums) {
        // One pass with two running prefix maxima: while treating the
        // current element as k, bestDiff already holds the largest
        // nums[i] - nums[j] over i < j before it, so extending that best
        // pair by nums[k] covers every triplet ending here without ever
        // re-scanning the prefix.  The answer is bounded by
        // (10^6 - 1) * 10^6, which is why it rides in a long.
        long best = 0; // all-negative answers collapse to 0
        long bestDiff = 0; // max nums[i] - nums[j] over pairs passed
        long maxPrefix = 0; // max nums[i] over indices passed
        for (int x : nums) {
            best = Math.max(best, bestDiff * x);
            bestDiff = Math.max(bestDiff, maxPrefix - x);
            maxPrefix = Math.max(maxPrefix, x);
        }
        return best;
    }
}
