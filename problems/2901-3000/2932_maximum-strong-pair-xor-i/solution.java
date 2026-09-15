class Solution {

    public int maximumStrongPairXor(int[] nums) {
        // Try every unordered pair (the same integer twice is allowed, so
        // j >= i covers the (x, x) pairs too); keep the best XOR among the
        // pairs that satisfy the strong-pair condition.
        int best = 0;
        for (int i = 0; i < nums.length; ++i) {
            for (int j = i; j < nums.length; ++j) {
                int x = nums[i],
                    y = nums[j];
                if (Math.abs(x - y) <= Math.min(x, y)) {
                    best = Math.max(best, x ^ y);
                }
            }
        }
        return best;
    }
}
