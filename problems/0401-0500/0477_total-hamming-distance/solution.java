class Solution {

    public int totalHammingDistance(int[] nums) {
        // A pair differs at a bit position exactly when one value has the
        // bit set and the other does not. If c of the n values carry the
        // bit, the position therefore contributes c * (n - c) differing
        // pairs, and summing that over all positions counts every
        // (pair, bit) difference exactly once. Values are at most 10^9,
        // below 2^30, so 31 fixed passes cover every position that can
        // ever hold a set bit. No per-case product or running total can
        // reach 2^31, so int arithmetic never overflows.
        int n = nums.length;
        int total = 0;
        for (int bit = 0; bit < 31; bit++) {
            int setCount = 0;
            for (int value : nums) {
                setCount += (value >> bit) & 1;
            }
            total += setCount * (n - setCount);
        }
        return total;
    }
}
