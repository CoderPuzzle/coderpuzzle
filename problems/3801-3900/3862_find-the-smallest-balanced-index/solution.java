class Solution {

    public int smallestBalancedIndex(int[] nums) {
        // Suffix products saturate at total + 1: any product above the
        // total sum can never equal a prefix sum, so the sentinel value
        // compares correctly while staying inside a long.
        int n = nums.length;
        long total = 0;
        for (int v : nums) {
            total += v;
        }
        long cap = total + 1;
        long[] suffix = new long[n + 1];
        suffix[n] = 1; // empty right side has product 1
        long prod = 1;
        for (int i = n - 1; i >= 0; i--) {
            if (prod > cap / nums[i]) {
                prod = cap;
            } else {
                prod *= nums[i];
            }
            suffix[i] = prod;
        }
        long left = 0;
        for (int i = 0; i < n; i++) {
            if (left == suffix[i + 1]) {
                return i;
            }
            left += nums[i];
        }
        return -1;
    }
}
