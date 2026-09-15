class Solution {

    public int minimizeArrayValue(int[] nums) {
        // Value only moves leftward, so each prefix's max is at least its
        // ceiling average; the max over all prefixes is also achievable by
        // balancing each prefix to that ceiling.
        long total = 0;
        int best = 0;
        for (int i = 0; i < nums.length; i++) {
            total += nums[i];
            // ceil(total / (i+1)) via integer arithmetic.
            long candidate = (total + i) / (i + 1);
            if (candidate > best) {
                best = (int) candidate;
            }
        }
        return best;
    }
}
