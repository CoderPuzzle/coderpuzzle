class Solution {

    public int minimumSumSubarray(int[] nums, int l, int r) {
        // Prefix sums turn each candidate window into an O(1) subtraction,
        // so scanning every (start, length) pair is O(n^2) windows overall.
        // With n <= 100 and |nums[i]| <= 1000 every partial sum stays far
        // inside 32 bits.
        int[] prefix = new int[nums.length + 1];
        for (int i = 0; i < nums.length; ++i) prefix[i + 1] = prefix[i] + nums[i];
        int best = -1;
        for (int start = 0; start < nums.length; ++start) {
            for (int length = l; length <= r; ++length) {
                int end = start + length;
                if (end > nums.length) break;
                int total = prefix[end] - prefix[start];
                if (total > 0 && (best == -1 || total < best)) best = total;
            }
        }
        return best;
    }
}
