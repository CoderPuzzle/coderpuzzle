class Solution {

    public int minOperations(int[] nums) {
        // Each element's popcount is the number of independent increments
        // it needs; the doublings are shared by the whole array, so only
        // the element with the most bits sets how many doublings are
        // needed.
        int total = 0;
        int maxBits = 0;
        for (int v : nums) {
            total += Integer.bitCount(v);
            int bits = 32 - Integer.numberOfLeadingZeros(v);
            maxBits = Math.max(maxBits, bits);
        }
        return total + Math.max(maxBits - 1, 0);
    }
}
