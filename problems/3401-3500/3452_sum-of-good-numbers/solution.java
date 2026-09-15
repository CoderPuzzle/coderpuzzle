class Solution {

    // One sweep: an element is good when it strictly beats the neighbors
    // that exist at distance k; a missing neighbor never blocks it.
    public int sumOfGoodNumbers(int[] nums, int k) {
        int n = nums.length;
        int total = 0;
        for (int i = 0; i < n; i++) {
            boolean leftOk = i - k < 0 || nums[i] > nums[i - k];
            boolean rightOk = i + k >= n || nums[i] > nums[i + k];
            if (leftOk && rightOk) {
                total += nums[i];
            }
        }
        return total;
    }
}
