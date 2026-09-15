class Solution {

    public int singleNumber(int[] nums) {
        int result = 0;
        for (int i = 0; i < 32; ++i) {
            // Triples contribute 0 or 3 set bits at position i (a multiple of
            // three); the unique value contributes 0 or 1 — so count % 3 is
            // exactly bit i of the answer.
            int count = 0;
            for (int value : nums) {
                count += (value >> i) & 1;
            }
            if (count % 3 != 0) {
                result |= 1 << i;
            }
        }
        return result;
    }
}
