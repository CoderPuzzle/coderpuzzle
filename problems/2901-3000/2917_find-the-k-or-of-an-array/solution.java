class Solution {

    public int findKOr(int[] nums, int k) {
        // Inputs are < 2^31, so only bit positions 0..30 can ever appear and
        // the result stays a non-negative 32-bit integer.
        int result = 0;
        for (int bit = 0; bit < 31; ++bit) {
            // Count the elements carrying this bit; k or more set it.
            int count = 0;
            for (int num : nums) {
                count += (num >> bit) & 1;
            }
            if (count >= k) {
                result |= 1 << bit;
            }
        }
        return result;
    }
}
