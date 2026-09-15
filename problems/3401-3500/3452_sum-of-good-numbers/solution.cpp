class Solution {
  public:
    // One sweep: an element is good when it strictly beats the neighbors
    // that exist at distance k; a missing neighbor never blocks it.
    int sumOfGoodNumbers(vector<int> &nums, int k) {
        int n = nums.size();
        int total = 0;
        for (int i = 0; i < n; i++) {
            bool leftOk = i - k < 0 || nums[i] > nums[i - k];
            bool rightOk = i + k >= n || nums[i] > nums[i + k];
            if (leftOk && rightOk) {
                total += nums[i];
            }
        }
        return total;
    }
};
