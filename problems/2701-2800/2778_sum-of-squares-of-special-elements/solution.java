class Solution {

    public int sumOfSquares(int[] nums) {
        // An element is special exactly when its position divides the length:
        // walk positions 1..n, test n % i == 0, and square the survivors in.
        // Position i lives at subscript i - 1 under 0-based indexing.
        int n = nums.length;
        int total = 0;
        for (int i = 1; i <= n; ++i) {
            if (n % i == 0) total += nums[i - 1] * nums[i - 1];
        }
        return total;
    }
}
