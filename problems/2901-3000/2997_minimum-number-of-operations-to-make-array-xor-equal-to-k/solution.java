class Solution {

    public int minOperations(int[] nums, int k) {
        // Flipping one bit of any element toggles exactly that bit of the
        // array-wide XOR, so one operation changes the XOR's Hamming
        // distance to k by exactly one: fold nums into a single XOR and
        // count the bits where it differs from k.
        int xorAll = 0;
        for (int v : nums) {
            xorAll ^= v;
        }
        return Integer.bitCount(xorAll ^ k);
    }
}
