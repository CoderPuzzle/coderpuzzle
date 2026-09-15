class Solution {

    public int xorAllNums(int[] nums1, int[] nums2) {
        // Each a_i appears m times and each b_j n times in the n*m pair
        // XORs; even counts self-cancel, so only parity survives.
        int answer = 0;
        if (nums2.length % 2 == 1) {
            // m odd: nums1's overall XOR does not cancel.
            for (int value : nums1) {
                answer ^= value;
            }
        }
        if (nums1.length % 2 == 1) {
            // n odd: nums2's overall XOR does not cancel.
            for (int value : nums2) {
                answer ^= value;
            }
        }
        return answer;
    }
}
