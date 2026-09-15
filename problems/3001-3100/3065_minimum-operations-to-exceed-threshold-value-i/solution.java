class Solution {

    public int minOperations(int[] nums, int k) {
        // Each operation removes the current smallest element, so exactly the
        // values strictly below k get removed, each exactly once.
        int count = 0;
        for (int value : nums) {
            if (value < k) {
                ++count;
            }
        }
        return count;
    }
}
