class Solution {

    public int countMatchingSubarrays(int[] nums, int[] pattern) {
        int n = nums.length;
        int m = pattern.length;

        // Reduce every adjacent pair to its relation: rise, fall, or tie.
        int[] signs = new int[n - 1];
        for (int i = 0; i + 1 < n; i++) {
            signs[i] = Integer.compare(nums[i + 1], nums[i]);
        }

        // A size m+1 subarray matches iff its m relations equal the pattern.
        int count = 0;
        for (int start = 0; start + m < n; start++) {
            boolean match = true;
            for (int k = 0; k < m && match; k++) {
                match = signs[start + k] == pattern[k];
            }
            if (match) {
                count++;
            }
        }
        return count;
    }
}
