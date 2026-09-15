class Solution {
  public:
    int dominantIndices(vector<int> &nums) {
        // Suffix sums stay within 99 * 100 = 9900 and cross-products
        // within 100 * 99 = 9900, so int arithmetic carries both without
        // overflow.
        int n = nums.size();
        int count = 0;
        // Walk backward from the second-to-last index, carrying the sum of
        // the strict suffix after i; the comparison nums[i] > sum / (n - 1 - i)
        // is exactly nums[i] * (n - 1 - i) > sum in integer arithmetic.
        int suffix = 0;
        for (int i = n - 2; i >= 0; i--) {
            suffix += nums[i + 1];
            if (nums[i] * (n - 1 - i) > suffix) {
                count++;
            }
        }
        return count;
    }
};
